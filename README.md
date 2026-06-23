# 🍕 Foodies App - Full-Stack Zomato Clone

A modern, full-stack food delivery web application built using **React (Vite)**, **Node.js (Express)**, **MongoDB**, and styled with the cutting-edge **Tailwind CSS v4**. This application simulates a food ordering platform like Zomato, featuring category browsing, a shopping cart system, user authentication, checkout capabilities, order history tracking, and an admin dashboard.

---

## 🚀 Live Demo & Deployment

- **Hosting & Backend Integration**: Configured for quick and seamless deployment on **Vercel** with customized rewrite rules and monorepo configurations.
- **CI/CD Pipeline**: Integrates a **GitHub Actions workflow** (`.github/workflows/deploy.yml`) to automatically build and deploy the React frontend static site to **GitHub Pages** upon pushing to the `main` branch.

---

## 🛠️ Features

### Frontend (React + Vite)
- **Interactive Home Page**: Clean, modern UI displaying a categorized menu, customizable food tags ("Must Try", "Bestseller", "Healthy", "New"), and search capabilities.
- **Search Component**: Dedicated page to search for dishes instantaneously using client-side filtering.
- **Cart System**: High-performance cart management utilizing React Context API (`CartContext`) for instant state updates, allowing quantity adjustments, and calculation of total checkout prices.
- **Authentication**: Modern custom login and registration interfaces validating credentials and storing access tokens safely in `localStorage`.
- **Checkout Flow**: Complete shipping information form capturing delivery address, city, pin code, and contact information before submitting orders.
- **Order History**: History dashboard showing past orders, total amounts, date ordered, order status (e.g., Pending, Out for Delivery, Delivered), and specific ordered items.
- **Admin Dashboard**: Specialized user management interface displaying all registered users in chronological order.

### Backend (Node.js + Express + Mongoose)
- **Secure JWT Authentication**: Sign up and login routes utilizing password hashing via `bcryptjs` and stateless session tracking with `jsonwebtoken`.
- **Order Management APIs**:
  - `POST /api/orders`: Securely creates a new order in MongoDB.
  - `GET /api/orders/myorders`: Fetches all previous orders associated with the authenticated user.
- **User Directory API**:
  - `GET /api/auth/users`: Retrieves all registered users in descending order of registration. Restricted to admin permissions.
- **Robust Middleware**: Includes CORS configuration, route protection middleware (`protect` / `admin`) decoding JWTs and attaching matching User objects.

---

## 📁 Repository Structure

```text
foodie-app/
├── backend/                  # Node.js + Express Backend Service
│   ├── config/               # Database connection configurations (Mongoose)
│   ├── controllers/          # Request handlers (authController, orderController)
│   ├── middleware/           # JWT verification & admin route protection
│   ├── models/               # MongoDB models (User.js, Order.js)
│   ├── routes/               # API endpoint definitions (authRoutes, orderRoutes)
│   ├── server.js             # Main server entry file
│   ├── package.json          # Backend dependencies & script definitions
│   └── .env                  # Port, DB connection URI, and JWT Secret details
│
├── zomato-clone/             # React + Vite + Tailwind CSS v4 Frontend App
│   ├── public/               # Static assets folder
│   ├── src/                  # React application files
│   │   ├── assets/           # General CSS and fonts
│   │   ├── context/          # State management (CartContext.jsx)
│   │   ├── data/             # Static restaurant menu items database
│   │   ├── Image/            # Locally saved visual assets
│   │   ├── Pages/            # Route pages (Home, Menu, Admin, Checkout, etc.)
│   │   ├── App.jsx           # Main routing & state provider initialization
│   │   └── main.jsx          # DOM rendering entry point
│   ├── package.json          # Frontend build dependencies
│   ├── vite.config.js        # Vite compilation configuration
│   └── vercel.json           # Frontend single-page app fallback rewrite rule
│
├── vercel.json               # Root monorepo Vercel build configuration
└── package.json              # Root dependencies file
```

---

## 🏗️ Getting Started

Follow these steps to run the application locally on your computer.

### Prerequisites
- Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).
- Have [MongoDB](https://www.mongodb.com/) running locally or have a connection string for a cloud-hosted [MongoDB Atlas](https://www.mongodb.com/atlas) database.

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/vijaychelumalla/foodie-app.git
cd foodie-app
```

### Step 2: Setup and Run the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root of the `backend/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/zomatoclone
   JWT_SECRET=your_super_secret_jwt_key
   ```
4. Start the Express server:
   ```bash
   npm start
   ```
   The backend should log: `Server running on port 5000` & `MongoDB Connected: <host_name>`.

---

### Step 3: Setup and Run the Frontend

1. Open a new terminal window/tab and navigate to the frontend directory:
   ```bash
   cd zomato-clone
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Click on the URL output in your terminal (usually `http://localhost:5173`) to view and interact with the application.

---

## 🔌 API Reference

### Authentication Endpoints
- **Signup User**: `POST /api/auth/signup`
  - Body: `{ "fullName": "John Doe", "email": "john@example.com", "phone": "1234567890", "password": "securepassword" }`
- **Login User**: `POST /api/auth/login`
  - Body: `{ "email": "john@example.com", "password": "securepassword" }`
- **Get Current User Info**: `GET /api/auth/me` (Protected - JWT Token required in Header)
- **Get All Users (Admin)**: `GET /api/auth/users` (Protected & Admin Only)

### Order Endpoints
- **Create Order**: `POST /api/orders` (Protected - JWT Token required in Header)
  - Body: Includes `deliveryInfo`, array of `orderItems`, and `totalAmount`.
- **Get Logged-in User Orders**: `GET /api/orders/myorders` (Protected - JWT Token required in Header)

---

## 🎨 Tech Stack Breakdown

- **Frontend**:
  - React 19
  - React Router DOM v7 (Routing)
  - Tailwind CSS v4 + `@tailwindcss/vite` (Next-gen CSS framework integration)
  - Axios (API requests integration)
- **Backend**:
  - Express.js (Modular router controllers)
  - Mongoose (ORM wrapper for MongoDB database structures)
  - JSON Web Tokens (JWT) (State-independent, signed authentication)
  - Bcrypt.js (One-way hash function for passwords)
- **Deployment**:
  - Vercel (Production cloud deployment configuration)
  - GitHub Actions (CI/CD pipeline workflow to automate GitHub Pages)

