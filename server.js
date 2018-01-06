const http = require('http');
const app = require('./app');

// Assigning Port
const port = process.env.PORT || 3000;

// Creating Server Instance
const server = http.createServer(app);

// Listening Server on Port 
server.listen(port, '127.0.0.1', () =>{
   console.log(`Server Starts on Port ${port}`) ;
});