const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Arracar el servidor
const server = express();

// Configuración del servidor
server.use(cors());
server.use(express.json({ limit: '25mb' }));

//config puerto
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});