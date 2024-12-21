const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

const readData = () => {
    const data = fs.readFileSync('data.json');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Route to get current counts for all entrants
app.get('/counts', (req, res) => {
    const data = readData();
    res.json(data);
});

// Route to update counts for a specific entrant
app.post('/update-counts', express.json(), (req, res) => {
    const { entrant, count } = req.body;
    const data = readData();
    if (data.entrants[entrant] !== undefined) {
        data.entrants[entrant] += count;
        writeData(data);
        res.json(data.entrants);
    } else {
        res.status(404).json({ error: 'Entrant not found' });
    }
});

// Define a simple route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
