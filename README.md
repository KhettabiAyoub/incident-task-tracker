<h1>🚀 Incident Tracker</h1>

A full-stack Incident & Task management application built with Spring Boot (JWT secured REST API) and React + TypeScript + TailwindCSS.

This project demonstrates authentication, protected routes, CRUD operations, filtering, pagination, and clean UI design.

<h2>✨ Features</h2>

🔐 JWT Authentication (Login / Register)

🛡 Protected API endpoints (Spring Security)

📝 Create, update, delete tickets

🔎 Filter by status / priority / type

📄 Server-side pagination

🎨 Modern UI with TailwindCSS

⚠️ Proper error handling

🔄 Axios interceptor for automatic token handling

<h2>🛠 Tech Stack</h2>
<h3>Backend</h3>

Java 17+

Spring Boot

Spring Security

JWT

Spring Data JPA

PostgreSQL (or H2)

Maven

<h3>Frontend</h3>

React

TypeScript

TailwindCSS

Axios

<h2>📂 Project Structure</h2>
backend/

frontend/

<h4>Frontend structure:</h4>

src/

  api/
  
  components/
  
  types/
  
  utils/
  
  App.tsx
  
<h2>🔐 Authentication Flow</h2>

User logs in or registers.

Backend returns a JWT token.

Token is stored in localStorage.

Axios interceptor automatically attaches:

Authorization: Bearer <token>

If a 401 occurs → token is removed and user is redirected to login.

<h2>📡 API Endpoints</h2>
<h3>Auth</h3>

POST /auth/register

POST /auth/login

<h3>Tickets</h3>

GET    /api/tickets/search

POST   /api/tickets

PUT    /api/tickets/{id}

DELETE /api/tickets/{id}



=> All /api/** endpoints are secured.


<h2>⚙️ Getting Started</h2>
1️⃣ Backend
cd backend
mvn clean install
mvn spring-boot:run

Runs on:

http://localhost:8080
2️⃣ Frontend
cd frontend
npm install
npm run dev

Runs on:

http://localhost:5173
<h2>🖼 Screenshots</h2>

### Login
![Login](images/login.png)

### Dashboard Overview
![Dashboard Overview](images/dashboard-overview.png)

### Tickets Table
![Tickets Table](images/dashboard-tickets.png)

### Create Ticket
![Create Ticket](images/create-ticket.png)

<h2>📌 What This Project Demonstrates</h2>

Clean component architecture

Proper state management

Secure authentication handling

Error handling UX

Real-world CRUD logic

Separation of concerns (API / UI / Types)

<h2>🧠 Future Improvements </h2>

Role-based access control

Dark mode

User assignment system

Deployment (Docker + CI/CD)

Unit & integration tests

<h2>📄 License </h2>

This project is open-source and available under the MIT License
