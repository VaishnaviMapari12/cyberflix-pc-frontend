<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


# Cyberflix PC

## Run the app

Install dependencies, configure the backend environment, then start both servers:

```sh
npm install
npm --prefix backend install
npm run dev:full
```

The web app runs at `http://localhost:5173` and proxies `/api` and `/uploads` requests to the backend at `http://localhost:5000`. Set `VITE_API_URL` in a frontend `.env` file when the API is hosted elsewhere; for example, `VITE_API_URL=https://api.example.com/api`.

## Backend database

Create `backend/.env` with the connection details for your MySQL database. The backend reads these values directly; use real credentials for your local or hosted database and do not commit this file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=cyberflix
DB_PORT=3306
```

Before starting a deployment with the updated checkout, add the order delivery columns:

```sh
npm --prefix backend run migrate:delivery
```

Add categories and products to the database for the catalog to display. The API health check is available at `http://localhost:5000/`.
Product image paths may be public frontend paths such as `/images.jpeg`, absolute image URLs, or backend upload paths such as `/uploads/product.jpg`. Place backend-hosted images in `backend/uploads`. -->





# Cyberflix PC

A modern PC Components e-commerce and PC Builder application built with **React, Vite, Node.js, Express.js, and MySQL**.

## Features

* PC Components catalog
* Product search and filtering
* Product details
* Shopping cart
* Wishlist
* User authentication
* PC Builder
* Component compatibility
* Build configuration
* Order management
* Responsive UI
* REST API backend

## Tech Stack

### Frontend

* React
* Vite
* React Router
* JavaScript
* CSS / Bootstrap

### Backend

* Node.js
* Express.js
* MySQL
* REST APIs

### Database

* MySQL

---

## Run the App Locally

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install backend dependencies

```bash
npm --prefix backend install
```

### 3. Configure Backend

Create:

```text
backend/.env
```

Add your local MySQL configuration:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=cyberflix_pc
DB_PORT=3306
```

> Do not commit `backend/.env` to GitHub.

### 4. Start Frontend and Backend

```bash
npm run dev:full
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:5000
```

The Vite development server proxies `/api` and `/uploads` requests to the local backend.

---

## Production API Configuration

When the backend is hosted on a public server, create a frontend `.env` file:

```env
VITE_API_URL=https://cyberflix-pc-2.onrender.com/api
```

The production frontend uses the deployed Render backend API.

Backend health check:

```text
https://cyberflix-pc-2.onrender.com/
```

---

## Database Migration

Before deployment, run the required database migration:

```bash
npm --prefix backend run migrate:delivery
```

Make sure the required categories and products are available in the MySQL database.

---

## Product Images

Product images can use:

* Public frontend paths
* Absolute image URLs
* Backend upload paths

Example:

```text
/images.jpeg
```

or:

```text
/uploads/product.jpg
```

Backend-hosted images should be placed inside:

```text
backend/uploads
```

---

## Backend API

Production backend:

```text
https://cyberflix-pc-2.onrender.com
```

Example API:

```text
https://cyberflix-pc-2.onrender.com/api/products
```

---

## Deployment

### Frontend

The frontend can be deployed using **Vercel**.

Set the following environment variable:

```env
VITE_API_URL=https://cyberflix-pc-2.onrender.com/api
```

### Backend

The backend can be deployed using **Render**.

Recommended settings:

```text
Repository: VaishnaviMapari12/cyberflix-pc
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Configure the required MySQL environment variables in Render.

---

## Project Structure

```text
cyberflix-pc/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── public/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── scripts/
│   ├── uploads/
│   └── index.js
│
├── .env
├── package.json
├── vite.config.js
└── README.md
```

## Live Application

Frontend:

```text
https://cyberflix-pc-frontend.vercel.app/
```

Backend:

```text
https://cyberflix-pc-2.onrender.com/
```

## Author

**Vaishnavi Mapari**

GitHub:
https://github.com/VaishnaviMapari12
