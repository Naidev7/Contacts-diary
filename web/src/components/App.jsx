import "../styles/_App.scss";
import { Route, Routes } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import ContactsList from "../components/ContactsList/ContactList";
import data from "../services/data.json";
import { useState } from "react";
import AddNewC from "../components/AddNewContact/AddNewC";
import Registrer from "../components/Registrer/Registrer";
import Login from "../components/Login/Login";


function App() {

  /* Filter contacts */
  const [dataContacts, setDataContacts] = useState(data);
  const [filterd, SetFiltered] = useState("");
  const searchContacts = dataContacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filterd.toLowerCase());
  });

  /* Add contacts */
  const [newCotact, setNewContact] = useState([]);
  const handleAddContacts = (key, value) => {
    setNewContact({ ...newCotact, [key]: value });
  };
  const handleContacts = () => {
    const persona = {
      name: newCotact.name,
      lastname: newCotact.lastname,
      phone: newCotact.phone,
      email: newCotact.email,
    };
    setDataContacts([...dataContacts, persona]);
  };

  /* Registrer users */
  const [registrer, setRegistrer] = useState({});
  const [newUser, setNewUser] = useState([]);

  const handleAddUser = (key, value) => {
    setNewUser({ ...newUser, [key]: value });
  };
  const handleUsers = () => {
    const user = {
      name: newUser.name,
      email: newUser.email,
      adress: newUser.adress,
      password: newUser.password,
    };
    setRegistrer(user);
  };


  return (
    <div className="">

      <Routes>

        <Route path="/" element={ <Registrer
              handleUsers={handleUsers}
              handleAddUser={handleAddUser}
              registrer={registrer}
            />}/>

        <Route path="/login" element={<Login/>}/>

        <Route path="/filter" element={<Filter SetFiltered={SetFiltered} />} />

        <Route
          path="/contacts"
          element={<ContactsList searchContacts={searchContacts} />}
        />

        <Route
          path="/addContact"
          element={
            <AddNewC
              handleAddContacts={handleAddContacts}
              handleContacts={handleContacts}
            />
          }
        />

      </Routes>
    </div>
  );
}

export default App;
