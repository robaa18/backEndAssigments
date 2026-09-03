# Backend Development Assignments

A collection of practical backend development assignments completed during my backend learning journey.

This repository demonstrates my progression from JavaScript fundamentals and Node.js core concepts to building RESTful APIs, working with relational databases, and using ORM-based backend architecture.

---

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-REST%20API-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Database-4479A1?logo=mysql&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-52B0E7?logo=sequelize&logoColor=white)

- JavaScript
- Node.js
- Express.js
- RESTful APIs
- MySQL
- MySQL2
- Sequelize ORM
- File System
- Streams
- EventEmitter
- Git & GitHub

---

# Repository Structure

```text
backEndAssigments/
│
├── task1/
├── task2/
├── task3/
├── task4/
├── task5/
├── test/
└── README.md
```

Each folder represents a stage in the backend learning process and contains practical exercises and implementations.

---

# Assignment Overview

## Task 1 — JavaScript Fundamentals

Covers core JavaScript concepts used throughout backend development.

### Topics

- Variables and data types
- Conditions
- Loops
- Arrays
- `map()` and `filter()`
- Functions
- Arrow functions
- Objects
- Object destructuring
- Spread and rest operators
- Promises
- Async / Await

Example concepts implemented:

```js
const square = (number) => number * number;

const sumNumbers = (...numbers) => {
  return numbers.reduce((sum, number) => sum + number, 0);
};
```

---

## Task 2 — Node.js Core Modules

Practical exercises focused on understanding Node.js without relying on external frameworks.

### Topics

- `fs` module
- `path` module
- `os` module
- EventEmitter
- File operations
- Synchronous vs asynchronous operations
- Readable streams
- Writable streams
- Stream piping
- File compression
- `zlib`
- Node.js pipeline

Examples include:

- Creating and deleting files
- Reading and writing files
- Creating directories
- Working with paths
- Reading large files using streams
- Copying files using streams
- Compressing files using Gzip
- Creating and emitting custom events

---

## Task 3 — Express.js & REST APIs

Introduces backend API development using Node.js and Express.js.

### Main Concepts

- Express server setup
- RESTful API design
- HTTP methods
- Route parameters
- Query parameters
- Request body
- Middleware
- HTTP status codes
- Error handling
- JSON-based data persistence

### User API

Implemented CRUD operations including:

```text
POST    /user
PATCH   /user/:id
DELETE  /user/:id
GET     /user
GET     /user/:id
GET     /user/getByName
GET     /user/filter
```

The assignment uses a JSON file as a simple persistence layer while practicing API design before moving to databases.

---

## Task 4 — Express.js + MySQL

Introduces relational databases and SQL integration with Node.js.

### Technologies

- Node.js
- Express.js
- MySQL
- MySQL2
- CORS
- SQL

### Modules

The backend is separated into modules including:

```text
Products
Suppliers
Sales
Reports
```

### Concepts Practiced

- Connecting Node.js to MySQL
- Executing SQL queries
- CRUD operations
- Relational database design
- SQL aggregate functions
- Filtering and reporting
- Modular backend structure
- API routes
- Error handling

Example architecture:

```text
Request
   |
   v
Route
   |
   v
Controller
   |
   v
Database Query
   |
   v
MySQL
```

---

## Task 5 — Sequelize ORM

Moves from writing raw SQL queries to working with an Object-Relational Mapper.

### Technologies

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- MySQL2
- Dotenv
- CORS

### Main Modules

```text
Users
Posts
Comments
```

### Concepts Practiced

- Sequelize models
- Model relationships
- Database synchronization
- CRUD operations
- Associations
- Query operators
- Environment configuration
- Modular architecture
- Development and production environments

The project structure is organized into:

```text
src/
│
├── DB/
├── common/
├── middleware/
└── modules/
    ├── users/
    ├── posts/
    └── comments/
```

---

# Backend Learning Progression

```text
JavaScript
    |
    v
Node.js Core
    |
    v
Express.js
    |
    v
REST APIs
    |
    v
MySQL + Raw SQL
    |
    v
Sequelize ORM
    |
    v
Structured Backend Applications
```

---

# Key Concepts Practiced

Throughout these assignments, I practiced:

- JavaScript ES6+ concepts
- Asynchronous JavaScript
- Promises and Async/Await
- Node.js architecture
- Event Loop fundamentals
- File System operations
- Streams and buffers
- Event-driven programming
- REST API development
- Express middleware
- API routing
- Error handling
- HTTP status codes
- CRUD operations
- Relational databases
- SQL queries
- MySQL integration
- Sequelize ORM
- Database relationships
- Modular backend architecture
- Environment variables

---

# Running the Assignments

Clone the repository:

```bash
git clone https://github.com/robaa18/backEndAssigments.git
```

Move into the repository:

```bash
cd backEndAssigments
```

---

## Running Basic Node.js Assignments

For assignments that do not require dependencies:

```bash
node main.js
```

---

## Task 3

```bash
cd task3
npm install
npm start
```

---

## Task 4

```bash
cd task4/backend
npm install
npm start
```

A running MySQL database is required for the database-related functionality.

---

## Task 5

```bash
cd task5
npm install
```

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm run pro
```

A configured MySQL database is required.

---

# Purpose

This repository documents my practical progress while learning backend development.

Rather than containing a single application, it contains multiple assignments that gradually introduce more advanced backend concepts, starting from JavaScript and Node.js fundamentals and progressing toward database-driven Express.js applications using MySQL and Sequelize.

---

# Author

**Robaa Ahmed**

Junior Backend Developer

GitHub: [@robaa18](https://github.com/robaa18)

---

## Notes

This repository is intended for educational and portfolio purposes and will continue to be updated as I progress through backend development topics.
