const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');
const net = require('net');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    console.log('Request for ' + path + ' received');

    if (req.method === 'POST' && path === '/') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });

        req.on('end', async () => {
            const formData = querystring.parse(body);
            const { username, company, email, phone, message } = formData;

            try {
                const database = client.db('contactus');
                const collection = database.collection('contact_us');

                const contact_us = { username, company, email, phone, message };

                const result = await collection.insertOne(contact_us);
                console.log(`${result.insertedCount} document inserted`);

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write("Data submitted successfully");
                res.end();
            } catch (error) {
                console.error('Error inserting data:', error);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Internal Server Error');
                res.end();
            }
        });
    } else {
        // Handle other requests (e.g., GET requests to other paths)
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Not Found');
        res.end();
    }
}

// Function to check if a port is available
const checkPort = port =>
    new Promise(resolve => {
        const tester = net.createServer()
            .once('error', err => {
                if (err.code === 'EADDRINUSE') {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .once('listening', () => {
                tester.close(() => {
                    resolve(true);
                });
            })
            .listen(port);
    });

const PORT = 7000; // Change to the desired port number

checkPort(PORT).then((available) => {
    if (available) {
        const server = http.createServer(onRequest);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } else {
        console.error(`Port ${PORT} is already in use.`);
    }
}).catch((err) => {
    console.error('Error checking port availability:', err);
});
