//dependency imports
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const swaggerUI = require('swagger-ui-express');
const swaggerConfig  = require('./swagger.json');



// Start server
const server = express();

//config swagger
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

// Config server
server.use(cors());
server.use(express.json({ limit: "25mb" }));

//config port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Ya se ha arrancado nuestro servidor: http://localhost:${port}/`);
});

//Import and start connection
const dbConnect = require("../config/connection");
dbConnect();

//model imports
const Contacts = require("../models/contacts");
const Users = require("../models/users");

//JWT functions
const generateToken = (data) => {
  const token = jwt.sign(data, "secreto", { expiresIn: "1h" });
  return token;
};
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "secreto");
    return decoded;
  } catch (err) {
    console.log("token malo: ", err);
    return null;
  }
};

//middleware
const authenticateToken = (req, res, next) => {
  const tokenBarrer = req.headers["authorization"];
  console.log(tokenBarrer);

  const token = tokenBarrer.split(" ")[1]; //separate token, eliminate barrer and save token

  if (!token) {
    return res.status(401).json({ error: "token not provided" });
  }

  console.log(token);
  const decoded = verifyToken(token);

  if (!decoded) {
    console.log(decoded);
    return res.status(401).json({ error: "invalid token" });
  }

  req.user = decoded;
  next();
};

//import functions endpoints

//all contacts endpoint: read
server.get("/getContacts", authenticateToken, async (req, res) => {
  try {
    const contactsList = await Contacts.find();

    if (!contactsList) {
      // exist contacts?
      res
        .status(500)
        .json({ success: false, msj: "Not contacts found" })
        .redirect("/addContacts");
      console.log("not existing contacts");
    }

    res.status(200).json({ success: true, data: contactsList });
  } catch (e) {
    res
      .status(500)
      .json({
        success: false,
        msj: "sorry the server is down, please try again later",
      });
    console.log("server error", e);
  }
});

//add contacts endpoint: create
server.post("/addContacts", authenticateToken, async (req, res) => {
  try {
    const { name, telf, email } = req.body;
    console.log(name, telf, email);

    const existContact = await Contacts.findOne({ email: email });

    if (!existContact) {
      const newContact = Contacts.create({
        name: name,
        telf: telf,
        email: email,
      });

      res.status(200).json({ success: true, msj: "Added correctly" });
      console.log("added correctly");
    } else {
      res
        .status(400)
        .json({ success: false, msj: "oops, error with the data entered" });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        success: true,
        msj: "sorry the server is down, please try again later",
      });
    console.log("failed conection");
  }
});

//filter endpoint by order name
server.get("/sortContacts", authenticateToken, async (req, res) => {
  try {
    const sortedContacts = await Contacts.find()
      .sort({ name: 1 })
      .collation({ locale: "en", caseLevel: true }); //sort: order => collection: specify collection => local: language => casLevel: Mayus/minus

    if (sortedContacts) {
      res.status(200).json({ success: true, data: sortedContacts });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        success: true,
        msj: "sorry the server is down, please try again later",
      });
    console.log("failed conection");
  }
});

//Update endpoint
server.put("/updateContacts", authenticateToken, async (req, res) => {
  try {
    const { email, newName, newTelf, newEmail } = req.body;

      const updateContacts = await Contacts.findOneAndUpdate(
        {email: email}, 
        {
          $set:{
            name: newName,
            telf: newTelf,
            email: newEmail,
          }
      },
      {new: true}
      );
      
      if(updateContacts){
        res
        .status(200)
        .json({ success: true, msj: "Correct update", data: updateContacts });

        console.log('update correct', updateContacts);
      } else{
        res
        .status(400)
        .json({success: false, msj: 'Failed update, please verify credentials'});
        console.log('error update')
      }

  } catch (error) {
    res
      .status(500)
      .json({
        success: true,
        msj: "sorry the server is down, please try again later",
      });
    console.log("failed conection");
  }
});

//Delete endpoint
server.post('/deleteContact', authenticateToken, async (req, res)=>{
  try {
    const { email } = req.body;

    const deleteContacts = await Contacts.deleteOne( {email: email} );

    if(deleteContacts){
      res.status(200).json({success: true, msj: 'Correct delate'})
    }else{
      res.status(400).json({success: false, msj: 'Failed delate'})
    }
    
  } catch (error) {
    console.log('faied detale')
    res
    .status(400)
    .json({success: false, msj:'Failed delete'});
  };

})

server.post("/registrer", async (req, res) => {
  try {
    const { name, email, adress, password } = req.body;
    const isRegistrer = Users.findOne({ email: email });

    if (isRegistrer) {
      const passwordHashed = await bcrypt.hash(password, 10);
      if (passwordHashed) {
        Users.create({
          name: name,
          email: email,
          adress: adress,
          password: passwordHashed,
        });
        res.status(200).json({ success: true, msj: "Corrrect registrer" });
      } else {
        res
          .status(500)
          .json({
            success: false,
            msj: "error creating data, please try again",
          });
      }
    } else {
      res
        .status(400)
        .json({ success: false, msj: "oops, error with the data entered" });
    }
  } catch (err) {
    res
      .status(500)
      .json({
        success: true,
        msj: "sorry the server is down, please try again later",
      });
    console.log("failed conection");
  }
});

server.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isLoged = await Users.findOne({ email: email });
    console.log("lo que me tare de bbdd es: ", typeof isLoged);

    if (!isLoged) {
      res.status(400).json({ success: false, msj: "User not found" });
    }

    const matchPassword = await bcrypt.compare(password, isLoged.password); //compare password

    if (matchPassword) {
      //passsword is ok?
      const infoToken = {
        email: isLoged.email,
        id: isLoged.id,
      };
      const token = generateToken(infoToken);
      res.status(200).json({ success: true, token: token });
      console.log("token: ", token);
    } else {
      res
        .status(400)
        .json({ success: false, msj: "Incorrect password, please try again." });
      console.log("password error");
    }
  } catch (e) {
    res
      .status(500)
      .json({
        success: true,
        msj: "sorry the server is down, please try again later",
      });
    console.log("failed conection");
  }
});
