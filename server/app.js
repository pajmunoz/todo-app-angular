const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

const todos = [
    /*{ id: 0, text: 'Say hello', completed: true },
    { id: 1, text: 'My friend', completed: false },*/
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la aplicación To-Do!');
  });

app.post('/api/todos', (req, res) => {
  const newTodo = req.body;
  newTodo.id = Date.now();
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const updatedTodo = req.body;

  
  const index = todos.findIndex(todo => todo.id === parseInt(todoId));

  if (index !== -1) {
    
    todos[index] = updatedTodo;
    res.json(updatedTodo);
  } else {
    res.status(404).json({ message: 'To-Do not found' });
  }
});
app.delete('/api/todos/completed', (req, res) => {
  const updatedTodos = todos.filter((todo) => !todo.completed);
  todos.length = 0; // Vacía la matriz original
  updatedTodos.forEach((todo) => todos.push(todo)); // Reemplaza con los todos no completados
  res.status(200).json(updatedTodos);
  console.log(updatedTodos);
});

app.delete('/api/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const index = todos.findIndex(todo => todo.id === parseInt(todoId));
  if (index !== -1) {
    todos.splice(index, 1);
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: 'To-Do not found' });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
