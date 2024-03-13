import { useState } from "react";

function AddNewC() {

  /* click enviar */
  const handleClick = (event) =>{
    event.preventDefault();
    handleContacts();
  }

  const [dataContacts, setDataContacts] = useState([]);
  const handleContacts = () => {
    const persona = {
      name: newCotact.name,
      telf: newCotact.telf,
      email: newCotact.email,
    };
    setDataContacts([...dataContacts, persona]);
  };

  /* Add contacts */
  const [newCotact, setNewContact] = useState([]);
  const handleAddContacts = (key, value) => {
    setNewContact({ ...newCotact, [key]: value });
  };
  const handleAdd = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const value = event.target.value;
    handleAddContacts(id, value);
  };

  return (
    <form className="new-contact__form">
      <h2 className="new-contact__title">Añade un nuevo contacto</h2>
      <input
        className="new-contact__input"
        type="text"
        name="name"
        id="name"
        placeholder="Nombre"
        onChange={handleAdd}
      />
      <input
        className="new-contact__input"
        type="text"
        name="lastname"
        id="lastname"
        placeholder="Apellidos"
        onChange={handleAdd}
      />
      <input
        className="new-contact__input"
        type="phone"
        name="phone"
        id="phone"
        placeholder="Teléfono"
        onChange={handleAdd}
      />
      <input
        className="new-contact__input"
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={handleAdd}
      />
      <input
        className="new-contact__btn"
        type="submit"
        value="Añadir" onClick={handleClick}
      />
    </form>
  );
}

export default AddNewC;
