# 🚀 StuMate - Backend

StuMate Backend is a powerful API to manage student profiles, job applications, and internships. Built with Node.js, Express, and MongoDB, it helps manage user authentication, roles, and more for a student management system. 🌟

## 📦 Installation

### 1. Clone the repository:
```bash
git clone https://github.com/AbhisekhNayek/StuMate/Backend.git
```

### 2. Navigate into the project directory:
```bash
cd StuMate
cd Backend
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Create a `.env` file and add your environment variables:
```bash
PORT=8000
MONGODB_URI= you_mongo_uri
JWT_SECRET=yourSuperSecretKey_123!
```

### 5. Start the server:
```bash
npm start
```

Your backend server will be running on [http://localhost:8000](http://localhost:8000) 🎉

---

## 🧩 API Endpoints

### 🔑 **Authentication**

- **POST** `/api/auth/login`
  - Logs a user in.
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "yourpassword"
    }
    ```

- **POST** `/api/auth/signup`
  - Registers a new user.
  - Request Body:
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "user@example.com",
      "password": "yourpassword",
      "role": "student"
    }
    ```

### 👥 **User Management**

- **GET** `/api/user/detail`
  - Get logged-in user's details.
  
- **GET** `/api/user/all-users`
  - Get all users in the system.

- **POST** `/api/user/upload-photo`
  - Upload a new profile photo.

- **POST** `/api/user/update-profile`
  - Update user profile.

- **POST** `/api/user/change-password`
  - Change user password.

---

## 🛠️ Technologies Used

- **Node.js** 🟢
- **Express.js** 🚀
- **MongoDB** 🐱
- **Mongoose** 📚
- **JWT (JSON Web Tokens)** 🔐

---

## 💻 Development

1. Make changes to the code.
2. Run the server locally using `npm start`.
3. Test endpoints with Postman or Insomnia.
4. For front-end integration, ensure the API endpoints are working correctly before connecting the frontend.

---

## ⚠️ Troubleshooting

- Ensure MongoDB URI and JWT Secret are correctly configured.
- Check if the server is running on the correct port (default is `8000`).
- If you face any issues, feel free to open an issue in the repository!

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. ✨

---

## 🤝 Contributions

Feel free to fork, contribute, and help improve StuMate! ❤️