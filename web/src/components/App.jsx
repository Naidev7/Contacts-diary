import "../styles/_App.scss";
import { Route, Routes } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import ContactsList from "../components/ContactsList/ContactList";
import data from "../services/data.json";
import { useState } from "react";
import AddNewC from "../components/AddNewContact/AddNewC";

function App() {
  const [dataContacts, setDataContacts] = useState(data);
  const [filterd, SetFiltered] = useState('');
  const [newCotact, setNewContact] = useState([]);

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
}

  const searchContacts = dataContacts.filter((contact)=>{
    return contact.name.toLowerCase().includes(filterd.toLowerCase())
  })

  return (
    <div>
      <h2>Mi agenda de contactos</h2>
      <Filter SetFiltered={SetFiltered} />
      <ContactsList searchContacts={searchContacts} />
      <AddNewC handleAddContacts={handleAddContacts} handleContacts={handleContacts} />
    </div>
  );
}

export default App;
