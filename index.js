const express = require('express');
const app = express();
const port = 3000;

// Store tickets in memory (replace with a database in production)
let tickets = [];

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Generate ticket endpoint
app.post('/generate-ticket', (req, res) => {
  const { name, mobile } = req.body;

  // Check if the mobile number already exists
  if (tickets.find(ticket => ticket.mobile === mobile)) {
    return res.status(400).json({
      message: `<span style="color: #ffffff;">This mobile number already has a ticket!</span>`
    });
  }
  // Generate a new ticket number
  const ticketNumber = ('00' + (tickets.length + 1)).slice(-3); // Generate numbers like 001, 002, etc.

  // Create the ticket object
  const ticket = { name, mobile, ticketNumber };

  // Store the ticket
  tickets.push(ticket);

  // Respond with the ticket details
  res.status(200).json({ ticket });
});

// View tickets endpoint
app.get('/view-tickets', (req, res) => {
  res.status(200).json({ tickets });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
