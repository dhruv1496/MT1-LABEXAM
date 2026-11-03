import express from 'express';

const app = express();
const PORT = 4000;

// Middleware for parsing JSON request bodies
app.use(express.json());

// In-memory tasks array (initial sample records)
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

// GET /tasks - Retrieve all employee tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// GET /tasks/:id - Retrieve a task by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: `Task with id ${taskId} not found` });
  }

  res.status(200).json(task);
});

// POST /tasks - Add a new task
app.post('/tasks', (req, res) => {
  const { id, taskName, assignedTo, status, priority } = req.body;

  // Validate required fields
  if (!taskName || !assignedTo || !status) {
    return res.status(400).json({
      error: "Validation failed: taskName, assignedTo, and status are required"
    });
  }

  // Determine ID
  const newTaskId = id !== undefined ? Number(id) : (tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1);

  // Check for duplicate ID
  if (tasks.some(t => t.id === newTaskId)) {
    return res.status(400).json({ error: `Task with id ${newTaskId} already exists` });
  }

  const newTask = {
    id: newTaskId,
    taskName: taskName.trim(),
    assignedTo: assignedTo.trim(),
    status: status.trim(),
    priority: priority ? priority.trim() : "Medium"
  };

  tasks.push(newTask);

  res.status(201).json({
    message: "Task added successfully",
    task: newTask
  });
});

// PUT /tasks/:id - Update task details
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: `Task with id ${taskId} not found` });
  }

  const { taskName, assignedTo, status, priority } = req.body;

  if (taskName !== undefined) task.taskName = taskName.trim();
  if (assignedTo !== undefined) task.assignedTo = assignedTo.trim();
  if (status !== undefined) task.status = status.trim();
  if (priority !== undefined) task.priority = priority.trim();

  res.status(200).json({
    message: "Task updated successfully",
    task: task
  });
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: `Task with id ${taskId} not found` });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask
  });
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start Express server on port 4000
app.listen(PORT, () => {
  console.log(`Express Server running at http://localhost:${PORT}`);
});
