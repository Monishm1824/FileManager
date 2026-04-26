# TaskMaster - Full-Stack Task Management Web Application

A production-ready web application for managing daily tasks, notes, and reports with comprehensive role-based access control.

## ✨ Features

### Core Features
- ✅ **Task Management** - Create, edit, delete, and track task status
- ✅ **Daily Notes** - Write and manage personal notes
- ✅ **End-of-Day Reports** - Submit daily reports with approval workflow
- ✅ **Task Status Tracking** - Pending, In Progress, Completed
- ✅ **Role-Based Access Control** - Employee, Manager, Admin hierarchy

### Security
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Password Hashing** - bcrypt password encryption
- ✅ **Protected Routes** - Role-based endpoint protection
- ✅ **Middleware Authorization** - Request-level role verification

### User Roles

#### 👨‍💼 Employee
- Manage assigned tasks
- Write daily notes
- Submit end-of-day reports
- View personal dashboard

#### 👔 Manager
- Assign tasks to employees
- Create and manage all tasks
- View employee reports
- Approve/Reject reports
- View team analytics

#### 🔑 Admin
- Manage all users
- View all tasks and reports
- Full system access
- System analytics

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet, CORS
- **Validation**: express-validator

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Icons**: Lucide React

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MySQL (managed service)

## 📁 Project Structure

```
task-management/
├── backend/
│   ├── config/
│   │   └── database.js           # MySQL connection pool
│   ├── controllers/              # Business logic
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── taskController.js
│   │   ├── noteController.js
│   │   └── reportController.js
│   ├── middlewares/              # Authentication & Authorization
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   ├── models/                   # Database queries
│   │   ├── User.js
│   │   ├── Task.js
│   │   ├── Note.js
│   │   └── Report.js
│   ├── routes/                   # API endpoints
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── noteRoutes.js
│   │   └── reportRoutes.js
│   ├── utils/                    # Helper functions
│   │   ├── tokenGenerator.js
│   │   ├── passwordHash.js
│   │   └── apiResponse.js
│   ├── server.js                 # Express app entry point
│   ├── database_schema.sql       # Database schema
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/                # Page components
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── TasksPage.jsx
│   │   │   ├── NotesPage.jsx
│   │   │   ├── ReportsPage.jsx
│   │   │   ├── UsersPage.jsx
│   │   │   └── UnauthorizedPage.jsx
│   │   ├── services/             # API integration
│   │   │   └── api.js
│   │   ├── utils/                # Utilities
│   │   │   └── apiClient.js
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # React entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── SETUP.md                      # Setup instructions
├── API_DOCUMENTATION.md          # API reference
└── README.md                     # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MySQL v5.7+
- npm/yarn

### 1. Backend Setup

```bash
cd backend
npm install

# Configure .env
cp .env .env.local
# Edit .env with your database credentials

# Run database schema
mysql -u root -p task_management < database_schema.sql

# Start server
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install

# Configure .env (if different API URL)
# Default: http://localhost:5000/api

# Start development server
npm run dev
```

### 3. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 📝 Demo Credentials

```
ADMIN
Email: admin@example.com
Password: admin123

MANAGER
Email: manager@example.com
Password: manager123

EMPLOYEE
Email: employee@example.com
Password: employee123
```

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend validates credentials
3. JWT token is generated
4. Token stored in localStorage
5. Token sent with every request in `Authorization` header
6. Server verifies token and role
7. Response is sent based on permissions

## 📊 Database Schema

### Users Table
```sql
id, name, email, password, role, created_at, updated_at
```

### Tasks Table
```sql
id, title, description, status, assigned_to, created_by, created_at, updated_at
```

### Notes Table
```sql
id, user_id, content, created_at, updated_at
```

### Reports Table
```sql
id, user_id, summary, status, created_at, updated_at
```

## 🔄 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

## 🌐 Deployment Guide

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Connect GitHub repository to Vercel
3. Set environment variables
4. Deploy

### Deploy to Render (Backend)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Set environment variables
5. Configure build and start commands
6. Deploy

See `SETUP.md` for detailed deployment instructions.

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Detailed setup and deployment instructions
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference

## 🧪 Testing

### Manual Testing
1. Register a new account
2. Login with credentials
3. Test role-based features
4. Create, update, delete tasks
5. Write and manage notes
6. Submit reports (approve/reject)

### API Testing
Use Postman or cURL to test API endpoints. See API_DOCUMENTATION.md for examples.

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Verify MySQL is running
mysql -u root -p
# Check credentials in .env
```

### CORS Error
```bash
# Ensure FRONTEND_URL is correct in backend .env
# Frontend must be allowed in backend CORS settings
```

### Port Already in Use
```bash
# Kill process on port 5000/3000
# Linux/Mac: lsof -i :5000 && kill -9 <PID>
# Windows: netstat -ano | findstr :5000 && taskkill /PID <PID> /F
```

## 📈 Performance Optimizations

- Database indexes on frequently queried columns
- JWT token validation on every request
- CORS configured for security
- Helmet middleware for secure headers
- Express validation middleware
- Connection pooling for database

## 🔒 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token expiration (7 days)
- ✅ Role-based access control on every endpoint
- ✅ Input validation and sanitization
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection (React escapes content)

## 📦 Dependencies

### Backend
- express (4.18.2)
- mysql2 (3.6.0)
- bcryptjs (2.4.3)
- jsonwebtoken (9.0.0)
- cors (2.8.5)
- helmet (7.0.0)
- express-validator (7.0.0)
- dotenv (16.0.3)

### Frontend
- react (18.2.0)
- react-router-dom (6.14.0)
- axios (1.4.0)
- tailwindcss (3.3.0)
- lucide-react (0.263.0)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
1. Check troubleshooting section in SETUP.md
2. Review API documentation
3. Check browser console for errors
4. Verify all environment variables are set correctly

## 🎯 Future Enhancements

- [ ] Email notifications for task assignments
- [ ] Real-time notifications using WebSockets
- [ ] Task comments and discussion threads
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Task templates and recurring tasks
- [ ] File attachments for tasks and notes
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Multi-language support

## 🙏 Credits

Built with ❤️ using Node.js, Express, React, and Tailwind CSS.

---

**Version**: 1.0.0  
**Last Updated**: January 2024  
**Status**: Production Ready ✅
