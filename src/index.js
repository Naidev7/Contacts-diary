//dependency imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

//JWT functions
const generateToken = (data) => {
  const token = jwt.sign(data, 'secreto', { expiresIn: '1h' });
  return token;
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded;
  } catch (err) {
    console.log('token malo: ', err)
    return null;
  }
};

//middleware
const authenticateToken = (req, res, next) => {
  const tokenBarrer = req.headers['authorization'];
  console.log(tokenBarrer)

  const token = tokenBarrer.split(' ')[1]; //separate token, eliminate barrer and save token

  if (!token) {
    return res.status(401).json({ error: 'token not provided' });
  };

  console.log(token)
  const decoded = verifyToken(token);

  if (!decoded) {
    console.log(decoded)
    return res.status(401).json({ error: 'invalid token' });
  };

  req.user = decoded;
  next();
};



//import functions endpoints

//all contacts endpoint: read
server.post('/getContacts', authenticateToken, async (req, res)=>{
  try{
    const contactsList = await Contacts.find();

    if(!contactsList){ // exist contacts? 
      res.status(500).json({success: false, msj: 'Not contacts found'}).redirect('/addContacts');
      console.log('not existing contacts');
    };

    res.status(200).json({success: true, data: contactsList});

  }catch(e){
    res.status(500).json({success: false, msj:'sorry the server is down, please try again later'});
    console.log('server error', e);
  }
});

//add contacts endpoint: create
server.post('/addContacts', authenticateToken, async (req, res)=>{
  try{
    const { name, telf, email } = req.body;

    const existContact = await Contacts.findOne( {email: email} )

    if(!existContact){
      const newContact = Contacts.create( {} )
    }


  }catch(e){

  }
});



server.post('/registrer', async  (req, res) => {
  try{
    const { name, email, adress, password } = req.body;
    const isRegistrer = Users.findOne( {email: email} );

    if(isRegistrer){
      const passwordHashed = await bcrypt.hash(password, 10);
      if(passwordHashed){
        Users.create({
          name: name, 
          email: email,
          adress: adress, 
          password: passwordHashed
        });
        res.status(200).json({success: true, msj:'Corrrect registrer'})
      }else{
        res.status(500).json({success: false, msj:'error creating data, please try again'})
      }

    } else{
      res.status(400).json({success: false, msj: 'oops, error with the data entered'});
    };
  }catch(err) {
    res.status(500).json({success: true, msj: 'sorry the server is down, please try again later'});
    console.log('failed conection');
  }
});

server.post('/login', async (req, res)=>{
  try{
    const {  email, password } = req.body;
      const isLoged = await Users.findOne( {email: email} );
      console.log('lo que me tare de bbdd es: ', typeof(isLoged));

        if(!isLoged) {
          res.status(400).json({success: false, msj: 'User not found'});
        };

      const matchPassword = await bcrypt.compare(password, isLoged.password); //compare password

      if(matchPassword){ //passsword is ok?
        const infoToken = {
         email: isLoged.email,
         id: isLoged.id
        }
        const token = generateToken(infoToken);
        res.status(200).json({success: true, token: token});
        console.log('token: ', token);
      }else{
        res.status(400).json({success: false, msj: 'Incorrect password, please try again.'});
        console.log('password error');
      }
  }catch(e){
    res.status(500).json({success: true, msj: 'sorry the server is down, please try again later'});
    console.log('failed conection');
  }
});