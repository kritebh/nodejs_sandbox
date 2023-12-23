const express = require('express');
const app = express();
const fs = require('fs')
app.use(express.static('public'));

const messages = [];
let clients = [];

app.get('/poll', (req, res) => {
    const timeout = setTimeout(() => {
        res.json([]);
    }, 30 * 1000); // 30 seconds timeout, adjust as needed

    clients.push({ res, timeout });
});

app.post('/publish', express.json(), (req, res) => {
    const { message } = req.body;
    messages.push(message);

    while (clients.length > 0) {
        const { res, timeout } = clients.pop();
        clearTimeout(timeout);
        res.json([{ message }]);
    }

    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.sendFile('./index.html', {root: __dirname })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
