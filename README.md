# 🎓 **StuMate - Placement Management System** 🚀  

## 📌 Table of Contents  
- [📖 Introduction](#-introduction)  
- [✨ Features](#-features)  
- [🛠️ Tech Stack](#-tech-stack)  
- [📁 Project Structure](#-project-structure)  
- [👥 User Roles](#-user-roles)  
- [⚙️ Installation](#-installation)  
  - [🔹 Prerequisites](#-prerequisites)  
  - [📂 Clone the Repository](#-clone-the-repository)  
  - [🔧 Backend Setup](#-backend-setup)  
  - [🎨 Frontend Setup](#-frontend-setup)  
- [📜 License](#-license)  

---

## 📖 Introduction  
🎓 **StuMate** is a **Placement Management System** designed to streamline the placement process at educational institutions. It ensures smooth coordination between students, TPO (Training and Placement Officer) admins, management admins, and super admins. **Empower students, simplify management, and enhance placements!** 🚀💼  

---

## ✨ Features  
### 🧑‍🎓 **Student Portal**  
✅ Explore job opportunities 🔍  
✅ Apply for placements 📄  
✅ Track application status 📊  

### 🏢 **TPO Admin Portal**  
✅ Manage job postings 📝  
✅ Schedule interviews 📅  
✅ Track student progress 📈  

### 📊 **Management Admin Portal**  
✅ Oversee the placement process 🏛️  
✅ Generate reports 📑  
✅ Analyze placement data 📉  

### 🔐 **Super Admin Portal**  
✅ Manage system settings ⚙️  
✅ Handle user accounts 👥  
✅ Oversee admins and ensure smooth operations 🔍  

---

## 🛠️ Tech Stack  
| 🔹 Technology | 🔹 Stack Used |
|--------------|-------------|
| 🌐 **Frontend** | Vite + React.js, Tailwind CSS, Bootstrap 🎨⚛️ |
| 🖥️ **Backend** | Node.js, Express.js ⚙️ |
| 🗄️ **Database** | MongoDB 💾 |
| 🔑 **Authentication** | JSON Web Tokens (JWT) 🔐 |
| 💅 **Styling** | Tailwind CSS, Bootstrap 🎨 |

---

## 📁 Project Structure  
```plaintext
📦 StuMate-Placement-Management-System
├── 🖥️ frontend
│   ├── 🌍 public
│   ├── 📂 src
│   │   ├── 🔗 api
│   │   ├── 🎨 assets
│   │   ├── 🏗️ components
│   │   │   ├── 🏠 LandingPages
│   │   │   └── 🎓 students
│   │   ├── ⚙️ config
│   │   ├── 🌐 context
│   │   ├── 🔄 hooks
│   │   ├── 📜 pages
│   │   ├── 💄 styles
│   │   ├── 🛠️ utility
│   │   ├── 🚀 App.jsx
│   │   └── 🔗 main.jsx
│   ├── 📜 .gitignore
│   ├── 📜 .eslint.config.js
│   ├── 📜 index.html
│   ├── 📜 package-lock.json
│   ├── 📜 package.json
│   ├── 📜 postcss.config.js
│   ├── 📜 tailwind.config.js
│   └── 📜 vite.config.js
├── 🔙 backend
│   ├── ⚙️ config
│   ├── 🏗️ controllers
│   ├── 🛡️ middleware
│   ├── 📄 models
│   ├── 🌍 public
│   │   ├── 📜 offerLetter
│   │   ├── 📜 resumes
│   │   ├── 🖼️ profileImgs
│   │   │   └── 🏞️ default
│   ├── 🛤️ routes
│   ├── 📜 .env (⚠️ NOTE: YOU NEED TO CREATE THIS FILE)
│   ├── 📜 .gitignore
│   ├── 🚀 index.js
│   ├── 📜 package.json
│   └── 📜 package-lock.json
└── 📜 README.md
```

---

## 👥 User Roles  
👨‍🎓 **Students**  
- 🔎 View and apply for job opportunities  
- 📝 Update their profiles  
- 📊 Track application status  

🧑‍💼 **TPO Admin**  
- 📌 Manage job postings  
- 🗓️ Handle student applications  
- 📋 Schedule interviews  

🏛️ **Management Admin**  
- 📑 Oversee the placement process  
- 📈 Generate reports  
- 🔍 Analyze placement data  

🛠️ **Super Admin**  
- ⚙️ Manage system settings  
- 👥 Handle user accounts  
- 🔒 Oversee the entire system  

---

## ⚙️ Installation  

### 🔹 Prerequisites  
✅ Install **Node.js** and **npm**  
✅ Install and run **MongoDB**  

### 📂 Clone the Repository  
```bash
git clone https://github.com/AbhisekhNayek/Stumate-Placement-Management-System.git
cd Stumate-Placement-Management-System
```

---

### 🔧 Backend Setup  
1️⃣ Navigate to the `Backend` folder:  
   ```bash
   cd Backend
   ```  
2️⃣ Install the necessary packages:  
   ```bash
   npm install
   ```  
3️⃣ Create a `.env` file and add:  
   ```env
   PORT=your_port_no
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4️⃣ Start the backend server:  
   ```bash
   npm start
   ```  

---

### 🎨 Frontend Setup  
1️⃣ Navigate to the `Frontend` folder:  
   ```bash
   cd Frontend
   ```  
2️⃣ Install the necessary packages:  
   ```bash
   npm install
   ```  
3️⃣ Create a `.env` file in the `frontend` directory and add:  
   ```env
   BACKEND_API_URL=your_api_url
   VITE_BASE_URL=your_frontend_url
   ```
4️⃣ Start the frontend development server:  
   ```bash
   npm run dev
   ```  

---

## 📜 License  
📌 This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details. 📄  

🚀 **Enjoy building with StuMate and simplify placement management!** 🎓💼  