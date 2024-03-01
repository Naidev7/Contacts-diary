import "../styles/_App.scss";
import { Route, Routes } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import ContactsList from "../components/ContactsList/ContactList";
import data from "../services/data.json";
import { useEffect, useState } from "react";
import AddNewC from "../components/AddNewContact/AddNewC";
import Registrer from "../components/Registrer/Registrer";

function App() {
  const [dataContacts, setDataContacts] = useState(data);
  const [filterd, SetFiltered] = useState('');
  const [newCotact, setNewContact] = useState([]);
  const [registrer, setRegistrer] = useState({});
  const [newUser, setNewUser] = useState([]);
  


const handleAddContacts = (key, value)=>{
  setNewContact({...newCotact, [key]: value})
}

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
  setNewUser({...newUser, [key]: value });
};

const handleUsers = ()=>{
  const user = {
    name: newUser.name,
    email: newUser.email,
    adress: newUser.adress,
    password: newUser.password
  };
  setRegistrer(user)
};

  const searchContacts = dataContacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(filterd.toLowerCase())
  })

  return (
    <div>
      <h2>Mi agenda de contactos</h2>
      <Routes>
        <Route path="/" element={ <Registrer handleUsers={handleUsers} handleAddUser={handleAddUser} registrer={registrer} />}  />
        <Route path="/filter" element={<Filter SetFiltered={SetFiltered} />} />
        <Route path="/contacts" element={ <ContactsList searchContacts={searchContacts} />} />
        <Route path="/addContact" element={<AddNewC handleAddContacts={handleAddContacts} handleContacts={handleContacts} />} />
      </Routes>
    </div>
  );
}

export default App;
