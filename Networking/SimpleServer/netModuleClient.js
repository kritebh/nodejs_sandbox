const net = require('net');

// Connect to the server
const client = net.connect({ port: 3000 }, () => {
  console.log('Connected to server');
  
  // Send an HTTP GET request
  client.write('GET / HTTP/1.1\r\nHost: localhost\r\n\r\n');
});

// Handle data received from the server
client.on('data', (data) => {
  console.log(`Received data from server:\n${data.toString()}`);
  
  // Close the connection after receiving the response
  client.end();
});

// Handle the connection being closed
client.on('end', () => {
  console.log('Disconnected from server');
});
