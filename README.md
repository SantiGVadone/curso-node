# Backend Fundamentals – Node.js, Express & REST API

## 📌 Description

This repository documents my learning journey in **backend development with Node.js**, starting from core fundamentals without frameworks and progressing toward building a **production-ready REST API using Express.js**.

The main goal of this project is to build **strong backend foundations**, understanding how things work internally before relying on abstractions, while following practices used in real-world backend development.

This repository is part of a long-term path toward becoming a **professional backend / full stack developer**.

---

## 🧭 Learning Path Overview

### 🟢 Week 1 – Node.js Fundamentals (No Frameworks)

Focused on understanding Node.js as a runtime environment and building backend logic from scratch.

**Topics covered:**

- What Node.js is and how it works
- JavaScript outside the browser
- Module system (`require`, `module.exports`)
- Native Node.js modules:
  - `fs`
  - `path`
  - `os`
- npm and `package.json`
- Creating and running scripts
- HTTP server using the native `http` module
- Manual routing using:
  - `req.url`
  - `req.method`
- Returning JSON responses
- Understanding why frameworks like Express exist

**Outcome:**

- Solid understanding of how backend servers work internally
- Ability to create a basic API without any framework

---

### 🟢 Week 2 – Express.js & REST APIs

Focused on building clean and structured REST APIs using Express.js.

**Topics covered:**

- What Express.js is and why it is used
- Creating an Express server
- Routing with HTTP methods:
  - `GET`
  - `POST`
- Request & response handling
- Middlewares (`req`, `res`, `next`)
- Custom middlewares
- Parsing JSON requests
- Route parameters (`req.params`)
- Query parameters (`req.query`)
- HTTP status codes
- Error handling
- Basic project structure:
  - `routes`
  - `controllers`
- CORS configuration
- API architecture basics (MVC approach)

**Outcome:**

- REST API with clean routing
- Organized backend structure
- Clear understanding of request flow in Express

---

### 🟢 Week 3 – Database Integration & Production Deployment

Focused on connecting the backend to a real database and deploying the API to production.

**Topics covered:**

- Relational database concepts
- Using MySQL-compatible databases
- Database modeling
- Environment variables
- Connecting Node.js to a cloud database
- Using **TiDB Cloud** as the database provider
- Separating configuration for development and production
- Deploying a Node.js API using **Render**
- Running the backend in a real production environment
- Testing deployed endpoints

**Outcome:**

- Backend connected to a real cloud database
- API deployed and publicly accessible
- Real production workflow experience

---

## 🌐 Production API

The API is deployed and running in production using **Render (free tier)** and **TiDB Cloud**.

### 🔗 Base URL

https://curso-node-k3b6.onrender.com/


### 📍 Available Endpoints

- Get all movies:

    /movie

- Filter movies by genre:

    /movie?genre=ACTION


- Get a movie by ID:

    /movie/:id

These endpoints return JSON responses and can be tested directly in the browser or using tools like Postman.

---

## 🛠️ Technologies Used

- Node.js
- JavaScript (ES6+)
- Express.js
- MySQL-compatible database
- TiDB Cloud
- Render
- npm

---

## ▶️ How to Run the Project Locally

1. Clone the repository
2. Install dependencies:

 npm install

3. Create a .env file with the required environment variables

4. Run the server:

  node index.js

5. Access the API locally:

http://localhost:1234

🎯 Purpose

This project is intentionally built step by step, avoiding shortcuts, to develop backend skills that are transferable to professional environments.

The focus is on:

Understanding how backend systems work

Writing clean and maintainable code

Applying real-world backend architecture

Deploying and maintaining a backend in production

🚀 Next Steps

Authentication & authorization (JWT)

Protecting routes

Role-based access

Frontend integration with a separate React application

Full stack deployment
