# 🚀 QUICK START - 3 SIMPLE STEPS

## STEP 1: Install Node.js (If Not Already Installed)

### Download from: https://nodejs.org/
- Click "LTS" button
- Download for your OS
- Run installer and follow prompts

### Verify Installation:
```bash
node --version
npm --version
```

Both should show version numbers.

---

## STEP 2: Install Dependencies

Open terminal/command prompt in the attendance-system folder:

```bash
npm install
```

Wait for it to finish (2-5 minutes).

---

## STEP 3: Start the System

```bash
npm start
```

You should see:
```
Connected to SQLite database
Attendance System running at http://localhost:3000
```

---

## STEP 4: Open in Browser

Go to: **http://localhost:3000**

Done! System is running! 🎉

---

## How to Stop:

Press `Ctrl + C` in the terminal

---

## Features:

✅ Add Employees  
✅ Quick Check-In/Out  
✅ View Attendance Records  
✅ Manual Entry  
✅ Generate Reports  
✅ Monthly Summary  

---

## Troubleshooting:

**Port 3000 in use?**
- Edit server.js, change `const PORT = 3000;` to `const PORT = 3001;`

**"Cannot find module" error?**
- Run: `npm install` again

**Database issues?**
- Delete `db/attendance.db` file
- Restart the system

---

That's it! Enjoy! ✨
