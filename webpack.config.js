//This file sets up how we bundle components into a single browser-friendly file
//It uses webpack, which is listed as a dev dependency in package.json
//Running npm run build runs the webpack command, which will reference this file to know what to do
//The output of this file is a file called customComponents.js in the dist folder and is what can be loaded into html page

const path = require('path');

module.exports = {
  entry: './customComponents_dev.js',
  output: {
    filename: 'customComponents.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  }
};