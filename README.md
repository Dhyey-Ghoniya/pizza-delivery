# 🍕 PizzaCraft — Pizza Delivery Application

A full-stack pizza delivery application built with React, Node.js, Express, and MongoDB.

## Features

- **User Auth**: Register, login, email verification, forgot/reset password
- **Pizza Builder**: Multi-step wizard to customize your pizza (base, sauce, cheese, veggies)
- **Razorpay Payment**: Integrated test mode checkout
- **Order Tracking**: Real-time status updates (Order Placed → Received → Kitchen → Delivery → Delivered)
- **Admin Dashboard**: Overview stats, inventory management, order management
- **Stock Alerts**: Automatic email notifications when stock falls below threshold

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, React Router v7 |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Email | Nodemailer (Ethereal dev / Gmail) |
| Payment | Razorpay (Test Mode) |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1. Setup Server
```bash
cd server
npm install
# Edit .env with your config (MongoDB URI, Razorpay keys, etc.)
npm run dev
```

### 2. Setup Client
```bash
cd client
npm install
npm run dev
```

### 3. Default Admin Account
- Email: `admin@pizza.com`
- Password: `Admin@123`

### Environment Variables (server/.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pizza-delivery
JWT_SECRET=your-secret-key
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
ADMIN_EMAIL=admin@pizza.com
CLIENT_URL=http://localhost:5173
STOCK_THRESHOLD=20
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password/:token` - Reset password

### Pizza
- `GET /api/pizza/bases|sauces|cheeses|veggies|meats` - Get options

### Orders
- `GET /api/orders/my-orders` - User's orders
- `GET /api/orders` - All orders (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify & place order

### Inventory (Admin)
- `GET|POST /api/inventory` - List/Add
- `PUT|DELETE /api/inventory/:id` - Update/Delete
