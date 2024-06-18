const http = require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');

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

            const { id,empname } = formData;

            try {
                const database = client.db('addemployee');
                const collection = database.collection('add_employee');

                const add_employee = {
                    id,
                    empname
                };

                const result = await collection.insertOne(add_employee);
                console.log(`${result.insertedCount} document inserted`);

                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('employee added successfully');
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

// Create HTTP server
const server = http.createServer(onRequest);
server.listen(7050, () => {
    console.log('Server is running on port 7050...');
});