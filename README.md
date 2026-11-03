# Employee Task Management Web Application
**MT1 Lab Examination - Full Stack Development (Node.js)**

A lightweight Employee Task Management web application demonstrating the core Node.js `http` and `fs` modules alongside a RESTful API built with `Express.js`.

---

## Project Structure

```text
EmployeeTaskManagement/
├── package.json
├── httpServer.js
├── expressApp.js
├── public/
│   └── index.html
└── screenshots/
```

---

## Prerequisites
- Node.js installed (v18 or higher recommended)
- npm (Node Package Manager)

---

## Installation & Setup

1. Open a terminal in the project directory:
   ```bash
   cd MT1-LABEXAM
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Part A: HTTP Module & Server Creation (`httpServer.js`)

Part A is built using only built-in Node.js modules (`http`, `fs`, `path`).

### Run the HTTP Server:
```bash
node httpServer.js
```

**Expected console output:**
```text
HTTP Server running at http://localhost:3000
```

### Endpoints & Functionality:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `http://localhost:3000/` | Welcome message in HTML format |
| `GET` | `http://localhost:3000/tasks` | Returns all employee tasks in JSON format |
| `GET` | `http://localhost:3000/about` | Employee task management application info |
| `GET` | `http://localhost:3000/home` | Serves static `public/index.html` using the `fs` module |
| `POST`| `http://localhost:3000/add-task` | Adds a new task record to in-memory array |

---

## Part B: Express.js REST API (`expressApp.js`)

Part B implements a RESTful CRUD API using the Express framework on port 4000.

### Run the Express Server:
```bash
node expressApp.js
```

**Expected console output:**
```text
Express Server running at http://localhost:4000
```

### REST API Endpoints:

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/tasks` | Retrieve all employee tasks | 200 OK |
| `GET` | `/tasks/:id` | Retrieve single task by ID | 200 OK / 404 Not Found |
| `POST` | `/tasks` | Create a new employee task | 201 Created / 400 Bad Request |
| `PUT` | `/tasks/:id` | Update existing task details | 200 OK / 404 Not Found |
| `DELETE` | `/tasks/:id` | Delete task by ID | 200 OK / 404 Not Found |

---

## API Testing with EchoAPI / Postman

### 1. GET All Tasks
- **Method:** `GET`
- **URL:** `http://localhost:4000/tasks`

### 2. GET Task by ID
- **Method:** `GET`
- **URL:** `http://localhost:4000/tasks/1`

### 3. POST New Task
- **Method:** `POST`
- **URL:** `http://localhost:4000/tasks`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "id": 4,
    "taskName": "Develop REST API",
    "assignedTo": "Amit Kumar",
    "status": "Pending",
    "priority": "Medium"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "message": "Task added successfully",
    "task": {
      "id": 4,
      "taskName": "Develop REST API",
      "assignedTo": "Amit Kumar",
      "status": "Pending",
      "priority": "Medium"
    }
  }
  ```

### 4. PUT Update Task
- **Method:** `PUT`
- **URL:** `http://localhost:4000/tasks/1`
- **Headers:** `Content-Type: application/json`
- **Body (raw JSON):**
  ```json
  {
    "taskName": "Develop Login Page",
    "assignedTo": "Rahul Sharma",
    "status": "Completed",
    "priority": "High"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "message": "Task updated successfully",
    "task": {
      "id": 1,
      "taskName": "Develop Login Page",
      "assignedTo": "Rahul Sharma",
      "status": "Completed",
      "priority": "High"
    }
  }
  ```

### 5. DELETE Task
- **Method:** `DELETE`
- **URL:** `http://localhost:4000/tasks/1`
- **Response (200 OK):**
  ```json
  {
    "message": "Task deleted successfully",
    "task": {
      "id": 1,
      "taskName": "Develop Login Page",
      "assignedTo": "Rahul Sharma",
      "status": "Completed",
      "priority": "High"
    }
  }
  ```

---

## Pushing to GitHub

To push this repository to GitHub:

1. Create a new empty repository on GitHub named `MT1-LABEXAM`.
2. Link remote and push the branches:
   ```bash
   git remote add origin https://github.com/<your-username>/MT1-LABEXAM.git
   git branch -M main
   git push -u origin main
   ```
