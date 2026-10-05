#!/bin/bash

echo "========================================"
echo "Attendance System Starter"
echo "========================================"
echo ""

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download from: https://nodejs.org/"
    exit 1
fi

echo "Node.js found"
echo ""
echo "Installing dependencies..."
npm install

echo ""
echo "Starting Attendance System..."
echo ""
echo "Access at: http://localhost:3000"
echo "Press Ctrl+C to stop"
echo ""

npm start
