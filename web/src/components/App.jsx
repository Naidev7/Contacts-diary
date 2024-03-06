import "../styles/_App.scss";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import ContactsList from "../components/ContactsList/ContactList";
import data from "../services/data.json";
import AddNewC from "../components/AddNewContact/AddNewC";
import Registrer from "../components/Registrer/Registrer";
import Login from "../components/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../components/Landing"

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

  /* Login users */
  const [saveToken, setSaveToken] = useState();
  const [isLogin, setIsLogin] = useState({});
  const handleLogin = (key, value) => {
    setIsLogin({ ...isLogin, [key]: value });
  };

  return (
    <div className="">
      <Navigation />

      <Routes>
        <Route index element={<Landing/>} />

        <Route
          path="/register"
          element={
            <Registrer
              handleUsers={handleUsers}
              handleAddUser={handleAddUser}
              registrer={registrer}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              handleLogin={handleLogin}
              setSaveToken={setSaveToken}
              isLogin={isLogin}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute saveToken={saveToken}>
              {/* component extra verifica y da acceso */}

              <ContactsList
                searchContacts={searchContacts}
                SetFiltered={SetFiltered}
              />

            </ProtectedRoute>
          }
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

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing </Link>
        </li>

        <li>
          <Link to="/register">Register </Link>
        </li>

        <li>
          <Link to="/login">Login </Link>
        </li>

        <li>
          <Link to="/dashboard">Dashboard </Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
