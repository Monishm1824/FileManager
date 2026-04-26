# Task Management Web Application - API Documentation

## 🔐 Authentication

All requests (except `/auth/register` and `/auth/login`) require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

## 📚 API Endpoints Reference

### 1. Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "employee"  // Optional, defaults to 'employee'
}

Response:
{
  "success": true,
  "message": "User registered successfully.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "created_at": "2024-01-01T10:00:00Z"
    },
    "token": "eyJhbGc..."
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "created_at": "2024-01-01T10:00:00Z"
    },
    "token": "eyJhbGc..."
  }
}
```

### 2. User Management Endpoints

#### Get All Users
```
GET /api/users?role=employee
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Users fetched successfully.",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "created_at": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### Get User by ID
```
GET /api/users/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "User fetched successfully.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### Update User
```
PUT /api/users/:id
Authorization: Bearer <token>
Content-Type: application/json
Role Required: admin

{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "manager"
}

Response:
{
  "success": true,
  "message": "User updated successfully.",
  "data": { /* updated user */ }
}
```

#### Delete User
```
DELETE /api/users/:id
Authorization: Bearer <token>
Role Required: admin

Response:
{
  "success": true,
  "message": "User deleted successfully."
}
```

#### Change Password
```
POST /api/users/:id/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "newPassword": "newpassword123"
}

Response:
{
  "success": true,
  "message": "Password changed successfully."
}
```

### 3. Task Management Endpoints

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json
Role Required: manager, admin

{
  "title": "Fix login bug",
  "description": "There's an issue with user authentication",
  "status": "pending",  // Optional: pending, in_progress, completed
  "assignedTo": 5       // Optional: user ID
}

Response:
{
  "success": true,
  "message": "Task created successfully.",
  "data": {
    "id": 10,
    "title": "Fix login bug",
    "description": "There's an issue with user authentication",
    "status": "pending",
    "assigned_to": 5,
    "created_by": 3,
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### Get All Tasks
```
GET /api/tasks?status=pending&assignedTo=5
Authorization: Bearer <token>
Role Required: manager, admin

Response:
{
  "success": true,
  "message": "Tasks fetched successfully.",
  "data": [ /* array of tasks */ ]
}
```

#### Get My Tasks
```
GET /api/tasks/my/tasks
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Your tasks fetched successfully.",
  "data": [ /* array of user's tasks */ ]
}
```

#### Get Task by ID
```
GET /api/tasks/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Task fetched successfully.",
  "data": { /* task object */ }
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json
Role Required: manager, admin

{
  "title": "Fix login bug - URGENT",
  "description": "Critical issue with user authentication",
  "status": "in_progress",
  "assignedTo": 5
}

Response:
{
  "success": true,
  "message": "Task updated successfully.",
  "data": { /* updated task */ }
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
Role Required: manager, admin

Response:
{
  "success": true,
  "message": "Task deleted successfully."
}
```

### 4. Notes Endpoints

#### Create Note
```
POST /api/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Today I completed 3 tasks and attended the team meeting."
}

Response:
{
  "success": true,
  "message": "Note created successfully.",
  "data": {
    "id": 5,
    "user_id": 1,
    "content": "Today I completed 3 tasks...",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### Get My Notes
```
GET /api/notes/my/notes
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Notes fetched successfully.",
  "data": [ /* array of user's notes */ ]
}
```

#### Get All Notes
```
GET /api/notes
Authorization: Bearer <token>
Role Required: admin

Response:
{
  "success": true,
  "message": "All notes fetched successfully.",
  "data": [ /* array of all notes */ ]
}
```

#### Get Note by ID
```
GET /api/notes/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Note fetched successfully.",
  "data": { /* note object */ }
}
```

#### Update Note
```
PUT /api/notes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated note content"
}

Response:
{
  "success": true,
  "message": "Note updated successfully.",
  "data": { /* updated note */ }
}
```

#### Delete Note
```
DELETE /api/notes/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Note deleted successfully."
}
```

### 5. Reports Endpoints

#### Create Report
```
POST /api/reports
Authorization: Bearer <token>
Content-Type: application/json

{
  "summary": "Completed 5 tasks today. Fixed login bug, updated documentation, and attended team meeting."
}

Response:
{
  "success": true,
  "message": "Report submitted successfully.",
  "data": {
    "id": 8,
    "user_id": 1,
    "summary": "Completed 5 tasks today...",
    "status": "submitted",
    "created_at": "2024-01-01T10:00:00Z"
  }
}
```

#### Get My Reports
```
GET /api/reports/my/reports
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Reports fetched successfully.",
  "data": [ /* array of user's reports */ ]
}
```

#### Get All Reports
```
GET /api/reports?status=submitted&userId=1
Authorization: Bearer <token>
Role Required: manager, admin

Response:
{
  "success": true,
  "message": "All reports fetched successfully.",
  "data": [ /* array of all reports */ ]
}
```

#### Get Report by ID
```
GET /api/reports/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Report fetched successfully.",
  "data": { /* report object */ }
}
```

#### Approve Report
```
POST /api/reports/:id/approve
Authorization: Bearer <token>
Role Required: manager, admin

Response:
{
  "success": true,
  "message": "Report approved successfully.",
  "data": {
    "id": 8,
    "status": "approved",
    /* ... other fields ... */
  }
}
```

#### Reject Report
```
POST /api/reports/:id/reject
Authorization: Bearer <token>
Content-Type: application/json
Role Required: manager, admin

{
  "reason": "Insufficient details provided"
}

Response:
{
  "success": true,
  "message": "Report rejected.",
  "data": {
    "id": 8,
    "status": "rejected",
    "summary": "Original summary...\n\n[Rejected - Reason: Insufficient details provided]",
    /* ... other fields ... */
  }
}
```

#### Update Report
```
PUT /api/reports/:id
Authorization: Bearer <token>
Content-Type: application/json
Role Required: manager, admin

{
  "summary": "Updated summary",
  "status": "pending"
}

Response:
{
  "success": true,
  "message": "Report updated successfully.",
  "data": { /* updated report */ }
}
```

## 🔀 Role-Based Access Control

### Employee
- ✅ Create/Read/Update/Delete own tasks (assigned to them)
- ✅ Create/Read/Update/Delete own notes
- ✅ Create/Read own reports
- ❌ Cannot manage users
- ❌ Cannot view all tasks/reports

### Manager
- ✅ Create/Read/Update/Delete all tasks
- ✅ Assign tasks to employees
- ✅ Read all employee notes
- ✅ Read/Approve/Reject all reports
- ✅ View all users
- ❌ Cannot delete users

### Admin
- ✅ Full system access
- ✅ Create/Read/Update/Delete all resources
- ✅ Manage all users
- ✅ View all analytics

## 📊 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (invalid data)
- `401` - Unauthorized (no/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## 🧪 Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'

# Get all users (with token)
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"

# Create task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "New Task",
    "description": "Task description"
  }'
```

## ⚙️ Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=task_management
DB_PORT=3306
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```
