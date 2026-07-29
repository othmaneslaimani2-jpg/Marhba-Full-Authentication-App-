# 📱 Marhba Mobile App

<div align="center">

![Expo](https://img.shields.io/badge/Expo-SDK_54+-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo Router](https://img.shields.io/badge/Expo_Router-Navigation-000000?style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5A29E4?style=for-the-badge&logo=axios)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-764ABC?style=for-the-badge)
![Secure Store](https://img.shields.io/badge/Expo_Secure_Store-Encrypted-4CAF50?style=for-the-badge)

# 🔐 Marhba Mobile

### Secure Authentication Mobile Application built with Expo Router

*A modern mobile authentication application demonstrating a complete authentication workflow using JWT, Expo Router, Zustand, Axios Interceptors, and Secure Storage.*

</div>

---

# 📖 Overview

**Marhba Mobile** is a minimalist authentication application built with **Expo** and **React Native**.

The objective of the project is not to build a complex application, but to implement a **complete, secure, and production-like authentication flow** between a mobile client and a REST API.

The application allows users to:

- Create an account
- Sign in securely
- Restore previous sessions automatically
- Access protected screens
- Logout securely

Authentication is protected at **two levels**:

- 🔒 Backend with JWT middleware
- 🔒 Frontend with **Expo Router `<Stack.Protected>`**

> **Golden Rule:** Protecting screens on the frontend is **never enough**. API endpoints must also be protected on the backend.

---

# ✨ Features

## Authentication

- ✅ User Registration
- ✅ User Login
- ✅ JWT Authentication
- ✅ Automatic Login
- ✅ Persistent Sessions
- ✅ Secure Logout

---

## Navigation

- ✅ Expo Router
- ✅ Protected Routes
- ✅ Automatic Redirections
- ✅ Authentication Guards
- ✅ Loading Screen during Session Restore

---

## API Communication

- ✅ Axios Instance
- ✅ Axios Request Interceptor
- ✅ Automatic Authorization Header
- ✅ Centralized API Configuration

---

## State Management

- ✅ Zustand Store
- ✅ Global Authentication State
- ✅ User Information
- ✅ Loading State
- ✅ Token Management

---

## Security

- ✅ expo-secure-store
- ✅ Encrypted JWT Storage
- ✅ No Token in AsyncStorage
- ✅ Protected Screens
- ✅ Protected API Requests

---

# 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Expo | Mobile Framework |
| React Native | Mobile Development |
| Expo Router | Navigation |
| Axios | HTTP Client |
| Zustand | State Management |
| expo-secure-store | Secure Storage |

---

# 📁 Project Structure

```
mobile/
│
├── app/
│   │
│   ├── (auth)/
│   │   ├── login.jsx
│   │   └── register.jsx
│   │
│   ├── (app)/
│   │   └── home.jsx
│   │
│   ├── _layout.jsx
│   └── index.jsx
│
├── components/
│   ├── Button.jsx
│   ├── Input.jsx
│   ├── Loader.jsx
│   └── ErrorMessage.jsx
│
├── services/
│   └── api.js
│
├── store/
│   └── useAuthStore.js
│
├── hooks/
│
├── utils/
│
├── assets/
│
├── package.json
└── README.md
```

---

# 📱 Application Screens

## 🔓 Login

Route

```
/(auth)/login
```

Features

- Email Input
- Password Input
- Login Button
- Validation Errors
- Loading Indicator

Accessible only when the user is **not authenticated**.

---

## 📝 Register

Route

```
/(auth)/register
```

Features

- Full Name
- Email
- Password
- Registration Button
- Error Handling
- Loading State

Accessible only when the user is **not authenticated**.

---

## 🏠 Home

Route

```
/(app)/home
```

Protected Screen.

Displays

```
Marhba, John Doe 👋
```

Data comes from

```
GET /api/auth/me
```

Includes

- User Information
- Logout Button

---

# 🔐 Authentication Flow

```
User Opens App
        │
        ▼
restoreSession()
        │
        ▼
Read JWT from Secure Store
        │
        ▼
GET /api/auth/me
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
Valid JWT     Invalid JWT
 │               │
 ▼               ▼
Home         Login
```

---

# 🔒 Protected Navigation

Expo Router uses **`<Stack.Protected>`** to restrict navigation.

Expected behavior

```
User NOT Logged In

/home

↓

Redirect

/login
```

---

```
User Logged In

/login

↓

Redirect

/home
```

---

```
Login Success

↓

Authentication State Updated

↓

Automatic Redirect

↓

Home
```

---

```
Logout

↓

Authentication State Cleared

↓

Automatic Redirect

↓

Login
```

---

# 🌐 Axios Configuration

A dedicated Axios instance is created inside

```
services/api.js
```

Example responsibilities

- Base URL
- JSON Configuration
- Timeout
- Interceptors

---

## Request Interceptor

Every request automatically includes

```
Authorization: Bearer <JWT>
```

No API request should manually attach the token.

---

# 🧠 Zustand Store

Authentication is managed globally.

```
useAuthStore

│

├── user

├── token

├── isAuthenticated

├── isLoading

│

├── login()

├── register()

├── logout()

└── restoreSession()
```

---

# 🔄 Session Persistence

The authentication token is stored securely using

```
expo-secure-store
```

Application startup

```
Launch App

↓

Read Token

↓

Validate Token

↓

GET /api/auth/me

↓

Update Store

↓

Navigate
```

No login screen should appear while validation is in progress.

---

# 🔐 Security

The mobile application follows modern authentication practices.

## Secure Storage

JWT tokens are stored using

```
expo-secure-store
```

Never

```
AsyncStorage
```

for authentication tokens.

---

## Protected Screens

All authenticated screens are guarded using

```
<Stack.Protected>
```

---

## Protected API Calls

Axios automatically sends

```
Authorization: Bearer <token>
```

for every authenticated request.

---

# 📦 Installation

Clone repository

```bash
git clone https://github.com/yourusername/marhba.git

cd marhba/mobile
```

Install dependencies

```bash
npm install
```

---

# ▶ Run the Application

Start Expo

```bash
npx expo start
```

Android

```bash
npx expo run:android
```

iOS

```bash
npx expo run:ios
```

---

# ⚙ Environment Configuration

Update the API base URL inside

```
services/api.js
```

Example

```javascript
const api = axios.create({
  baseURL: "http://YOUR_LOCAL_IP:5000/api",
});
```

> Replace `YOUR_LOCAL_IP` with the IP address of your backend server when testing on a physical device.

---

# 📚 Dependencies

Main packages

```json
{
  "expo": "...",
  "expo-router": "...",
  "axios": "...",
  "zustand": "...",
  "expo-secure-store": "...",
  "react-native-safe-area-context": "...",
  "react-native-screens": "..."
}
```

---

# 🚀 User Journey

```
Open App
     │
     ▼
Restore Session
     │
     ▼
No Token
     │
     ▼
Register / Login
     │
     ▼
Receive JWT
     │
     ▼
Store Securely
     │
     ▼
Access Home
     │
     ▼
Logout
     │
     ▼
Remove Token
     │
     ▼
Back to Login
```

---

# 🎯 Learning Objectives

By completing this project you will learn how to:

- Build secure mobile authentication flows
- Consume REST APIs using Axios
- Configure Axios Interceptors
- Store JWT securely using Secure Store
- Protect routes using Expo Router
- Manage authentication with Zustand
- Implement session persistence
- Handle loading and error states
- Build production-ready authentication architecture

---

# 🧪 Testing Checklist

Authentication

- ✅ Register
- ✅ Login
- ✅ Logout
- ✅ Restore Session
- ✅ Invalid Credentials
- ✅ Expired Token
- ✅ Missing Token

Navigation

- ✅ Redirect to Login
- ✅ Redirect to Home
- ✅ Protected Routes
- ✅ Session Persistence

UI

- ✅ Loading Spinner
- ✅ Disabled Buttons During Requests
- ✅ Error Messages Under Forms
- ✅ No Flash Screen During Startup

---

# 💡 Best Practices

- Never store JWT tokens inside **AsyncStorage**.
- Always use **expo-secure-store** for sensitive data.
- Never manually attach the Authorization header.
- Keep authentication logic inside a global Zustand store.
- Display API errors inside forms instead of using alerts.
- Disable submit buttons while requests are pending.
- Protect every private screen using **`<Stack.Protected>`**.

---

# 🚀 Future Improvements

- Dark Mode
- Password Reset
- Email Verification
- Remember Me
- Refresh Tokens
- Biometric Authentication
- Offline Support
- Profile Editing
- Push Notifications
- Unit & Integration Tests

---

# 👨‍💻 Author

**Megatechapp**

**Full Stack Developer**

- 📱 React Native
- ⚛️ Expo
- 🟢 Node.js
- 🚀 Express
- 🐘 PostgreSQL

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

## ⭐ If you found this project useful, consider giving it a star!

Built with ❤️ using **Expo**, **React Native**, **Axios**, **Zustand**, and **Expo Secure Store**.

</div>