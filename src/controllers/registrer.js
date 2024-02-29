//Import and start connection
const dbConnect = require('../../config/connection');
dbConnect();

//import collection
const Users = require('../../models/users');

const registrer = async (req, res)=>{
    try{
        const { name, email, adress, password } = req.body;
        const isRegistrer = Users.findOne( {email: email} );
    
        if(isRegistrer){
          const passwordHashed = await bcrypt.hash(password, 10);
          console.log(passwordHashed)
          console.log(name)
          console.log(email)
          console.log(adress)
    
          if(passwordHashed){
            Users.create({
              name: name, 
              email: email,
              adress: adress, 
              password: passwordHashed
            });
            res.status(200).json({success: true, msj:'oops, error with the data entered'});
          }else{
            res.status(500).json({success: false, msj:'error creating data, please try again'});
            console.log('error de datos')
          }
    
        } else{
          res.status(400).json({success: false, msj: 'oops, error with the data entered'});
          console.log('error en el registro')
        };
      }catch(err) {
        res.status(500).json({success: true, msj: 'sorry the server is down, please try again later'});
        console.log('error en el servidor', err)
      };   
};
module.exports = registrer;