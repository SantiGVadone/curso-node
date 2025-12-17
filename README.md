# Backend Fundamentals – Node.js & Express

## 📌 Description

This repository documents my learning process of **backend development with Node.js**, starting from core fundamentals without frameworks and progressing to building a **REST API using Express.js**.

The goal of this project is to build **strong backend foundations**, understanding how things work internally instead of relying on abstractions too early.

This repository is part of a long-term path toward becoming a **professional backend / full stack developer**.

---

## 🧭 Learning Path Overview

### 🟢 Week 1 – Node.js Fundamentals (No Frameworks)

Focused on understanding Node.js as a runtime environment and building backend logic from scratch.

**Topics covered:**

* What Node.js is and how it works
* JavaScript outside the browser
* Modules system (`require`, `module.exports`)
* Native Node.js modules:

  * `fs`
  * `path`
  * `os`
* npm and `package.json`
* Creating and running scripts
* HTTP server using the native `http` module
* Manual routing using:

  * `req.url`
  * `req.method`
* Returning JSON responses
* Understanding why frameworks like Express exist

**Outcome:**

* Solid understanding of how backend servers work internally
* Ability to create a basic API without any framework

---

### 🟢 Week 2 – Express.js & REST APIs

Focused on building clean and structured REST APIs using Express.js, applying backend best practices.

**Topics covered:**

* What Express.js is and why it is used
* Creating an Express server
* Routing with HTTP methods:

  * `GET`
  * `POST`
* Request & response handling
* Middlewares (`req`, `res`, `next`)
* Custom middlewares
* Parsing JSON requests
* Route parameters (`req.params`)
* Query parameters (`req.query`)
* HTTP status codes
* Error handling
* Basic project structure:

  * `routes`
  * `controllers`

**Outcome:**

* REST API with clean routing
* Organized backend structure
* Clear understanding of request flow in Express

---

## 🛠️ Technologies Used

* Node.js
* JavaScript
* Express.js
* npm

---

## ▶️ How to Run the Project

1. Clone the repository
2. Install dependencies:

   ```
   npm install
   ```
3. Run the server:

   ```
   node index.js
   ```
4. Open in your browser or Postman:

   ```
   http://localhost:3000
   ```

---

## 🎯 Purpose

This project is intentionally built **step by step**, avoiding shortcuts, to develop real backend skills that are transferable to professional environments.

The focus is on:

* Understanding how backend systems work
* Writing clean and readable code
* Building a solid base for future topics such as:

  * Databases (PostgreSQL)
  * Authentication (JWT)
  * Docker & deployment
  * Frontend integration (React)

---

## 🚀 Next Steps

* PostgreSQL & database modeling
* Connecting Express to a real database
* Authentication and authorization
* Full stack integration with a separate frontend
