const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above
let allUsers = [];
app.get('/users/:id', (req, res) => {
    const user = allUsers.find(i => i.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

app.post('/users', (req, res) => {
    const newUser = {
      id: allUsers.length + 1,
      name: req.body.name,
      email: req.body.email,
    };
    allUsers.push(newUser);
    res.status(201).json(newUser);
  });
  
  app.put('/users/:id', (req, res) => {
    const user = allUsers.find(i => i.id === parseInt(req.params.id));
    if (!user) {
      return res.status(404).send('Item not found');
    }
    user.name = req.body.name;
    user.email = req.body.email;
    res.json(user);
  });

  app.delete('/users/:id', (req, res) => {
    const userIndex = allUsers.findIndex(i => i.id === parseInt(req.params.id));
    if (userIndex === -1) {
      return res.status(404).send('User not found');
    }
    allUsers.splice(userIndex, 1);
    res.status(204).send();
  });

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing