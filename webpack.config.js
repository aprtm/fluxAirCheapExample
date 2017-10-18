var path = require('path');

var config = {
    entry: ['./client/app.tsx'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: ['', '.ts', '.tsx', '.js'],
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}

module.exports = config;