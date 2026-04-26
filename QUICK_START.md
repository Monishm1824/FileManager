# Quick Reference Guide

## 📋 Project Overview

**TaskMaster** - A production-ready, full-stack task management system with role-based access control, built with Node.js/Express backend and React frontend.

## 🚀 Quick Start (5 Minutes)

### Windows Users
```bash
# Run setup script
setup.bat

# Update backend\.env with database credentials
# Then import database schema
```

### Mac/Linux Users
```bash
# Run setup script
bash setup.sh

# Update backend/.env with database credentials
# Then import database schema
```

### Manual Setup
```bash
# Backend
cd backend
npm install
# Edit .env with DB credentials
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

## 🔑 Demo Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | admin123 |
| Manager | manager@example.com | manager123 |
| Employee | employee@example.com | employee123 |

## 📂 Important Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express app entry point |
| `backend/.env` | Backend configuration |
| `backend/database_schema.sql` | Database schema |
| `frontend/src/App.jsx` | React app entry point |
| `frontend/.env` | Frontend configuration |
| `SETUP.md` | Detailed setup guide |
| `API_DOCUMENTATION.md` | API reference |
| `README.md` | Project documentation |

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| API Health | http://localhost:5000/api/health |

## 💾 Database Setup

```bash
# Create database
mysql -u root -p
CREATE DATABASE task_management;

# Import schema
mysql -u root -p task_management < backend/database_schema.sql
```

## 🔗 Key API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Resources
- `POST/GET/PUT/DELETE /api/tasks` - Manage tasks
- `POST/GET/PUT/DELETE /api/notes` - Manage notes
- `POST/GET/PUT /api/reports` - Manage reports
- `GET /api/users` - List users (admin only)

## 👥 Role Permissions

### Employee
- ✅ Manage own tasks (assigned to them)
- ✅ Create/manage own notes
- ✅ Submit reports

### Manager
- ✅ Create/assign/manage all tasks
- ✅ View employee reports
- ✅ Approve/reject reports
- ✅ View team members

### Admin
- ✅ Full system access
- ✅ Manage all users
- ✅ View all reports/analytics

## 🛠️ Environment Configuration

### Backend `.backend/.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=task_management
PORT=5000
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend `.frontend/.env`
```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MySQL 5.7+ |
| Auth | JWT + bcrypt |
| Styling | Tailwind CSS |

## 🚢 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import repo in Vercel
3. Set `VITE_API_URL` environment variable
4. Deploy

### Backend → Render
1. Push to GitHub
2. Create Web Service on Render
3. Set environment variables
4. Connect and deploy

## 🐛 Troubleshooting

### MySQL Connection Error
- Verify MySQL service is running
- Check credentials in `.env`
- Ensure database exists

### CORS Error
- Update `FRONTEND_URL` in backend `.env`
- Restart backend server

### API Not Responding
- Check backend is running: `http://localhost:5000/api/health`
- Verify `VITE_API_URL` in frontend `.env`

## 📚 Documentation

1. **README.md** - Full project overview
2. **SETUP.md** - Detailed setup and deployment guide
3. **API_DOCUMENTATION.md** - Complete API reference with examples

## 🎯 File Structure

```
.
├── backend/
│   ├── config/database.js
│   ├── controllers/ (auth, user, task, note, report)
│   ├── middlewares/ (auth, role)
│   ├── models/ (User, Task, Note, Report)
│   ├── routes/ (auth, user, task, note, report)
│   ├── utils/ (token, password, response)
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── database_schema.sql
│
├── frontend/
│   ├── src/
│   │   ├── components/ (Navbar, Sidebar, PrivateRoute)
│   │   ├── pages/ (Login, Register, Dashboard, Tasks, Notes, Reports, Users)
│   │   ├── services/api.js
│   │   ├── utils/apiClient.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env
│
├── README.md
├── SETUP.md
├── API_DOCUMENTATION.md
├── QUICK_START.md (this file)
├── setup.sh (Mac/Linux)
└── setup.bat (Windows)
```

## ✅ Features Checklist

- ✅ User Registration & Login
- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Role-Based Access Control
- ✅ Task Management (CRUD)
- ✅ Daily Notes
- ✅ Report Submission & Approval
- ✅ Task Assignment
- ✅ Responsive UI (Tailwind)
- ✅ API Error Handling
- ✅ Database Indexing
- ✅ Production-Ready Code

## 🔒 Security Features

- ✅ JWT token validation
- ✅ bcrypt password hashing
- ✅ Role-based endpoint protection
- ✅ CORS enabled
- ✅ Helmet security headers
- ✅ Input validation
- ✅ SQL injection prevention

## 📞 Support

- Check SETUP.md for detailed instructions
- Review API_DOCUMENTATION.md for endpoint details
- Check browser console for frontend errors
- Check server logs for backend errors

## 🎉 You're All Set!

Your production-ready task management system is ready to use. Start with the Quick Start guide above and refer to SETUP.md and API_DOCUMENTATION.md for more details.

---

**Need help?** Refer to the comprehensive documentation files included in the project.
