// Modules
import fs from 'fs';
import FileReader from 'filereader';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import expressWs from 'express-ws';
import webpack from 'webpack';
import config from './webpack.config.js';

// Support enviornment variables
import dotenv from 'dotenv';
dotenv.config();

// Get __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start express-ws server
//--------------------------------------------------

const app = express();
const wss = expressWs(app);
const clients = new Set();

// Add clients to set when connected
app.ws('/node', (client) => {
    console.log(client);
    clients.add(client);
    client.on('close', () => { clients.delete(client); });
    setTimeout(() => { serveFile(); }, 1000);
});

app.listen(9000);

// Start webpack
//--------------------------------------------------

const compiler = webpack(config);
const pathToBundle = path.resolve(__dirname, process.env.TARGET_FOLDER, 'dist', 'bundle.js');

// Send update messages when webpack builds
compiler.watch({}, (err) => {
    if (err) { console.error(err); return; }
    else { console.log('Serving node...'); }
    serveFile();
});

// Serve file to client
function serveFile() {
    fs.readFile(pathToBundle, 'utf8', (err, text) => {
        clients.forEach((client) => {
            if (client.readyState !== client.OPEN) { return; }
            client.send(text);
        });
    });
}