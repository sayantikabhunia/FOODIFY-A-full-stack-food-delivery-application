# Foodify – Food Delivery App

Foodify is a full-stack food ordering system built using the MERN stack (MongoDB, Express, React, Node.js) with Stripe integration for online payments. It supports both customer-facing features and an admin dashboard to manage food listings and orders.

---

## ✨ Features

### 👤 User
- User registration & JWT-based authentication
- Browse food items
- Add to cart & real-time cart total
- Place orders with:
  - Cash on Delivery
  - Online Payment via Stripe
- Order confirmation with address & payment info

### 🛠️ Admin
- Add/Edit/Delete food items
- Manage uploaded food images (via multer)
- Access order database
- Protected admin routes with JWT auth

---

## 💻 Tech Stack

| Tech        | Purpose                          |
|-------------|----------------------------------|
| React       | Frontend UI                      |
| Node.js     | Backend server                   |
| Express     | API routing                      |
| MongoDB     | NoSQL database                   |
| Mongoose    | MongoDB ORM                      |
| Stripe      | Secure online payments           |
| Multer      | File uploads (images)            |
| JWT         | Token-based authentication       |
| dotenv      | Env variable management          |
| Nodemon     | Auto server restart on changes   |

---

## 📂 Folder Structure
foodify/
├── backend/
│ ├── config/ # MongoDB connection setup
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── uploads/ # Uploaded food images
│ └── server.js # Entry point
├── frontend/
│ ├── pages/ # React pages (Home, Cart, Admin, etc.)
│ ├── components/ # Reusable UI components
│ └── App.jsx # Main app setup
└── README.md # Project documentation


---

## 🔧 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/YOUR_USERNAME/foodify.git
cd foodify

### Backend Setup

```bash
cd backend
npm install
# Create a .env file with the following:
# MONGO_URI=<your_mongo_connection>
# JWT_SECRET=your_secret_key
# STRIPE_SECRET_KEY=your_stripe_key
npm run dev

###Create a .env file inside /backend and add:

```bash
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myfoodapp?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_your_stripe_key

###Replace <username>, <password>, and keys accordingly.


