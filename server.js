const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

// Database setup
const dbPath = path.join(__dirname, 'db', 'attendance.db');

// ← ADD THIS ENTIRE BLOCK HERE (before the db connection)
const dbDir = path.join(__dirname, 'db');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✓ Created db folder');
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database');
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    department TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id INTEGER NOT NULL,
    date DATE NOT NULL,
    check_in TIME,
    check_out TIME,
    status TEXT DEFAULT 'present',
    FOREIGN KEY(employee_id) REFERENCES employees(id),
    UNIQUE(employee_id, date)
  )`);
});

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

// Employee endpoints
app.get('/api/employees', (req, res) => {
  db.all('SELECT * FROM employees ORDER BY name', (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.post('/api/employees', (req, res) => {
  const { name, email, department } = req.body;
  db.run(
    'INSERT INTO employees (name, email, department) VALUES (?, ?, ?)',
    [name, email, department],
    function(err) {
      if (err) res.status(400).json({ error: err.message });
      else res.json({ id: this.lastID, name, email, department });
    }
  );
});

app.delete('/api/employees/:id', (req, res) => {
  db.run('DELETE FROM employees WHERE id = ?', [req.params.id], (err) => {
    if (err) res.status(400).json({ error: err.message });
    else res.json({ message: 'Employee deleted' });
  });
});

// Attendance endpoints
app.post('/api/attendance/check', (req, res) => {
  const { employee_id, type } = req.body;
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().split(' ')[0];

  db.get(
    'SELECT * FROM attendance WHERE employee_id = ? AND date = ?',
    [employee_id, today],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      if (!row) {
        if (type === 'check_in') {
          db.run(
            'INSERT INTO attendance (employee_id, date, check_in, status) VALUES (?, ?, ?, ?)',
            [employee_id, today, now, 'present'],
            function(err) {
              if (err) res.status(400).json({ error: err.message });
              else res.json({ message: 'Checked in successfully', id: this.lastID });
            }
          );
        } else {
          res.status(400).json({ error: 'No check-in found for today' });
        }
      } else {
        if (type === 'check_out') {
          db.run(
            'UPDATE attendance SET check_out = ? WHERE id = ?',
            [now, row.id],
            (err) => {
              if (err) res.status(400).json({ error: err.message });
              else res.json({ message: 'Checked out successfully' });
            }
          );
        } else {
          res.status(400).json({ error: 'Already checked in today' });
        }
      }
    }
  );
});

app.get('/api/attendance/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  db.all(
    `SELECT a.*, e.name, e.email, e.department 
     FROM attendance a 
     JOIN employees e ON a.employee_id = e.id
     WHERE a.date = ?
     ORDER BY e.name`,
    [today],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.get('/api/attendance', (req, res) => {
  const { employee_id, date, month } = req.query;
  let query = `SELECT a.*, e.name, e.email, e.department 
               FROM attendance a 
               JOIN employees e ON a.employee_id = e.id`;
  let params = [];

  if (employee_id) {
    query += ' WHERE employee_id = ?';
    params.push(employee_id);
  } else if (date) {
    query += ' WHERE date = ?';
    params.push(date);
  } else if (month) {
    query += ' WHERE strftime("%Y-%m", date) = ?';
    params.push(month);
  }

  query += ' ORDER BY date DESC, e.name';

  db.all(query, params, (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

app.post('/api/attendance/manual', (req, res) => {
  const { employee_id, date, check_in, check_out, status } = req.body;

  db.run(
    'INSERT OR REPLACE INTO attendance (employee_id, date, check_in, check_out, status) VALUES (?, ?, ?, ?, ?)',
    [employee_id, date, check_in || null, check_out || null, status || 'present'],
    function(err) {
      if (err) res.status(400).json({ error: err.message });
      else res.json({ message: 'Attendance recorded' });
    }
  );
});

app.get('/api/reports/summary', (req, res) => {
  const { month } = req.query;
  
  db.all(
    `SELECT e.id, e.name, e.department,
            COUNT(CASE WHEN a.status = 'present' THEN 1 END) as days_present,
            COUNT(CASE WHEN a.status = 'absent' THEN 1 END) as days_absent,
            COUNT(CASE WHEN a.status = 'leave' THEN 1 END) as days_leave
     FROM employees e
     LEFT JOIN attendance a ON e.id = a.employee_id AND strftime("%Y-%m", a.date) = ?
     GROUP BY e.id
     ORDER BY e.name`,
    [month],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.get('/api/reports/employee/:id', (req, res) => {
  const { id } = req.params;
  const { month } = req.query;

  db.all(
    `SELECT a.*, e.name, e.email FROM attendance a 
     JOIN employees e ON a.employee_id = e.id
     WHERE a.employee_id = ? AND strftime("%Y-%m", a.date) = ?
     ORDER BY a.date`,
    [id, month],
    (err, rows) => {
      if (err) res.status(500).json({ error: err.message });
      else res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Attendance System running at http://localhost:${PORT}`);
});
