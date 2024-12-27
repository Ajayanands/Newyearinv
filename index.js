const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware to handle form submission
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data storage for users (in-memory, use a database for persistence)
let users = [];
let ticketNumber = 1;  // Start generating tickets from 1

// Route to handle ticket generation
app.post('/generate-ticket', (req, res) => {
  const { name, mobile } = req.body;

  // Check if the mobile number already exists in the system
  const existingUser = users.find(user => user.mobile === mobile);
  if (existingUser) {
    return res.status(400).json({ message: 'This mobile number already has a ticket.' });
  }

  // Generate the ticket and store the user data
  const newTicket = {
    ticketNumber: ticketNumber++,
    name,
    mobile
  };
  users.push(newTicket);

  // Return the ticket information
  res.status(200).json({
    message: 'Ticket generated successfully!',
    ticket: newTicket
  });
});

// Endpoint to get all tickets (for admin or viewing)
app.get('/tickets', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
