import "../styles/_App.scss";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";

import ContactsList from "../components/ContactsList/ContactList";
import Registrer from "../components/Registrer/Registrer";
import Login from "../components/Login/Login";
import ProtectedRoute from "../components/ProtectedRoute";
import Landing from "../components/Landing"

function App() {

  let locationPath = useLocation();
  const { pathname } = locationPath;


  /* Filter contacts */

/*   const [filterd, SetFiltered] = useState("");
  const searchContacts = dataContacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filterd.toLowerCase());
  });
 */


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

      { pathname !== '/dashboard' ? <Navigation /> : null }
      
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
            
              <ContactsList saveToken={saveToken}
                
              />

            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function Navigation() {
  const [ isOpen, setIsOpen ] = useState(false)
  const handleMenu = ()=>{

    if(isOpen){
      setIsOpen(false)
    } else (
      setIsOpen(true)
    )

   
  }

  return (
    <nav className="navHeader">

      <i className="fa-solid fa-bars menuIcon" onMouseEnter={handleMenu}></i>
      
      <ul className={`ulMenu ${isOpen === false ? 'hidden' : null} `}>
        <li className="liMenu">
          <Link to="/" className="menuLinks">Landing </Link>
        </li>

        <li className="liMenu">
          <Link to="/register" className="menuLinks">Register </Link>
        </li>

        <li className="liMenu">
          <Link to="/login" className="menuLinks">Login </Link>
        </li>

        <li className="liMenu">
          <Link to="/dashboard" className="menuLinks">Dashboard </Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
