# 🏨 HotelPro - Modern Hotel Management & Reservation System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-black.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-brightgreen.svg)](https://www.mongodb.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple.svg)](https://getbootstrap.com/)

---

## 🔗 Project Links for Mentor Evaluation

> **📌 Instructions for Mentor Submission:**  
> Update the placeholders below with your personal GitHub repository URL and your deployed Live Demo URL before submitting to your mentor.

| Resource | Link | Description |
| :--- | :--- | :--- |
| **🌐 Live Demo Link** | `https://<your-username>.github.io/hotelpro/` *(or Vercel / Netlify URL)* | Fully interactive live application accessible in any browser |
| **🐙 GitHub Repository** | `https://github.com/<your-username>/hotelpro` | Full-stack source code, documentation, and commit history |
| **⚡ Standalone Instant Preview** | Double-click `demo.html` or `index.html` in this repo | Zero-dependency local preview without requiring any terminal commands |

---

## 📖 Project Overview

**HotelPro** is a comprehensive, production-grade hotel management and reservation solution tailored for the hospitality industry. It streamlines end-to-end hotel operations with a robust backend architecture, intuitive luxury user interface, real-time availability tracking, dynamic pricing, seamless booking flows, secure guest check-in/check-out workflows, and staff management dashboards.

Whether deployed for a boutique retreat or an international hospitality resort, HotelPro delivers operational efficiency, transparency, and data privacy.

---

## 📊 Project Epics & Tasks Breakdown (6 Epics, 19 Tasks)

| Epic | Included Tasks | Scope & Technical Implementation |
| :--- | :--- | :--- |
| **Epic 1: System Architecture & Core Setup** | Tasks 1–3 | Monorepo structure, Express.js server initialization, MongoDB Mongoose ODM connection, CORS policies, environment configuration, and centralized error handling middleware. |
| **Epic 2: Authentication & Role Authorization (RBAC)** | Tasks 4–6 | User model with salted `bcrypt` password hashing, JSON Web Token (JWT) issuance & verification, Auth Context provider in React, and role separation (Guest vs Admin/Staff). |
| **Epic 3: Suite Inventory & Catalog Engine** | Tasks 7–10 | Room schema (pricing, capacities, amenities, status, images), REST CRUD endpoints, dynamic search & multi-parameter filtering (by room category, price range, guest count, keyword), and responsive card grid. |
| **Epic 4: Booking & Reservation Engine** | Tasks 11–13 | Booking model, date range calculation, tax & night subtotal computation, availability collision prevention, and checkout modal with simulated 256-bit card validation. |
| **Epic 5: Check-in/Check-out & Digital Vouchers** | Tasks 14–16 | Operational workflows for Front Desk (Online Check-in, Express Check-out, Cancellation), unique confirmation code generation (`HP-XXXXXX`), and printable reservation voucher with QR verification. |
| **Epic 6: Management Console, Analytics & Seeding** | Tasks 17–19 | Admin Operations Dashboard with real-time occupancy KPI metrics, gross revenue tracking, room status editor, and automated database seed script with luxury suites and sample bookings. |

---

## 🛠️ Technology Stack & Skills

- **Frontend**: React (JSX, Hooks, Context API), Bootstrap 5.3, Bootstrap Icons, HTML5, Modern CSS3.
- **Backend**: Node.js, Express.js RESTful API, Asynchronous JavaScript (Async/Await, Promises).
- **Database**: MongoDB & Mongoose ODM.
- **Security & Auth**: JSON Web Tokens (JWT), Bcrypt password encryption, CORS protection.
- **Architecture**: Modular Monorepo (`client/`, `server/`, `demo.html`).

---

## 📁 Repository Directory Structure

```
hotelpro/
├── demo.html               # ⚡ Standalone zero-dependency interactive demo
├── index.html              # 🌐 Direct deploy entry for GitHub Pages / Netlify
├── package.json            # Root workspace scripts & dependencies
├── README.md               # Complete project documentation & guide
├── server/                 # Express.js & MongoDB Backend
│   ├── .env                # Server environment variables
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Express application entrypoint
│   ├── config/
│   │   └── db.js           # Mongoose MongoDB connection
│   ├── models/
│   │   ├── User.js         # User schema with bcrypt & role support
│   │   ├── Room.js         # Suite schema (amenities, status, pricing)
│   │   └── Booking.js      # Reservation schema & transaction references
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT authentication & role-based access
│   │   └── errorHandler.js   # Centralized error handler
│   ├── controllers/
│   │   ├── authController.js # Register, login & profile logic
│   │   ├── roomController.js # Rooms CRUD & query filters
│   │   └── bookingController.js # Reservation transactions & KPI analytics
│   ├── routes/
│   │   ├── authRoutes.js   # /api/auth routes
│   │   ├── roomRoutes.js   # /api/rooms routes
│   │   └── bookingRoutes.js # /api/bookings routes
│   └── seed/
│       └── seedData.js     # Database seeder with sample suites & bookings
└── client/                 # React.js Frontend
    ├── package.json        # Frontend dependencies (React 18, Bootstrap)
    ├── public/
    │   └── index.html      # HTML template with luxury styling fonts
    └── src/
        ├── index.js        # React DOM mount point
        ├── App.js          # Main app logic, tabs & modal controllers
        ├── App.css         # Custom luxury theme styles & responsive design
        ├── api.js          # API client with automatic offline mock fallback
        ├── context/
        │   └── AuthContext.js # Auth & role switcher provider
        └── components/
            ├── Navbar.js         # Navigation header & quick role toggle
            ├── Hero.js           # Hero banner & call-to-actions
            ├── RoomFilters.js    # Search bar & multi-category filter
            ├── RoomCard.js       # Suite card with pricing & amenity badges
            ├── BookingModal.js   # Reservation dialog with price breakdown
            ├── InvoiceModal.js   # Printable voucher & confirmation receipt
            ├── MyBookings.js     # Guest reservation tracking & check-in
            ├── AdminDashboard.js # Staff KPI dashboard & inventory editor
            └── Footer.js         # Footer with contact & quick links
```

---

## 🚀 How to Run the Project Locally

### Option 1: Instant Browser Preview (Zero Installation)
1. Double-click `demo.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox).
2. All interactive features (room filtering, booking engine, payment simulation, printable receipts, guest check-in/out, and staff console) work immediately with local browser storage persistence!

---

### Option 2: Full-Stack MERN Execution (Node.js & MongoDB)

#### Prerequisites:
- **Node.js (v18+)**: [Download Node.js](https://nodejs.org/)
- **MongoDB**: Local MongoDB Community Server [Download MongoDB](https://www.mongodb.com/try/download/community) or MongoDB Atlas URI.

#### Step 1: Install Dependencies
Open terminal in the `hotelpro` directory:
```bash
npm run install-all
```

#### Step 2: Seed the Database
Populate the database with luxury suites, initial reservations, and admin accounts:
```bash
npm run seed
```

*Default Demo Credentials created:*
- **Guest Account**: `guest@hotelpro.com` / `guest123`
- **Admin / Staff Account**: `admin@hotelpro.com` / `admin123`

#### Step 3: Start the Backend Server
```bash
npm run server
```
The server will run on `http://localhost:5000` (Health Check: `http://localhost:5000/api/health`).

#### Step 4: Start the React Frontend
In a new terminal window:
```bash
npm run client
```
The React frontend will launch on `http://localhost:3000`.

---

## 🌐 How to Publish to GitHub & Create Live Demo Link

Follow these quick steps to push your project to GitHub and deploy a live link for your mentor:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/) and click **New Repository**.
2. Name it `hotelpro` (or `hotel-management-system`).
3. Set visibility to **Public** and click **Create repository**.

### Step 2: Push the Code
In your project folder, open terminal and run:
```bash
git init
git add .
git commit -m "feat: complete HotelPro hotel management system (6 epics, 19 tasks)"
git branch -M main
git remote add origin https://github.com/<your-username>/hotelpro.git
git push -u origin main
```

*(Alternatively, you can drag and drop all project files directly onto GitHub via "Upload files".)*

### Step 3: Deploy Free Live Demo in 1 Minute (GitHub Pages)
1. Go to your GitHub repository -> **Settings** -> **Pages**.
2. Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
3. Click **Save**.
4. In about 60 seconds, GitHub will generate your live URL:  
   👉 `https://<your-username>.github.io/hotelpro/`

*(Alternatively, you can drag this folder directly to [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com/) for instant zero-config hosting).*

---

## 🧪 Mentor Evaluation Checklist

- [x] **Epic 1**: Monorepo structure, Express API, MongoDB connection, CORS, error handling.
- [x] **Epic 2**: JWT authentication, bcrypt encryption, React AuthContext, Guest & Admin role toggle.
- [x] **Epic 3**: Room inventory with images, prices, amenities, and real-time multi-filter queries.
- [x] **Epic 4**: Date calculation, night & tax computation, booking modal with simulated card processing.
- [x] **Epic 6**: Front desk status updates (Check-in, Check-out, Cancel), voucher generation with QR code.
- [x] **Epic 6**: Manager operations console with occupancy %, gross revenue, and suite registration.

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
