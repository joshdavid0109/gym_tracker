const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

app.post('/saveClientData', (req, res) => {
    const clientData = req.body;

    // Read existing data from the JSON file
    fs.readFile('ClientData.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read data file' });
            return;
        }

        const existingData = JSON.parse(data);

        // Append the new client data to the existing data
        existingData.push(clientData);

        // Write the updated data back to the file
        fs.writeFile('ClientData.json', JSON.stringify(existingData, null, 2), (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to write data to file' });
                return;
            }
            res.json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});