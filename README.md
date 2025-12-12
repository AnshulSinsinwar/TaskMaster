# TaskMaster - Scalable Web App

A modern, full-stack Task Management application built with the MERN stack (MongoDB, Express, React, Node.js). Features secure authentication, a responsive UI with TailwindCSS, and a scalable folder structure.

## 🚀 Features

-   **Authentication**: Secure Signup and Login using JWT and bcrypt.
-   **Dashboard**: Manage your tasks (Create, Read, Update, Delete).
-   **Architecture**: Scalable architecture with separated Client and Server.
-   **Database**: Connected to MongoDB Atlas for cloud persistence.
-   **UI/UX**: Professional design using TailwindCSS with responsive forms and glass-morphism effects.

## 🛠️ Tech Stack

-   **Frontend**: React (Vite), TailwindCSS, React Hook Form, React Hot Toast, Lucide React.
-   **Backend**: Node.js, Express.js.
-   **Database**: MongoDB Atlas and Mongoose.
-   **Security**: JWT for tokens, bcryptjs for password hashing.

## 📦 Installation & Setup

### Prerequisites
-   Node.js installed.
-   A MongoDB Atlas Connection String.

### 1. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` folder (or use the existing one) with:
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_super_secret_key
    ```
4.  Start the server:
    ```bash
    npm start
    ```
    *Server will run on http://localhost:5000*

### 2. Frontend Setup
1.  Navigate to the client directory (in a new terminal):
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    *App will run on http://localhost:5173*

## 📝 API Endpoints

### Auth
-   `POST /api/auth/register` - Create a new account
-   `POST /api/auth/login` - Login and receive a token

### Tasks (Protected)
-   `GET /api/tasks` - Get all user tasks
-   `POST /api/tasks` - Create a new task
-   `PUT /api/tasks/:id` - Update a task
-   `DELETE /api/tasks/:id` - Delete a task

---
*Assignment Submission*
