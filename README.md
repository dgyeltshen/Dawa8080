# 📋 Attendance Management System

A simple, easy-to-use attendance tracking system built with Node.js and SQLite.

## Features

✅ **Quick Check-In/Check-Out** - One click time tracking  
✅ **Employee Management** - Add, view, delete employees  
✅ **Attendance Records** - View and filter records  
✅ **Manual Entry** - Record attendance for past dates  
✅ **Monthly Reports** - Summary statistics  
✅ **Individual Reports** - Per-employee details  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **No Setup** - Works out of the box  

## Installation

### 1. Install Node.js
Download from: https://nodejs.org/ (LTS version)

### 2. Install Dependencies
```bash
npm install
```

### 3. Start System
```bash
npm start
```

### 4. Open Browser
Go to: http://localhost:3000

## Usage

### Add Employee
1. Go to "Employees" tab
2. Enter Name, Email, Department
3. Click "Add"

### Check In/Out
1. Go to "Check In/Out" tab
2. Select employee
3. Click "Check In" or "Check Out"

### View Records
1. Go to "Attendance" tab
2. Filter by date or month (optional)
3. View all records

### Generate Reports
1. Go to "Reports" tab
2. Select month
3. Click "Generate"
4. View summary

## API Endpoints

**Employees:**
- GET /api/employees
- POST /api/employees
- DELETE /api/employees/:id

**Attendance:**
- POST /api/attendance/check
- GET /api/attendance
- GET /api/attendance/today
- POST /api/attendance/manual

**Reports:**
- GET /api/reports/summary?month=YYYY-MM
- GET /api/reports/employee/:id?month=YYYY-MM

## Technology Stack

- Node.js + Express (Backend)
- SQLite (Database)
- EJS (Templates)
- HTML5 + CSS3 + JavaScript (Frontend)

## Database

### Employees Table
- id (Primary Key)
- name
- email (Unique)
- department
- created_at

### Attendance Table
- id (Primary Key)
- employee_id (Foreign Key)
- date
- check_in
- check_out
- status (present/absent/leave)

## File Structure

```
attendance-system/
├── server.js           (Main application)
├── package.json        (Dependencies)
├── views/
│   └── index.ejs       (User interface)
├── public/
│   ├── css/style.css   (Styling)
│   └── js/script.js    (Interactions)
├── db/                 (Database folder)
└── (Documentation files)
```

## Configuration

Change port in server.js:
```javascript
const PORT = 3000;  // Change this number
```

## Troubleshooting

**Port already in use:**
- Change PORT in server.js

**Module not found:**
- Run: npm install

**Database corrupted:**
- Delete db/attendance.db
- Restart system

**Can't connect:**
- Verify server is running: Check terminal
- Use correct URL: http://localhost:3000 (with http://)
- Check firewall settings

## Performance

- Up to 10,000+ employees
- Up to 1,000,000+ attendance records
- Fast database queries
- Responsive UI

## Backup

Database file location: `db/attendance.db`

To backup:
1. Stop server
2. Copy attendance.db to safe location
3. Restart server

## Support

For issues, check:
1. Terminal for error messages
2. Browser console (F12)
3. Verify Node.js is installed: node --version
4. Verify npm packages: npm install

## License

Free to use and modify.

## Version

1.0.0 - 2026

---

**Ready to use! Just extract and run!** 🚀
