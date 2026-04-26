# Task Management Web Application - Setup Instructions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MySQL (v5.7 or higher)
- Git (optional)

## 🗄️ Database Setup

### 1. Create Database

```bash
# Open MySQL command line or your MySQL client
mysql -u root -p

# Create database
CREATE DATABASE task_management;

# Use the database
USE task_management;
```

### 2. Import Schema

```bash
# Copy the database_schema.sql content and run it:
mysql -u root -p task_management < backend/database_schema.sql

# Or manually run the SQL commands from backend/database_schema.sql
```

### 3. Create Demo Users (Optional)

```sql
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', '$2a$10$...', 'admin'),
('Manager User', 'manager@example.com', '$2a$10$...', 'manager'),
('Employee User', 'employee@example.com', '$2a$10$...', 'employee');
```

**Note:** Passwords should be bcrypt hashed. Use these for testing:
- Password: `admin123` (pre-hashed during registration)

## 🚀 Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=task_management
DB_PORT=3306

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Start the Backend Server

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

The server should now be running at `http://localhost:5000`

**Health Check:**
```bash
curl http://localhost:5000/api/health
```

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the Development Server

```bash
npm run dev
```

The frontend should now be running at `http://localhost:3000`

## 🧪 Testing the Application

### Default Demo Credentials

```
Email: admin@example.com
Password: admin123
Role: Admin

Email: manager@example.com
Password: manager123
Role: Manager

Email: employee@example.com
Password: employee123
Role: Employee
```

### Test Workflow

1. **Register a New User**
   - Go to http://localhost:3000/register
   - Fill in the form
   - You'll be auto-logged in

2. **Login**
   - Go to http://localhost:3000/login
   - Use credentials above

3. **Employee Dashboard**
   - View dashboard with stats
   - Create and manage tasks
   - Write and manage notes
   - Submit daily reports

4. **Manager Dashboard**
   - Assign tasks to employees
   - View all employee reports
   - Approve/Reject reports

5. **Admin Dashboard**
   - Manage all users
   - View all tasks and reports
   - Full system access

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/users/:id/change-password` - Change password

### Tasks
- `POST /api/tasks` - Create task (Manager/Admin)
- `GET /api/tasks` - Get all tasks (Manager/Admin)
- `GET /api/tasks/my/tasks` - Get my tasks (Employee)
- `GET /api/tasks/:id` - Get task by ID
- `PUT /api/tasks/:id` - Update task (Manager/Admin)
- `DELETE /api/tasks/:id` - Delete task (Manager/Admin)

### Notes
- `POST /api/notes` - Create note
- `GET /api/notes/my/notes` - Get my notes
- `GET /api/notes` - Get all notes (Admin only)
- `GET /api/notes/:id` - Get note by ID
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Reports
- `POST /api/reports` - Create report
- `GET /api/reports/my/reports` - Get my reports
- `GET /api/reports` - Get all reports (Manager/Admin)
- `GET /api/reports/:id` - Get report by ID
- `PUT /api/reports/:id` - Update report (Manager/Admin)
- `POST /api/reports/:id/approve` - Approve report (Manager/Admin)
- `POST /api/reports/:id/reject` - Reject report (Manager/Admin)

## 🌐 Deployment

### Frontend (Vercel)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/task-management-frontend.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to https://vercel.com
   - Sign in with GitHub
   - Click "New Project"
   - Select your repository
   - Set environment variables (VITE_API_URL pointing to deployed backend)
   - Click Deploy

### Backend (Render)

1. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create New Service:**
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Select backend directory
   - Set environment variables (DB_HOST, DB_USER, etc.)
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Click Create Web Service

3. **Update Frontend:**
   - Update VITE_API_URL to your deployed backend URL

## 📝 Project Structure

```
task-management/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── taskController.js
│   │   ├── noteController.js
│   │   └── reportController.js
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Note.js
│   │   └── Report.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── noteRoutes.js
│   │   └── reportRoutes.js
│   ├── utils/
│   │   ├── tokenGenerator.js
│   │   ├── passwordHash.js
│   │   └── apiResponse.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── database_schema.sql
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── TasksPage.jsx
│   │   │   ├── NotesPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   └── UnauthorizedPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── apiClient.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── .env
```

## 🐛 Troubleshooting

### Backend Connection Issues
- Ensure MySQL is running: `mysql -u root -p` should connect
- Check DB credentials in `.env` file
- Verify database exists: `SHOW DATABASES;`

### Frontend API Errors
- Check backend is running: `http://localhost:5000/api/health`
- Verify VITE_API_URL in frontend `.env` file
- Check browser console for CORS errors

### Port Already in Use
```bash
# Find and kill process on port 5000 (Linux/Mac)
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

## ✨ Features Implemented

✅ User Authentication (JWT)
✅ Password Hashing (bcrypt)
✅ Role-Based Access Control (RBAC)
✅ Task Management (CRUD)
✅ Daily Notes
✅ Report Submission & Approval
✅ Responsive UI (Tailwind CSS)
✅ API Error Handling
✅ Database Schema with Indexes
✅ Production-Ready Structure

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check console logs for errors
4. Verify all dependencies are installed

## 📄 License

MIT License - Feel free to use this project for commercial or personal purposes.
