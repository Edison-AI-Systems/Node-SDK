// Modules
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

// Support enviornment variables
import dotenv from 'dotenv';
dotenv.config();

// Get __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get entry path from package.json
const packageJsonPath = path.resolve(__dirname, process.env.TARGET_FOLDER, 'src', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const entryPath = path.resolve(__dirname, process.env.TARGET_FOLDER, 'src', packageJson.main);

// Export as default
export default {
    mode: 'production',
    entry: entryPath,
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, process.env.TARGET_FOLDER, 'dist'),
        library: {
            type: 'module'
        },
    },
    experiments: {
        outputModule: true
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'url-loader',
                    }
                ]
            }
        ]
    }
};