const http = require('http');
const fs = require('fs');
const path = require('path');

// Utility function to get the full path of the file
const getFilePath = (fileName) => path.join(__dirname, 'files', fileName);

// Create an HTTP server
const server = http.createServer((req, res) => {
    const { method, url } = req;

    // Parse the URL to get the file name
    const fileName = url.slice(1);

    if (method === 'POST') {
        // Create a new file
        const filePath = getFilePath(fileName);
        let fileData = '';

        req.on('data', chunk => {
            fileData += chunk;
        });

        req.on('end', () => {
            fs.writeFile(filePath, fileData, (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error creating file');
                    return;
                }
                res.writeHead(201, { 'Content-Type': 'text/plain' });
                res.end('File created');
            });
        });
    } else if (method === 'GET') {
        // Read a file
        const filePath = getFilePath(fileName);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error reading file');
                }
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else if (method === 'DELETE') {
        // Delete a file
        const filePath = getFilePath(fileName);

        fs.unlink(filePath, (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('File not found');
                } else {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error deleting file');
                }
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('File deleted');
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method not allowed');
    }
});

// Ensure the 'files' directory exists
fs.mkdir(path.join(__dirname, 'files'), { recursive: true }, (err) => {
    if (err) {
        console.error('Error creating files directory', err);
        process.exit(1);
    }

    // Start the server
    server.listen(3000, () => {
        console.log('Server running at http://localhost:3000/');
    });
});
