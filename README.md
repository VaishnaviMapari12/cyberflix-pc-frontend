# React + Vite

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
Product image paths may be public frontend paths such as `/images.jpeg`, absolute image URLs, or backend upload paths such as `/uploads/product.jpg`. Place backend-hosted images in `backend/uploads`.
