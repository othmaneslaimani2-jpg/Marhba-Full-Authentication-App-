# 🔐 Marhba Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Authentication-black?style=for-the-badge&logo=jsonwebtokens)
![bcrypt](https://img.shields.io/badge/bcrypt-Password_Hashing-orange?style=for-the-badge)

### Secure Authentication REST API

*A production-ready authentication backend built with Express, PostgreSQL, Sequelize, JWT, and bcrypt.*

</div>

---

# 📖 Overview

The **Marhba Backend** is a RESTful authentication API responsible for handling user authentication and authorization for the Marhba mobile application.

The API follows modern security best practices by hashing passwords, generating JSON Web Tokens (JWT), validating requests through middleware, and protecting private routes using authentication middleware.

The main objective of this project is to demonstrate a complete authentication workflow between an Express backend and a mobile application.

---

# ✨ Features

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Password Hashing with bcrypt
- ✅ Protected Routes
- ✅ Request Validation
- ✅ Authentication Middleware
- ✅ Global Request Logger
- ✅ Global Error Handler
- ✅ PostgreSQL Database
- ✅ Sequelize ORM
- ✅ Environment Variables
- ✅ MVC Architecture

---

# 🛠 Tech Stack

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

# 📁 Project Structure

```
backend/
│
├── src/
│
├── config/
│   ├── database.js
│   └── jwt.js
│
├── controllers/
│   └── auth.controller.js
│
├── middlewares/
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validation.js
│
├── models/
│   ├── index.js
│   └── User.js
│
├── routes/
│   └── auth.routes.js
│
├── utils/
│
├── app.js
├── server.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

# 🗄 Database Schema

## users

| Column | Type | Constraints |
|---------|------|-------------|
| id | INTEGER | Primary Key, Auto Increment |
| fullName | STRING | NOT NULL |
| email | STRING | UNIQUE, NOT NULL |
| password | STRING | NOT NULL (Hashed) |
| createdAt | DATE | Managed by Sequelize |
| updatedAt | DATE | Managed by Sequelize |

---

# 🔗 API Endpoints

## Register

```
POST /api/auth/register
```

Registers a new user.

### Request Body

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "token": "your_jwt_token"
}
```

---

## Login

```
POST /api/auth/login
```

Authenticates an existing user.

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Success Response

```json
{
  "token": "your_jwt_token"
}
```

---

## Get Current User

```
GET /api/auth/me
```

Returns the authenticated user's profile.

### Headers

```
Authorization: Bearer <JWT_TOKEN>
```

### Success Response

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
Client
   │
   ▼
POST /register
   │
   ▼
Validate Request
   │
   ▼
Hash Password (bcrypt)
   │
   ▼
Store User
   │
   ▼
Generate JWT
   │
   ▼
Return Token
   │
   ▼
───────────────
Authenticated Request
   │
   ▼
Authorization Header
   │
   ▼
Authenticate Middleware
   │
   ▼
Verify JWT
   │
   ▼
Attach req.user
   │
   ▼
Protected Controller
```

---

# 🧩 Middleware

## Logger

Logs every incoming request.

Example

```
[2026-07-27 14:12:18]

GET /api/auth/me
```

---

## Validation Middleware

Responsible for validating incoming requests before reaching controllers.

### Registration Validation

- Full name is required
- Email is required
- Email format is valid
- Password is required
- Password contains at least 6 characters

Returns

```
400 Bad Request
```

Example

```json
{
  "error": "Password must contain at least 6 characters."
}
```

---

### Login Validation

Checks

- Email exists
- Password exists
- Email format

---

## Authentication Middleware

Responsible for protecting private routes.

### Responsibilities

- Read Authorization header
- Verify JWT
- Decode payload
- Attach authenticated user to `req.user`
- Continue request

If authentication fails

```
401 Unauthorized
```

Example

```json
{
  "error": "Unauthorized"
}
```

> **Important:** JWT verification is handled exclusively inside middleware, **never** inside controllers.

---

## Error Handler

Global Express error middleware.

Always returns clean JSON responses.

Example

```json
{
  "error": "Internal Server Error"
}
```

---

# 🔐 Security Rules

This project follows several important security practices.

### Passwords

- Passwords are hashed using **bcrypt**
- Salt Rounds: **10**
- Passwords are never stored in plain text

---

### JWT

- Secret key stored inside `.env`
- Token expiration: **7 days**
- Signed using **jsonwebtoken**

Example

```javascript
expiresIn: "7d"
```

---

### Login Errors

The API always returns the same message when authentication fails.

```text
Email or password is incorrect.
```

This prevents attackers from discovering whether an email exists.

---

### Sensitive Data

The API never returns:

- Password
- Password Hash
- JWT Secret

---

# 📦 Installation

Clone the repository

```bash
git clone https://github.com/yourusername/marhba.git

cd marhba/backend
```

Install dependencies

```bash
npm install
```

---

# ⚙ Environment Variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=marhba_db
DB_USER=postgres
DB_PASSWORD=password

JWT_SECRET=your_super_secret_key

JWT_EXPIRES=7d
```

---

# ▶ Running the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# 🧪 API Testing

You can test the API using:

- Postman
- Thunder Client
- Insomnia

Recommended test scenarios:

- User Registration
- Duplicate Email
- User Login
- Invalid Credentials
- Missing JWT
- Invalid JWT
- Expired JWT
- Protected Route Access

---

# 🚀 Architecture

The backend follows the **MVC (Model–View–Controller)** architecture.

```
Request
    │
    ▼
Route
    │
    ▼
Validation Middleware
    │
    ▼
Authentication Middleware
    │
    ▼
Controller
    │
    ▼
Model (Sequelize)
    │
    ▼
PostgreSQL
```

---

# 📌 Project Rules

- Passwords must always be hashed.
- JWT secret must never be hardcoded.
- Protected routes must use middleware.
- Controllers should only contain business logic.
- Validation must occur before controllers.
- Error handling must be centralized.
- Never expose passwords in API responses.

---

# 📚 Learning Objectives

By completing this project, you will learn how to:

- Build a RESTful authentication API
- Use Express middleware effectively
- Secure passwords using bcrypt
- Generate and verify JWTs
- Protect API routes
- Connect Express to PostgreSQL
- Use Sequelize ORM
- Organize a backend using MVC architecture
- Implement production-level authentication

---

# 👨‍💻 Author

**Megatechapp**

Full Stack Developer

---

# 📄 License

This project is licensed under the **MIT License**.