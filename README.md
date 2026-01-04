# 🎓 Mentor Management System

A comprehensive backend API system for managing mentors, students, tasks, and assignments with role-based access control and secure authentication.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Key Components](#key-components)
- [API Documentation](#api-documentation)

---

## 🎯 Overview

The Mentor Management System is a robust Node.js backend application built with Express.js and MongoDB. It provides a complete solution for managing educational mentorship programs, including user authentication, role-based access control, task management, and file uploads.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- **JWT-based authentication** for secure user sessions
- **Role-based access control** (Admin, Mentor, Student)
- **Protected routes** with middleware authentication
- **Token generation** utility for seamless login

### 📊 **Database Models**
- **User Management** - User accounts with role-based permissions
- **Student Management** - Student profiles with mentor assignments
- **Mentor Management** - Mentor profiles and contact information
- **Task Management** - Task creation and assignment system
- **Task Assignment** - Student task submissions and mentor feedback
- **Warning System** - Warning tracking for students
- **Notification System** - User notifications

### 📁 **File Upload**
- **Image upload** support using Multer
- **Cloudinary integration** for cloud storage
- **File validation** (images only, max 5MB)
- **Memory storage** for efficient processing

### 🛠️ **Development Tools**
- **ES6 Modules** support
- **Environment variables** configuration
- **Hot reload** with Nodemon
- **CORS** enabled for cross-origin requests

---

## 🚀 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express.js** | ^5.2.1 | Web framework |
| **MongoDB** | - | Database |
| **Mongoose** | ^9.1.1 | ODM for MongoDB |
| **JWT** | ^9.0.3 | Authentication tokens |
| **Bcrypt** | ^6.0.0 | Password hashing |
| **Multer** | ^2.0.2 | File upload handling |
| **Cloudinary** | ^2.0.0 | Cloud image storage |
| **CORS** | ^2.8.5 | Cross-origin resource sharing |
| **Dotenv** | ^17.2.3 | Environment variables |

---

## 📁 Project Structure

```
Mentor Management System/
│
├── config/
│   └── db.js                 # Database connection configuration
│
├── middlewares/
│   ├── isAuthenticated.js    # JWT authentication middleware
│   ├── roleBasedAccess.js    # Role-based access control
│   └── multer.js             # File upload configuration
│
├── models/
│   ├── UserModel.js          # User schema
│   ├── StudentModel.js       # Student schema
│   ├── MentorModel.js        # Mentor schema
│   ├── TaskModel.js          # Task schema
│   ├── TaskAssignmentModel.js # Task assignment schema
│   ├── WarningModel.js       # Warning schema
│   └── NotificationModel.js   # Notification schema
│
├── utils/
│   └── GenerateToken.js      # JWT token generation utility
│
├── server.js                 # Main application entry point
├── package.json              # Project dependencies
└── README.md                 # Project documentation
```

---

## 🔧 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for image uploads)

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Mentor Management System"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the production server**
   ```bash
   npm start
   ```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port number | No (default: 3000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRES_IN` | Token expiration time | No (default: 7d) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes |
| `CLOUDINARY_API_KEY` | Cloudinary API key | Yes |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | Yes |

---

## 🔑 Key Components

### 1. **Authentication System**

#### Token Generation (`utils/GenerateToken.js`)
- Generates JWT tokens for user authentication
- Accepts user payload (user_id and role)
- Configurable expiration time via environment variables
- Uses JWT_SECRET from environment for token signing

#### Authentication Middleware (`middlewares/isAuthenticated.js`)
- Validates JWT tokens from Authorization header
- Attaches user object to `req.user` for use in routes
- Handles token expiration and invalid tokens
- Returns appropriate error messages for different authentication failures

### 2. **Role-Based Access Control**

#### Middleware (`middlewares/roleBasedAccess.js`)
- Supports multiple roles per route
- Pre-configured role-specific middleware
- Checks user role against allowed roles
- Returns 403 Forbidden if user doesn't have required role

#### Available Exports:
- `roleBasedAccess(...roles)` - Custom role checking for multiple roles
- `adminOnly` - Admin access only middleware
- `mentorOnly` - Mentor access only middleware
- `studentOnly` - Student access only middleware

### 3. **File Upload System**

#### Multer Configuration (`middlewares/multer.js`)
- **Memory storage** for efficient processing
- **Image-only filter** (PNG, JPG, JPEG, GIF, WEBP, etc.)
- **5MB file size limit**
- Rejects documents and PDFs
- Validates file mimetype before processing
- Stores files in memory buffer for Cloudinary upload

### 4. **Database Models**

All models follow a consistent formatting pattern with:
- Proper field definitions
- Type validation
- Required fields
- Default values
- References to other models
- Timestamps (where applicable)

#### Key Models:
- **UserModel** - Authentication and role management
- **StudentModel** - Student profiles with mentor relationships
- **MentorModel** - Mentor information
- **TaskModel** - Task definitions
- **TaskAssignmentModel** - Student submissions and feedback
- **WarningModel** - Warning tracking system
- **NotificationModel** - User notifications

---

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Response Format
```json
{
    "success": true/false,
    "message": "Response message",
    "data": {}
}
```

---

## 🎨 Code Quality

- ✅ **ES6 Modules** - Modern JavaScript import/export syntax
- ✅ **Consistent Formatting** - All models follow the same structure
- ✅ **Error Handling** - Comprehensive error handling in middleware
- ✅ **Security** - Password hashing, JWT tokens, role-based access
- ✅ **Validation** - File type and size validation
- ✅ **Documentation** - Well-commented code

---

## 📝 Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ File type validation
- ✅ File size limits
- ✅ Environment variable configuration

---

## 👥 Contributors

Developed with ❤️ for efficient mentor management.

---

**Last Updated:** Today  
**Version:** 1.0.0

