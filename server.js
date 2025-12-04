// server.js

// 1. Import the Express framework
const express = require('express');
const app = express();

// 2. Set the port. Render will inject the required port via an environment variable.
// We default to 3000 for local testing.
const PORT = process.env.PORT || 3000;

// 3. Middleware to parse incoming JSON data (e.g., {"temperature": 25.5})
app.use(express.json());

// 4. Middleware to parse URL-encoded data (e.g., if you send data via a GET request's query string)
app.use(express.urlencoded({ extended: true }));

// --- API Endpoint ---
// 5. Define the endpoint your SIMCOM client will hit: POST /data-logger
app.post('/data-logger', (req, res) => {
    // a. Data received from the SIMCOM client will be in req.body
    const receivedData = req.body; 

    console.log('--- New Data Received ---');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Payload:', receivedData);
    
    // Check if the payload is valid (e.g., check for a temperature field)
    if (receivedData && typeof receivedData.temperature === 'number') {
        // b. Data Processing / Storage (e.g., saving to a database)
        // In a real application, you would insert this data into a MongoDB, PostgreSQL, etc.
        console.log(`Successfully logging Temperature: ${receivedData.temperature}°C`);

        // c. Send a success response back to the SIMCOM client
        return res.status(200).send({ 
            status: 'success', 
            message: 'Data logged successfully.', 
            received_at: new Date().toISOString()
        });
    } else {
        // d. Send an error response for bad data
        console.error('ERROR: Invalid data format received.');
        return res.status(400).send({ 
            status: 'error', 
            message: 'Invalid payload. Expecting {"temperature": number}' 
        });
    }
});

// --- Simple Root Endpoint (for health checks) ---
app.get('/', (req, res) => {
    res.send('IoT Data Logger Server is running.');
});


// 6. Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
