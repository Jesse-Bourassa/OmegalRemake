const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8081 });

server.on('connection', (socket) => {
    console.log('A client connected');

    socket.on('message', (message) => {
        // Convert the Buffer to a string
        const messageString = message.toString('utf-8');
        console.log('Received (as string):', messageString);

        try {
            // Parse the string as JSON
            const data = JSON.parse(messageString);

            // Prepare the outgoing message as a JSON string
            const outgoingMessage = JSON.stringify({
                userId: data.userId,
                message: data.message
            });

            console.log('Sending:', outgoingMessage);

            // Send the message to all connected clients
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(outgoingMessage);
                }
            });
        } catch (error) {
            console.error('Error parsing message on server:', error);
        }
    });

    socket.on('close', () => {
        console.log('A client disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8081');
