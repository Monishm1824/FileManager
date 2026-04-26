#!/bin/bash

# Task Management Application - Setup Script

echo "🚀 Task Management Application Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✅ Backend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
EOF
    echo "⚠️  Please update .env with your database credentials"
fi

cd ..
echo "✅ Backend setup complete"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✅ Frontend dependencies already installed"
fi

if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << EOF
VITE_API_URL=http://localhost:5000/api
EOF
fi

cd ..
echo "✅ Frontend setup complete"
echo ""

echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Import database schema:"
echo "   mysql -u root -p task_management < backend/database_schema.sql"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "Frontend: http://localhost:3000"
echo "Backend: http://localhost:5000"
