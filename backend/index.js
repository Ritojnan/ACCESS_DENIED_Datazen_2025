const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client with LocalAuth for session persistence
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    // Generate and display the QR code
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp client is ready!');

    // Replace with the recipient's phone number and message
    const phoneNumber = '919619625673'; // Include country code, no "+" or "-"
    const message = 'Hello from whatsapp-web.js!';

    const chatId = `${phoneNumber}@c.us`;

    client.sendMessage(chatId, message)
        .then(response => {
            console.log('Message sent successfully:', response.id._serialized);
        })
        .catch(err => {
            console.error('Error when sending message:', err);
        });
});

client.on('message', msg => {
    console.log(`Message received from ${msg.from}: ${msg.body}`);
});

client.initialize();
