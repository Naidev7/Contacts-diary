//dependency imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Start server
const server = express();

// Config server
server.use(cors());
server.use(express.json({ limit: '25mb' }));

//config port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});

//Import and start connection
const dbConnect = require('../config/connection');
dbConnect();

//model imports
const Contacts = require('../models/contacts');
const Users = require('../models/users');

//import functions endpoints


server.post("/registrer", asyn  (req, res) = {
  const { name, email, adress, password } = req.body;

})