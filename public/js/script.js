// Tab navigation
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabName = btn.getAttribute('data-tab');
    switchTab(tabName);
  });
});

function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  document.getElementById(tabName).classList.add('active');
  document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

  if (tabName === 'employees') {
    loadEmployees();
  } else if (tabName === 'attendance') {
    loadAttendance();
    loadEmployeesForManual();
  } else if (tabName === 'reports') {
    loadEmployeesForReport();
  } else if (tabName === 'check-in') {
    loadEmployeesForCheckIn();
    loadTodayStatus();
  }
}

// Load employees for check-in
function loadEmployeesForCheckIn() {
  fetch('/api/employees')
    .then(res => res.json())
    .then(employees => {
      const select = document.getElementById('selectEmployee');
      select.innerHTML = '<option value="">-- Choose --</option>';
      employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
      });
    });
}

function addEmployee() {
  const name = document.getElementById('empName').value;
  const email = document.getElementById('empEmail').value;
  const department = document.getElementById('empDepartment').value;

  if (!name || !email) {
    showMessage('empMessage', 'Please fill required fields', 'error');
    return;
  }

  fetch('/api/employees', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, department })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showMessage('empMessage', data.error, 'error');
      } else {
        document.getElementById('empName').value = '';
        document.getElementById('empEmail').value = '';
        document.getElementById('empDepartment').value = '';
        showMessage('empMessage', 'Employee added!', 'success');
        loadEmployees();
        loadEmployeesForCheckIn();
      }
    });
}

function loadEmployees() {
  fetch('/api/employees')
    .then(res => res.json())
    .then(employees => {
      const list = document.getElementById('employeeList');
      list.innerHTML = '';
      employees.forEach(emp => {
        list.innerHTML += `
          <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.email}</td>
            <td>${emp.department || '-'}</td>
            <td>
              <button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">Delete</button>
            </td>
          </tr>
        `;
      });
    });
}

function deleteEmployee(id) {
  if (confirm('Delete this employee?')) {
    fetch(`/api/employees/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        loadEmployees();
        loadEmployeesForCheckIn();
      });
  }
}

// Check in/out
function checkIn() {
  const empId = document.getElementById('selectEmployee').value;
  if (!empId) {
    showMessage('checkInMessage', 'Select employee', 'error');
    return;
  }

  fetch('/api/attendance/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee_id: empId, type: 'check_in' })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showMessage('checkInMessage', data.error, 'error');
      } else {
        showMessage('checkInMessage', '✓ ' + data.message, 'success');
        loadTodayStatus();
      }
    });
}

function checkOut() {
  const empId = document.getElementById('selectEmployee').value;
  if (!empId) {
    showMessage('checkInMessage', 'Select employee', 'error');
    return;
  }

  fetch('/api/attendance/check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee_id: empId, type: 'check_out' })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        showMessage('checkInMessage', data.error, 'error');
      } else {
        showMessage('checkInMessage', '✕ ' + data.message, 'success');
        loadTodayStatus();
      }
    });
}

function loadTodayStatus() {
  fetch('/api/attendance/today')
    .then(res => res.json())
    .then(records => {
      const statusDiv = document.getElementById('todayStatus');
      if (records.length === 0) {
        statusDiv.innerHTML = '<p>No records for today</p>';
        return;
      }

      statusDiv.innerHTML = '';
      records.forEach(record => {
        const checkedIn = record.check_in ? '✓ ' + record.check_in : 'Not checked in';
        const checkedOut = record.check_out ? '✕ ' + record.check_out : 'Still working';

        statusDiv.innerHTML += `
          <div class="status-item">
            <div class="status-item-name">${record.name}</div>
            <div class="status-item-time">${record.department}</div>
            <div class="status-item-time">${checkedIn}</div>
            <div class="status-item-time">${checkedOut}</div>
          </div>
        `;
      });
    });
}

function loadEmployeesForManual() {
  fetch('/api/employees')
    .then(res => res.json())
    .then(employees => {
      const select = document.getElementById('manualEmpId');
      select.innerHTML = '<option value="">-- Choose --</option>';
      employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
      });
    });
}

function loadAttendance() {
  fetch('/api/attendance')
    .then(res => res.json())
    .then(records => displayAttendanceTable(records));
}

function displayAttendanceTable(records) {
  const list = document.getElementById('attendanceList');
  list.innerHTML = '';
  if (records.length === 0) {
    list.innerHTML = '<tr><td colspan="5">No records</td></tr>';
    return;
  }

  records.forEach(record => {
    list.innerHTML += `
      <tr>
        <td>${record.date}</td>
        <td>${record.name}</td>
        <td>${record.check_in || '-'}</td>
        <td>${record.check_out || '-'}</td>
        <td>${record.status}</td>
      </tr>
    `;
  });
}

function filterAttendance() {
  const date = document.getElementById('filterDate').value;
  const month = document.getElementById('filterMonth').value;

  let query = '/api/attendance';
  if (date) query += '?date=' + date;
  else if (month) query += '?month=' + month;

  fetch(query)
    .then(res => res.json())
    .then(records => displayAttendanceTable(records));
}

function clearFilter() {
  document.getElementById('filterDate').value = '';
  document.getElementById('filterMonth').value = '';
  loadAttendance();
}

function addManualAttendance() {
  const empId = document.getElementById('manualEmpId').value;
  const date = document.getElementById('manualDate').value;
  const checkIn = document.getElementById('manualCheckIn').value;
  const checkOut = document.getElementById('manualCheckOut').value;
  const status = document.getElementById('manualStatus').value;

  if (!empId || !date) {
    alert('Select employee and date');
    return;
  }

  fetch('/api/attendance/manual', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      employee_id: empId,
      date,
      check_in: checkIn || null,
      check_out: checkOut || null,
      status
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) alert(data.error);
      else {
        alert('Attendance recorded!');
        loadAttendance();
      }
    });
}

// Reports
function loadEmployeesForReport() {
  fetch('/api/employees')
    .then(res => res.json())
    .then(employees => {
      const select = document.getElementById('reportEmpId');
      select.innerHTML = '<option value="">-- Choose --</option>';
      employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
      });
    });
}

function generateReport() {
  const month = document.getElementById('reportMonth').value;
  if (!month) {
    alert('Select month');
    return;
  }

  fetch(`/api/reports/summary?month=${month}`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('reportList');
      list.innerHTML = '';
      data.forEach(row => {
        list.innerHTML += `
          <tr>
            <td>${row.name}</td>
            <td>${row.department || '-'}</td>
            <td>${row.days_present}</td>
            <td>${row.days_absent}</td>
            <td>${row.days_leave}</td>
          </tr>
        `;
      });
    });
}

function generateEmployeeReport() {
  const empId = document.getElementById('reportEmpId').value;
  const month = document.getElementById('reportEmpMonth').value;

  if (!empId || !month) {
    alert('Select employee and month');
    return;
  }

  fetch(`/api/reports/employee/${empId}?month=${month}`)
    .then(res => res.json())
    .then(records => {
      const list = document.getElementById('employeeReportList');
      list.innerHTML = '';
      if (records.length === 0) {
        list.innerHTML = '<tr><td colspan="4">No records</td></tr>';
        return;
      }

      records.forEach(record => {
        list.innerHTML += `
          <tr>
            <td>${record.date}</td>
            <td>${record.check_in || '-'}</td>
            <td>${record.check_out || '-'}</td>
            <td>${record.status}</td>
          </tr>
        `;
      });
    });
}

function printReport() {
  window.print();
}

function showMessage(elementId, message, type) {
  const msgEl = document.getElementById(elementId);
  msgEl.textContent = message;
  msgEl.className = `message show ${type}`;
  setTimeout(() => {
    msgEl.classList.remove('show');
  }, 5000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  document.querySelectorAll('input[type="date"]').forEach(input => {
    if (!input.value) input.value = today;
  });

  document.querySelectorAll('input[type="month"]').forEach(input => {
    if (!input.value) input.value = currentMonth;
  });

  loadEmployeesForCheckIn();
});
