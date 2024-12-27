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
      document.getElementById('ticket-result').innerHTML = `
        <h2>Ticket Generated!</h2>
        <p>Name: ${data.ticket.name}</p>
        <p>Mobile: ${data.ticket.mobile}</p>
        <p>Ticket Number: ${data.ticket.ticketNumber}</p>
      `;
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
