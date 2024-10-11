const params = new URLSearchParams(window.location.search);
const userId = params.get('guestId') || 'unknown';

document.getElementById('userId').textContent = userId;

const ws = new WebSocket('ws://70.24.222.27:8081');

ws.onopen = () => {
    console.log('Connected to the server as', userId);
};

ws.onmessage = (event) => {
    console.log('Raw message received:', event.data);

    try {
        // Parse the JSON message received from the server
        const data = JSON.parse(event.data);

        // Ensure 'data' contains 'userId' and 'message'
        if (data.userId && data.message) {
            const messageList = document.getElementById('messages');
            const newMessage = document.createElement('li');

            // Format the message to show userId and message only
            newMessage.textContent = `${data.userId}: ${data.message}`;
            messageList.appendChild(newMessage);
        } else {
            console.error('Message data is missing userId or message fields:', data);
        }
    } catch (error) {
        console.error('Error parsing message:', error, 'Message content:', event.data);
    }
};

function sendMessage() {
    const message = document.getElementById('message').value;
    const messageObject = { userId, message };

    const messageJSON = JSON.stringify(messageObject);
    console.log('Sending message:', messageJSON);
    ws.send(messageJSON);
}
console.log('Sending message:', messageJSON);
