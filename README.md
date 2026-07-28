# 👋 Marhba

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React_Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

### 🔐 Full Stack Authentication Application

*A secure authentication system built with Express, PostgreSQL, JWT, Expo Router, Zustand, and Secure Storage.*

</div>

---

# 📖 Overview

**Marhba** is a minimalist mobile authentication application whose objective is to demonstrate a complete and secure authentication workflow between a mobile application and a REST API.

The project covers every step of authentication:

- User Registration
- User Login
- Password Hashing
- JWT Authentication
- Protected API Routes
- Protected Mobile Screens
- Persistent Sessions
- Secure Token Storage

Although the application is intentionally simple, it follows professional security practices used in real production applications.

---

# ✨ Features

## Backend

- ✅ User Registration
- ✅ User Login
- ✅ Password hashing using bcrypt
- ✅ JWT generation
- ✅ JWT verification
- ✅ Protected API routes
- ✅ Global Error Handler
- ✅ Request Logger
- ✅ Request Validation Middleware
- ✅ PostgreSQL Database
- ✅ Sequelize ORM
- ✅ Environment Variables

---

## Mobile App

- ✅ Login Screen
- ✅ Registration Screen
- ✅ Protected Home Screen
- ✅ Secure Authentication State
- ✅ Persistent Login
- ✅ Secure Token Storage
- ✅ Axios Instance
- ✅ Axios Interceptors
- ✅ Zustand Global Store
- ✅ Loading States
- ✅ Error Messages
- ✅ Automatic Redirection
- ✅ Logout

---

# 🛠 Tech Stack

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript Runtime |
| Express.js | REST API |
| PostgreSQL | Database |
| Sequelize | ORM |
| bcrypt | Password Hashing |
| jsonwebtoken | JWT Authentication |
| dotenv | Environment Variables |

---

## Frontend

| Technology | Purpose |
|------------|---------|
| Expo | Mobile Framework |
| React Native | Mobile UI |
| Expo Router | Navigation |
| Axios | HTTP Client |
| Zustand | Global State |
| expo-secure-store | Secure Token Storage |

---

## Development Tools

- Git
- GitHub
- Postman
- Jira
- VS Code

---

# 📂 Project Structure

```
marhba/
│
├── backend/
│   │
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   ├── .env
│   └── README.md
│
└── mobile/
    │
    ├── app/
    │   ├── (auth)/
    │   ├── (app)/
    │   ├── _layout.jsx
    │   └── index.jsx
    │
    ├── components/
    ├── hooks/
    ├── services/
    ├── store/
    ├── utils/
    ├── assets/
    ├── package.json
    └── README.md
```

---

# 🗄 Database Schema

## users

| Column | Type | Constraints |
|----------|------|-------------|
| id | INTEGER | Primary Key |
| fullName | STRING | NOT NULL |
| email | STRING | UNIQUE |
| password | STRING | Hashed |
| createdAt | DATE | Automatic |
| updatedAt | DATE | Automatic |

---

# 🔗 REST API

## Register

```
POST /api/auth/register
```

Creates a new account.

### Body

```json
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}
```

### Response

```json
{
    "token": "jwt_token"
}
```

---

## Login

```
POST /api/auth/login
```

### Body

```json
{
    "email": "john@example.com",
    "password": "123456"
}
```

### Response

```json
{
    "token": "jwt_token"
}
```

---

## Current User

```
GET /api/auth/me
```

Authorization

```
Bearer YOUR_JWT_TOKEN
```

Response

```json
{
    "id": 1,
    "fullName": "John Doe",
    "email": "john@example.com"
}
```

---

# 🔒 Authentication Flow

```
User Registers
        │
        ▼
Password hashed with bcrypt
        │
        ▼
User stored in PostgreSQL
        │
        ▼
JWT generated
        │
        ▼
JWT returned to Mobile App
        │
        ▼
Stored securely using Secure Store
        │
        ▼
Axios automatically sends token
        │
        ▼
Protected API verifies JWT
        │
        ▼
Protected Screen Access Granted
```

---

# 🧩 Express Middlewares

## Logger

Logs every incoming request.

Example:

```
GET /api/auth/me
2026-07-27 11:30
```

---

## Validation

Checks:

- Required fields
- Email format
- Password length

Returns

```
400 Bad Request
```

---

## Authentication

Responsibilities:

- Read Authorization header
- Verify JWT
- Attach req.user
- Reject invalid tokens

Returns

```
401 Unauthorized
```

---

## Error Handler

Centralized error middleware.

Returns

```json
{
    "error": "Something went wrong"
}
```

---

# 📱 Mobile Authentication Flow

```
Launch App
      │
      ▼
Restore Session
      │
      ▼
Read Token from Secure Store
      │
      ▼
GET /api/auth/me
      │
      ├───────────────┐
      │               │
      ▼               ▼
Valid Token      Invalid Token
      │               │
      ▼               ▼
Home Screen      Login Screen
```

---

# 🔐 Security Features

- Passwords never stored in plain text
- bcrypt Salt Rounds = 10
- JWT Authentication
- Protected Backend Routes
- Protected Frontend Screens
- Secure Token Storage
- Environment Variables
- Hidden JWT Secret
- Automatic Token Verification
- Authentication Middleware
- No Password Returned in Responses
- Generic Login Error Messages
- Token Expiration

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/marhba.git

cd marhba
```

---

# Backend Setup

```bash
cd backend

npm install
```

Create

```
.env
```

Example

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=marhba_db
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=super_secret_key

JWT_EXPIRES=7d
```

Run

```bash
npm run dev
```

---

# Mobile Setup

```bash
cd mobile

npm install

npx expo start
```

---

# 🚀 Environment Variables

```
PORT

DB_HOST

DB_PORT

DB_NAME

DB_USER

DB_PASSWORD

JWT_SECRET

JWT_EXPIRES
```

---

# 📡 Axios Interceptor

Every request automatically includes

```
Authorization: Bearer <token>
```

No request should manually attach the JWT.

---

# 🧠 Zustand Store

Authentication Store

```javascript
user

token

isAuthenticated

isLoading

login()

register()

logout()

restoreSession()
```

---

# 🔄 Session Persistence

At startup

```
Secure Store
      │
      ▼
Restore Token
      │
      ▼
GET /api/auth/me
      │
      ▼
Update Zustand Store
      │
      ▼
Navigate Automatically
```

---

# 🎯 Learning Objectives

This project demonstrates:

- REST API Design
- Authentication Systems
- Express Middleware
- Password Hashing
- JWT Security
- Protected Routes
- PostgreSQL Integration
- Sequelize ORM
- Mobile Authentication
- Secure Token Storage
- Axios Interceptors
- Zustand State Management
- Expo Router Protection
- Production-Level Architecture

---

# 🧪 Testing

Backend endpoints can be tested using:

- Postman
- Thunder Client
- Insomnia

Authentication scenarios:

- Register
- Login
- Invalid Credentials
- Invalid Token
- Expired Token
- Protected Routes
- Logout
- Session Restore

---

# 🚀 Future Improvements

- Email Verification
- Password Reset
- Refresh Tokens
- OAuth Authentication
- Two-Factor Authentication (2FA)
- Role-Based Authorization
- Rate Limiting
- Docker Support
- CI/CD Pipeline
- Unit Testing
- Integration Testing
- API Documentation (Swagger/OpenAPI)

---

# 👨‍💻 Author

**Megatechapp**

Full Stack Developer

- Node.js
- Express
- PostgreSQL
- React Native
- Expo
- TypeScript
- Mobile Development

---

# 📄 License

This project is released under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Made with ❤️ using **Node.js**, **PostgreSQL**, and **Expo**

</div>