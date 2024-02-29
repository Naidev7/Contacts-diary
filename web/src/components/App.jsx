import "../styles/_App.scss";
import { Route, Routes } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import ContactsList from "../components/ContactsList/ContactList";
import data from "../services/data.json";
import { useState } from "react";
import AddNewC from "../components/AddNewContact/AddNewC";
import Registrer from "../components/Registrer/Registrer";

function App() {
  const [dataContacts, setDataContacts] = useState(data);
  const [filterd, SetFiltered] = useState('');
  const [newCotact, setNewContact] = useState([]);
  const [registrer, setRegistrer] = useState([]);
  const [newUser, setNewUser] = useState([])

//Función que se encarga de ir añadiendo el valor que introduce la usuaria. el key representa el id va cogiendo los id y mete el valor dentro de ese id.
const handleAddContacts = (key, value)=>{
  setNewContact({...newCotact, [key]: value})
}
//Encargada de crear la estructura del objeto y modificar la variable principal para añadir a ese array el nuevo objeto, esta funciona pork se invoca en el click del botón y añade el valor de newContact la cual esta llena de lo que usuaria introduce.
const handleContacts = ()=>{
  const persona = {
    name: newCotact.name,
    lastname: newCotact.lastname,
    phone: newCotact.phone,
    email: newCotact.email
  }
  setDataContacts([...dataContacts, persona])
};

const handleAddUser = (key, value) => {
  setNewUser({...newUser, [key]: value })
};

const handleUsers = ()=>{
  const user = {
    name: newUser.name,
    email: newUser.email,
    adress: newUser.adress,
    password: newUser.password
  };
  setRegistrer([...registrer, user])
}

  const searchContacts = dataContacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(filterd.toLowerCase())
  })

  return (
    <div>
      <h2>Mi agenda de contactos</h2>
      <Routes>
        <Route path="/" element={ <Registrer handleUsers={handleUsers} handleAddUser={handleAddUser} />}  />
        <Route path="/filter" element={<Filter SetFiltered={SetFiltered} />} />
        <Route path="/contacts" element={ <ContactsList searchContacts={searchContacts} />} />
        <Route path="/addContact" element={<AddNewC handleAddContacts={handleAddContacts} handleContacts={handleContacts} />} />
      </Routes>
    </div>
  );
}

export default App;
