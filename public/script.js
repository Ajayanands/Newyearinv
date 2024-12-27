document.getElementById('ticket-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const mobile = document.getElementById('mobile').value;

  try {
    // Send the data to the server to generate the ticket
    const response = await fetch('/generate-ticket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, mobile })
    });

    const data = await response.json();

    // Show the ticket result
    if (response.status === 200) {
      const ticket = data.ticket;
      
      document.getElementById('ticket-result').innerHTML = `
        <h2>Ticket Generated!</h2>
        <p>Name: ${ticket.name}</p>
        <p>Mobile: ${ticket.mobile}</p>
        <p>Ticket Number: ${ticket.ticketNumber}</p>
        <button id="download-btn">Download Ticket</button>
      `;

      // Add event listener for download button
      document.getElementById('download-btn').addEventListener('click', () => {
        generateTicketImage(ticket);
      });
      
    } else {
      document.getElementById('ticket-result').innerHTML = `
        <h2>Error</h2>
        <p>${data.message}</p>
      `;
    }

  } catch (error) {
    document.getElementById('ticket-result').innerHTML = `
      <h2>Error</h2>
      <p>Something went wrong. Please try again.</p>
    `;
  }
});

// Function to generate and download ticket as PNG
function generateTicketImage(ticket) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 300;

  // Draw background
  ctx.fillStyle = '#ff007f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw ticket details
  ctx.fillStyle = '#fff';
  ctx.font = '24px Arial';
  ctx.fillText('New Year Party Ticket', 180, 50);
  ctx.font = '18px Arial';
  ctx.fillText(`Name: ${ticket.name}`, 30, 100);
  ctx.fillText(`Mobile: ${ticket.mobile}`, 30, 130);
  ctx.fillText(`Ticket Number: ${ticket.ticketNumber}`, 30, 160);

  // Add a border
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

  // Convert canvas to PNG and download
  const dataURL = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `${ticket.ticketNumber}_ticket.png`;
  link.click();
}

// Fetch and display the list of tickets when the "View List" button is clicked
document.getElementById('view-list-btn').addEventListener('click', async () => {
  try {
    const response = await fetch('/view-tickets');
    const data = await response.json();

    if (response.status === 200) {
      const tickets = data.tickets;
      const listContainer = document.getElementById('ticket-list');
      listContainer.innerHTML = '<h2>All Generated Tickets</h2>';

      tickets.forEach(ticket => {
        const ticketItem = document.createElement('div');
        ticketItem.classList.add('ticket-item');
        ticketItem.innerHTML = `
          <p>Name: ${ticket.name}</p>
          <p>Mobile: ${ticket.mobile}</p>
          <p>Ticket Number: ${ticket.ticketNumber}</p>
        `;
        listContainer.appendChild(ticketItem);
      });
    }
  } catch (error) {
    alert('Error fetching the ticket list!');
  }
});
