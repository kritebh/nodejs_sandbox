const net = require('net');

// Create a server using the net module
const server = net.createServer((socket) => {
  // 'connection' listener
  console.log('Client connected');

  // Handle data received from the client
  socket.on('data', (data) => {
    console.log(`Received data from client: ${data}`);
    // Respond to the client
    socket.write('Hello, client! I received your message.');
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

// Set the server to listen on a specific port and IP address
const PORT = 3000;
const HOST = 'localhost'; // Use 'localhost' if you want to listen only on the local machine

server.listen(PORT, HOST, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
});
