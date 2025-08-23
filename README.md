# 🎬 The Movie Shelf "TMS"

A full-stack web application for browsing and saving movies using the
**TMDB API**.\
Built with **React (frontend)** and **Node.js + Express + MongoDB
(backend)**.

------------------------------------------------------------------------

## 🚀 Features

### 🔹 Frontend (React)

-   User authentication (Login / Signup).\
-   Search movies using **TMDB API**.\
-   View movie details (poster, title, release date, description).\
-   Save favorite movies into personal lists.\
-   Responsive UI with simple girly design 🎀.

### 🔹 Backend (Node.js + Express + MongoDB)

-   RESTful API with routes for **auth**, **movies**, **lists**, and
    **comments**.\
-   JWT authentication for protected routes.\
-   CRUD operations for user-created movie lists.\
-   Secure password hashing with bcrypt.

------------------------------------------------------------------------

## 🛠️ Technologies

-   **Frontend:** React, React Router, Axios, CSS\
-   **Backend:** Node.js, Express, MongoDB, Mongoose\
-   **Authentication:** JWT, bcrypt\
-   **External API:** [TMDB API](https://developer.themoviedb.org/)

------------------------------------------------------------------------

## ⚙️ Installation

1.  **Clone the repo**

    ``` bash
    git clone <your-repo-link>
    cd movie-tracker
    ```

2.  **Backend setup**

    ``` bash
    cd backend
    npm install
    npm run dev
    ```

3.  **Frontend setup**

    ``` bash
    cd frontend
    npm install
    npm run dev
    ```

4.  Create a `.env` file in **backend** with:

        MONGO_URI=your_mongodb_connection
        JWT_SECRET=your_secret_key
        TMDB_API_KEY=your_tmdb_key

------------------------------------------------------------------------

## 👩‍💻 Authors

-   Maryam ✨\
-   Zahra 🌸

------------------------------------------------------------------------

## 📌 Notes

-   This project is for learning purposes.\
-   TMDB API provides movie data (posters, descriptions, ratings).
