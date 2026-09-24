# ShopSphere

ShopSphere is a full-stack e-commerce and support platform built for multiple user roles. It combines product catalog browsing, order management, seller/admin dashboards, delivery operations, and live support ticket chat in one application.

The app is split into two main parts:

- Backend: Node.js + Express + MongoDB
- Frontend: React + Vite

It follows a modern full-stack architecture where the frontend communicates with the backend through REST APIs and the backend uses real-time Socket.IO for chat support.

---

## Project overview

This project is designed to simulate a marketplace where different people can do different jobs:

- Customers can browse products, add them to cart, place orders, and open support tickets.
- Sellers can add or update products and track their sales.
- Admins can manage products, orders, and users.
- Delivery agents can update order status and delivery progress.
- Support agents can respond to customer tickets in real time.

The goal is to provide a working multi-role commerce platform with a reusable backend, role-based access control, and a clean React frontend.

---

## Features

### Customer features
- Browse the store catalog
- Search and filter products
- Add products to cart
- Checkout and place orders
- View personal order history
- Open support tickets
- Chat with support or admin agents

### Seller features
- Add new products
- Manage uploaded products
- Update stock and pricing
- View seller-specific inventory and sales data

### Admin features
- Monitor system-wide orders
- Update order and business status
- Manage inventory and platform activity
- Assign support tickets and review user activity

### Delivery features
- View assigned or available delivery tasks
- Update delivery status for orders

### Support features
- Create and manage support tickets
- Real-time messaging with customers
- Assign support agents to tickets

---

## Architecture and methods used

### 1. REST API architecture
The backend is organized around REST routes and controller functions. Requests are handled by route files that call controller logic for each module.

Examples:
- Authentication routes for login/register
- Product routes for catalog operations
- Order routes for checkout and status updates
- Ticket routes for support workflow

This is a standard MVC-style structure:
- Models = database schemas
- Controllers = business logic
- Routes = API endpoints
- Middleware = authentication and error handling

### 2. Express.js server
The backend uses Express to create the server, define routes, and process incoming HTTP requests.

It includes:
- JSON parsing
- CORS support
- request logging with Morgan in development mode
- health check endpoint
- centralized error handling

### 3. MongoDB + Mongoose
MongoDB is used as the database and Mongoose is used as the ODM (Object Data Modeling tool).

This means the project stores users, products, orders, payments, tickets, and chats using structured schemas, making data validation and querying simpler.

### 4. JWT authentication
JSON Web Tokens are used for session management.

How it works:
- User logs in
- Backend generates a token
- Token is sent to the frontend
- Frontend stores it locally
- Frontend includes the token on protected API requests
- Backend verifies the token using middleware

This is used to secure routes that require login.

### 5. bcrypt password hashing
User passwords are never stored in plain text.

The project uses bcryptjs in the user model to:
- hash passwords before saving
- compare login passwords securely during authentication

This protects user data in the database.

### 6. Role-based authorization
The project uses a custom authorization pattern to restrict access by role.

Roles available include:
- customer
- seller
- admin
- delivery
- support

Middleware checks the logged-in user’s role before allowing access to protected routes.

### 7. Protected frontend routes
On the frontend, React Router is used to gate pages behind protected routes.

This means a user can only access dashboards that match their role. For example:
- admin can access /admin
- seller can access /seller
- customer can access /customer
- delivery can access /delivery

### 8. React Context API
The app uses React Context for authentication state.

The AuthContext stores:
- currently logged-in user data
- login method
- logout method

This lets different components access user information without passing props through every level.

### 9. Axios HTTP client
The frontend uses Axios for easier API communication.

The app creates a central API instance to:
- attach API base URL
- handle requests consistently
- simplify backend communication

### 10. Local storage token persistence
After login, the token is stored in localStorage so the user remains signed in when the page is refreshed.

This gives a lightweight session experience for a demo project.

### 11. Real-time communication with Socket.IO
Support chat and ticket interactions are powered by Socket.IO.

This allows:
- live message updates
- instant ticket communication
- real-time collaboration between users and support staff

The backend creates a Socket.IO server instance and attaches controllers for chat and ticket functionality.

### 12. Demo data seeding
The backend includes a utility to seed demo catalog data automatically when the database is empty.

This is useful for testing the platform without manually creating products first.

### 13. Render deployment setup
The project includes a render.yaml file for deployment to Render.

It configures:
- backend service in the Backend folder
- frontend static build in the Frontend folder
- environment variables for MongoDB and JWT

---

## Tech stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Socket.IO
- CORS
- dotenv
- Morgan
- nodemailer

### Frontend
- React
- Vite
- React Router DOM
- Axios
- React Toastify
- Socket.IO Client
- CSS custom styling

---

## Project structure

```text
ShopSphere/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env.example (if added later)
├── Frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
├── render.yaml
├── README.md
└── .gitignore
```

---

## Main backend modules

### Auth module
Handles:
- user registration
- user login
- token generation
- fetching current user profile

### Product module
Handles:
- product creation
- listing products
- product detail view
- update and delete functionality

### Order module
Handles:
- placing orders
- viewing personal orders
- updating order status
- admin overview of orders

### Payment module
Supports payment processing flow for the commerce part of the app.

### Review module
Handles product review and rating operations.

### Inventory module
Tracks stock and product availability.

### Delivery module
Supports order delivery operations and statuses.

### Notification module
Handles notifications and user activity updates.

### Support and ticket modules
Manage:
- customer tickets
- support chat
- assignment of support users
- real-time messaging

---

## API route overview

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

### Products
- POST /api/products
- GET /api/products
- GET /api/products/:id
- PUT /api/products/:id
- DELETE /api/products/:id

### Orders
- POST /api/orders
- GET /api/orders/myorders
- GET /api/orders
- PUT /api/orders/:id/status

### Health
- GET /api/health

### Tickets and support
- POST /api/tickets
- PUT /api/tickets/:id
- PUT /api/tickets/:id/assign
- /api/chat routes for chat communication

---

## Role system

| Role | Main access |
| --- | --- |
| Customer | Browse products, cart, orders, support |
| Seller | Add and manage products |
| Admin | Global management and oversight |
| Delivery | Update delivery status |
| Support | Resolve tickets and chat |

---

## Environment variables

The backend requires these environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=development
DEMO_SELLER_PASSWORD=optional_demo_password
```

The frontend can use:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## How to run the project locally

### 1. Backend setup
```bash
cd Backend
npm install
```

Create a .env file with your MongoDB connection and JWT secret, then run:

```bash
npm run dev
```

The backend will run on:
- http://localhost:5000

### 2. Frontend setup
```bash
cd Frontend
npm install
```

Then run:

```bash
npm run dev
```

The frontend will run on:
- http://localhost:5173

---

## Deployment

This project is configured with Render using the file render.yaml.

It deploys:
- the backend as a web service
- the frontend as a static site

---

## Notes about the project

This project is a strong example of a full-stack application combining:
- database-backed API creation
- role-based security
- real-time communication
- modern frontend routing
- component-based UI design
- full-stack e-commerce logic

It is ideal for learning how a multi-role marketplace system is structured in a real-world JavaScript stack.

---

## Summary

ShopSphere is a full-stack e-commerce and support application built with modern JavaScript tools. It uses Express for API development, MongoDB for storage, JWT and bcrypt for secure authentication, Socket.IO for live chat, and React for user interfaces.

The project demonstrates a complete multi-role marketplace flow, practical API design, and modern frontend/backend integration.
