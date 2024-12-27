document.getElementById('ticket-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
  
    // Simulating ticket generation (in reality, the backend would handle this)
    const ticketNumber = Math.floor(100 + Math.random() * 900); // Generate a 3-digit ticket
  
    document.getElementById('ticket-result').innerHTML = `
      <h2>Ticket Generated!</h2>
      <p>Name: ${name}</p>
      <p>Mobile: ${mobile}</p>
      <p>Ticket Number: ${ticketNumber}</p>
    `;
  });
  