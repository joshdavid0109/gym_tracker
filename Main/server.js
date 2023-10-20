/* IMPORTANT!!!!!!!!!! 
- pag empty yung ClientData.json niyo, put a
{
    "clients": []
}

- to run the server, go to terminal and cd to Main
- then node server.js
*/

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // import the cors package

const app = express();
const port = 3000;

app.use(bodyParser.json());

// enable CORS for all routes 
app.use(cors());

const dataFilePath = 'MainClientData.json'; // change ur file path

app.post('/add-client', (req, res) => {
    try {
        const clientData = req.body;

        // read existing data (if any)
        let existingData = [];
        if (fs.existsSync(dataFilePath)) {
            existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        }

        // append new client data
        existingData.push(clientData);

        // write updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

        res.json({ success: true, message: 'Client data added successfully' });
    } catch (error) {
        console.error('Error adding client data:', error);
        res.status(500).json({ success: false, message: 'Failed to add client data' });
    }
});


app.post('/delete-client', (req, res) => {
    try {
        const { index } = req.body;

        // Read existing data (if any)
        const existingData = fs.existsSync(dataFilePath)
            ? JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
            : { clients: [] };

        // Remove the client at the specified index
        existingData.clients.splice(index, 1);

        // Write updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

        res.json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        console.error('Error deleting client data:', error);
        res.status(500).json({ success: false, message: 'Failed to delete client data' });
    }
});


// still doing
app.post('/edit-client', (req, res) => {
    try {
        const { index } = req.body;

        // Read existing data (if any)
        const existingData = fs.existsSync(dataFilePath)
            ? JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
            : { clients: [] };

        // Remove the client at the specified index
        existingData.clients.splice(index, 1);

        // Write updated data back to the file
        fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));

        res.json({ success: true, message: 'Client details modifed successfully' });
    } catch (error) {
        console.error('Error deleting client data:', error);
        res.status(500).json({ success: false, message: 'Failed to delete client data' });
    }
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
