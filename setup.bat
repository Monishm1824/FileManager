@echo off

REM Task Management Application - Windows Setup Script

echo.
echo 🚀 Task Management Application Setup
echo ====================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install it first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend

if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
) else (
    echo ✅ Backend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASSWORD=your_password
        echo DB_NAME=task_management
        echo DB_PORT=3306
        echo PORT=5000
        echo NODE_ENV=development
        echo JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
        echo JWT_EXPIRE=7d
        echo FRONTEND_URL=http://localhost:3000
    ) > .env
    echo ⚠️  Please update .env with your database credentials
)

cd ..
echo ✅ Backend setup complete
echo.

REM Frontend Setup
echo 📦 Setting up Frontend...
cd frontend

if not exist "node_modules" (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo ✅ Frontend dependencies already installed
)

if not exist ".env" (
    echo Creating .env file...
    (
        echo VITE_API_URL=http://localhost:5000/api
    ) > .env
)

cd ..
echo ✅ Frontend setup complete
echo.

echo 🎉 Setup Complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your database credentials
echo 2. Import database schema:
echo    mysql -u root -p task_management ^< backend\database_schema.sql
echo 3. Start backend: cd backend ^&^& npm run dev
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo.
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
