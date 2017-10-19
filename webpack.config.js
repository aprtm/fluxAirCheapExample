var path = require('path');

var config = {
    entry: ['./client/src/app.tsx'],
    output: {
        path: path.resolve(__dirname, 'client','build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/
        }]
    }
}

module.exports = config;