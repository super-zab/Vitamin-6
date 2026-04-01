const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];

// GET /todos - Retrieve all to-do items
app.get('/todos', (_req, res) => {
  res.json(todos);
});

// POST /todos - Add a new to-do item
app.post('/todos', (req, res) => {
  const { task } = req.body;

  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task cannot be empty' });
  }

  const newTodo = { id: todos.length + 1, task: task.trim() };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update an existing to-do item
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task cannot be empty' });
  }

  const todo = todos.find((t) => t.id === parseInt(id));

  if (todo) {
    todo.task = task.trim();
    res.json(todo);
  } else {
    res.status(404).json({ error: 'To-Do item not found' });
  }
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const exists = todos.some((t) => t.id === parseInt(id));

  if (!exists) {
    return res.status(404).json({ error: 'To-Do item not found' });
  }

  todos = todos.filter((t) => t.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
