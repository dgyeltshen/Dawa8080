# 📖 COMPLETE SETUP GUIDE

## ✅ YOUR ATTENDANCE SYSTEM IS READY!

All files are prepared and ready to use.

---

## 📦 WHAT YOU HAVE

```
attendance-system/
├── 🖥️ APPLICATION CODE (Ready to run)
│   ├── server.js              (Backend - 6KB)
│   ├── package.json           (Dependencies)
│   ├── views/index.ejs        (User interface)
│   ├── public/css/style.css   (Styling)
│   └── public/js/script.js    (Interactions)
│
├── 📚 DOCUMENTATION
│   ├── QUICK-START.md         ⭐ Start here
│   ├── README.md              (Full documentation)
│   ├── SETUP.md               (This file)
│   └── start scripts           (Startup files)
│
├── 🚀 STARTUP SCRIPTS
│   ├── start-windows.bat      (For Windows)
│   └── start-unix.sh          (For Mac/Linux)
│
└── 📁 FOLDERS (Auto-created)
    ├── public/css/            (Stylesheet folder)
    ├── public/js/             (JavaScript folder)
    ├── views/                 (Templates folder)
    └── db/                    (Database folder - auto-created)
```

---

## 🎯 INSTALLATION STEPS

### Step 1: Install Node.js (Required)

**Download from:** https://nodejs.org/

Choose "LTS" (Long Term Support) version.

**Installation:**
- Windows: Run installer → Click Next → Install
- Mac: Run installer → Follow prompts
- Linux: `sudo apt-get install nodejs npm`

**Verify:**
```bash
node --version
npm --version
```

Should show version numbers (e.g., v16.0.0, 8.0.0)

### Step 2: Install Project Dependencies

Open terminal in the attendance-system folder:

```bash
npm install
```

This downloads all required packages (takes 2-5 minutes).

**Wait for:** "added XXX packages" message

### Step 3: Start the System

```bash
npm start
```

You should see:
```
Connected to SQLite database
Attendance System running at http://localhost:3000
```

### Step 4: Open in Browser

Open any web browser and go to:

**http://localhost:3000**

✅ **System is running!**

---

## 🖥️ WINDOWS USERS - SHORTCUT

Instead of terminal commands, you can double-click:

**start-windows.bat**

It will:
1. Check Node.js
2. Install dependencies
3. Start the system
4. Open browser (you do it manually)

---

## 🖥️ MAC/LINUX USERS - SHORTCUT

Run in terminal:

```bash
chmod +x start-unix.sh
./start-unix.sh
```

Or double-click:

**start-unix.sh**

---

## ⏸️ HOW TO STOP

Press **Ctrl + C** in the terminal

(Hold Ctrl, press C)

---

## 🔄 HOW TO RESTART

1. Stop the system (Ctrl + C)
2. Run: `npm start`
3. System starts again

---

## 📱 ACCESS FROM OTHER COMPUTERS

If you want others on your network to use it:

1. Find your IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` (look for inet address)

2. Share this URL with them:
   - `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

---

## 💾 BACKUP YOUR DATA

Database file: `db/attendance.db`

To backup:
1. Stop the system
2. Copy `db/attendance.db` to safe location
3. Keep it safe!

To restore:
1. Stop the system
2. Replace new `db/attendance.db` with your backup
3. Start system

---

## 🔧 TROUBLESHOOTING

### Problem: "command not found: node"
**Solution:** Node.js not installed or not in PATH
- Reinstall Node.js from https://nodejs.org/
- Restart computer (Windows)

### Problem: "Port 3000 already in use"
**Solution:** Use different port
- Edit `server.js`
- Change: `const PORT = 3000;` to `const PORT = 3001;`
- Save and restart

### Problem: "Cannot find module express"
**Solution:** Dependencies not installed
- Run: `npm install`

### Problem: "Cannot connect to localhost:3000"
**Solution:** Several possibilities
- Verify server is running: Check terminal for "running at http://localhost:3000"
- Use correct URL: http://localhost:3000 (include http://)
- Try: http://127.0.0.1:3000
- Refresh browser: Press F5
- Check firewall: Allow port 3000

### Problem: Database seems corrupted
**Solution:** Reset database
- Stop server (Ctrl + C)
- Delete: `db/attendance.db`
- Start server (new database created)

---

## 📊 SYSTEM REQUIREMENTS

- Node.js v12+ (includes npm)
- 2GB RAM minimum
- 500MB free disk space
- Any modern web browser
- No internet needed after setup

---

## 📋 FILE LOCATIONS

All files are in the `attendance-system/` folder:

- **Application**: `server.js`, `package.json`
- **Frontend**: `views/index.ejs`, `public/css/`, `public/js/`
- **Database**: `db/attendance.db` (created on first run)
- **Documentation**: `*.md` files

---

## 🎮 FEATURES YOU NOW HAVE

✅ **Add Employees**
- Name, email, department

✅ **Quick Check-In**
- One click to mark arrival

✅ **Quick Check-Out**
- One click to mark departure

✅ **View Today's Status**
- See all today's check-ins/outs

✅ **View All Records**
- Filter by date or month

✅ **Manual Entry**
- Record past attendance

✅ **Monthly Reports**
- Summary: Present, Absent, Leave

✅ **Individual Reports**
- Per-employee monthly details

✅ **Print Reports**
- Export to PDF or paper

---

## ⚙️ CONFIGURATION

### Default Settings:
- Port: 3000
- Database: SQLite (db/attendance.db)
- Host: localhost

### Change Port:
Edit `server.js`:
```javascript
const PORT = 3000;  // Change this number
```

---

## 🚀 NEXT STEPS

1. **Install Node.js** (if not done)
2. **Run:** `npm install`
3. **Run:** `npm start`
4. **Go to:** http://localhost:3000
5. **Start using!**

---

## 📞 HELP

1. Check terminal for error messages
2. Read README.md for usage guide
3. Check QUICK-START.md for quick reference
4. Verify Node.js: `node --version`
5. Check internet connection (for npm install)

---

## ✨ YOU'RE ALL SET!

Everything is ready. Just follow the installation steps above.

**Total time:** ~10 minutes (mostly waiting for npm install)

---

**Start with Step 1: Install Node.js** ➜
