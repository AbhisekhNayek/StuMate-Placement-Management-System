# 🎓 **StuMate - Placement Management System** 🚀

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Installation](#installation)

## Introduction
**StuMate** is a **Placement Management System** designed to simplify the placement process at educational institutions. It offers distinct roles for students, TPO (Training and Placement Officer) admin, management admin, and super admin, ensuring an efficient and seamless placement experience. 🎓💼

## Features
- **Student Portal**: Students can explore available job opportunities, apply for placements, and monitor their application status. 🧑‍🎓📈
- **TPO Admin Portal**: TPO admins can manage job postings, schedule interviews, and track student progress. 🧑‍💼📋
- **Management Admin Portal**: Management admins can oversee the entire placement process, view reports, and analyze placement data. 📊📅
- **Super Admin Portal**: The super admin has the ability to manage system settings, user accounts, and oversee TPO and management admins. 🔧🔐

## Tech Stack
- **Frontend**: Vite + React.js, Tailwind CSS, Bootstrap 🎨⚛️
- **Backend**: Node.js, Express.js 🖥️
- **Database**: MongoDB 🗄️
- **Authentication**: JSON Web Tokens (JWT) 🔑
- **Styling**: Tailwind CSS, Bootstrap 💅

## Project Structure
```plaintext
├── frontend
│   ├── public
│   ├── src
|   |   ├── api
|   |   ├── assets
│   │   ├── components
│   │   |   ├──LandingPages
│   │   |   └──students
│   │   ├── config
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   ├── styles
│   │   ├── utility
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── .eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── public
│   │   └──  offerLetter
│   │   └──  resumes
│   │   └──  profileImgs
│   │         └── default
│   ├── routes
│   ├── .env (NOTE: YOU NEED TO CREATE THIS FILE)
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
└── README.md
```

## User Roles
- **Students**: Students can view and apply for job opportunities, update their profiles, and track their application status. 🧑‍🎓💼
- **TPO Admin**: TPO admins manage job postings, student applications, and interview schedules. 👔📝
- **Management Admin**: Management admins oversee the placement process, generate reports, and analyze placement data. 📊🖥️
- **Super Admin**: The super admin manages the overall system, including user accounts and system settings. 🔧🔒

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running

### Clone the Repository
```bash
git clone https://github.com/moinmn/stumate-placement-management-system.git
cd stumate-placement-management-system
```

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 📜
```

This README uses emojis to make it more engaging and readable, and it organizes information to make it easy to follow for developers setting up the project.