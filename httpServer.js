import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Initial employee task records
let tasks = [
  {
    id: 1,
    taskName: "Develop Login Page",
    assignedTo: "Rahul Sharma",
    status: "Pending",
    priority: "High"
  },
  {
    id: 2,
    taskName: "Database Schema Design",
    assignedTo: "Priya Patel",
    status: "In Progress",
    priority: "Medium"
  },
  {
    id: 3,
    taskName: "Design Dashboard UI",
    assignedTo: "Amit Kumar",
    status: "Completed",
    priority: "Low"
  }
];

// Create HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = req.url.split('?')[0];
  const method = req.method;

  // Route: / -> Welcome message in HTML format
  if (method === 'GET' && parsedUrl === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Employee Task Management</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 30px;">
        <h1>Welcome to Employee Task Management Application</h1>
        <p>Node.js HTTP Server is running successfully on Port 3000.</p>
        <ul>
          <li><a href="/home">Task Dashboard (/home)</a></li>
          <li><a href="/tasks">View All Tasks (/tasks)</a></li>
          <li><a href="/about">About Application (/about)</a></li>
        </ul>
      </body>
      </html>
    `);
  }
  // Route: /tasks -> List of employee tasks in JSON format
  else if (method === 'GET' && parsedUrl === '/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  }
  // Route: /add-task -> Add new task (POST)
  else if (method === 'POST' && parsedUrl === '/add-task') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const { id, taskName, assignedTo, status, priority } = data;

        // Validation for required fields
        if (!id || !taskName || !assignedTo || !status) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            error: "Validation failed: id, taskName, assignedTo, and status are required"
          }));
        }

        const newTask = {
          id: Number(id),
          taskName: taskName.trim(),
          assignedTo: assignedTo.trim(),
          status: status.trim(),
          priority: priority ? priority.trim() : "Medium"
        };

        tasks.push(newTask);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          message: "Task added successfully",
          task: newTask
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Invalid JSON format in request body" }));
      }
    });
  }
  // Route: /about -> Application information
  else if (method === 'GET' && parsedUrl === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>About - Task Management</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 30px;">
        <h2>Employee Task Management Application Information</h2>
        <p>This application is built for the Node.js Lab Examination.</p>
        <p>It manages employee task assignments, tracking statuses (Pending, In Progress, Completed), and priorities.</p>
        <p><a href="/home">&larr; Go to Dashboard</a></p>
      </body>
      </html>
    `);
  }
  // Route: /home -> Serve static HTML file using FS module
  else if (method === 'GET' && parsedUrl === '/home') {
    const filePath = path.join(__dirname, 'public', 'index.html');

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end("Error: Unable to load HTML file");
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  // 404 Route for invalid requests
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end("<h1>404 Not Found</h1><p>The requested route does not exist.</p>");
  }
});

// Configure server to listen on port 3000
server.listen(PORT, () => {
  console.log(`HTTP Server running at http://localhost:${PORT}`);
});
