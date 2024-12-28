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
  <div style="
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    margin: 20px auto;
    text-align: center;
    color: #ffffff; /* Bright white text */
    font-family: Arial, sans-serif; /* Optional for better readability */
  ">
    <h2 style="color: #ffffff;">Ticket Generated!</h2>
    <p style="color: #ffffff;">Name: ${ticket.name}</p>
    <p style="color: #ffffff;">Mobile: ${ticket.mobile}</p>
    <p style="color: #ffffff;">Ticket Number: ${ticket.ticketNumber}</p>
    <button id="download-btn" style="
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      cursor: pointer;
      font-size: 16px;
    ">Download Ticket</button>
  </div>
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

function generateTicketImage(ticket) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 600;
  canvas.height = 300;

  // Draw background with gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#FFD700'); // Pink
  gradient.addColorStop(1, '#03055B'); // Gold
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw header with festive theme
  ctx.fillStyle = '#fff';
  ctx.font = '28px Arial bold';
  ctx.textAlign = 'center';
  ctx.fillText('🎉 New Year Party 2024 🎉', canvas.width / 2, 50);

  // Draw ticket details
  ctx.font = '20px Arial';
  ctx.fillText(`Name: ${ticket.name}`, canvas.width / 2, 120);
  ctx.fillText(`Mobile: ${ticket.mobile}`, canvas.width / 2, 150);
  ctx.fillText(`Ticket Number: ${ticket.ticketNumber}`, canvas.width / 2, 180);

  // Add decorative border
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 5;
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);

  // Add footer message
  ctx.font = '16px Arial italic';
  ctx.fillText('Thank you for celebrating with us!', canvas.width / 2, 250);

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

      // Create a table for displaying tickets
      const table = document.createElement('table');
      table.style.width = '100%';
      table.style.borderCollapse = 'collapse';

      // Create table header
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `
        <th style="border: 1px solid #000; padding: 10px; text-align: center;">Name</th>
        <th style="border: 1px solid #000; padding: 10px; text-align: center;">Ticket Number</th>`;
      table.appendChild(headerRow);

      // Add rows for each ticket
      tickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="border: 1px solid #000; padding: 10px;">${ticket.name}</td>
          <td style="border: 1px solid #000; padding: 10px;">${ticket.ticketNumber}</td>
        `;
        table.appendChild(row);
      });

      // Append the table to the container
      listContainer.appendChild(table);
    }
  } catch (error) {
    alert('Error fetching the ticket list!');
  }
});
