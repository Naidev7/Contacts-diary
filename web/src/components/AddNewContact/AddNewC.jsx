import { useEffect, useState } from "react";

function AddNewC({ saveToken }) {
  /* click enviar */
  const handleClick = (event) => {
    event.preventDefault();
    handleContacts();
  };

  const [dataContacts, setDataContacts] = useState({});
  const handleContacts = () => {
    const persona = {
      name: newCotact.name,
      telf: newCotact.telf,
      email: newCotact.email,
    };
    setDataContacts(persona);
  };

  /* fetch send data */
  const [isAdded, setIsAdded] = useState();
  useEffect(() => {
    try {
      const sendContact = async () => {
        const response = await fetch("http://localhost:3000/addContacts", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + saveToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataContacts),
        });
        const data = await response.json();
        console.log(data);

        if (data.success) {
          setIsAdded("Añadido con exito");
        }
      };

      sendContact();
    } catch (error) {
      console.log("error en el fetch", error);
    }
  }, [dataContacts, saveToken]);

  /* Add contacts */
  const [newCotact, setNewContact] = useState({});
  const handleAddContacts = (key, value) => {
    setNewContact({ ...newCotact, [key]: value });
  };
  const handleAdd = (event) => {
    event.preventDefault();
    const id = event.target.id;
    const value = event.target.value;
    handleAddContacts(id, value);
  };
  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="new-contact">
      <h2 className="new-contact__title">Add new contact</h2>
      <form onSubmit={handleForm} className="new-contact__form">
        <input
          className="new-contact__form__input"
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          onChange={handleAdd}
        />
        <input
          className="new-contact__form__input"
          type="telf"
          name="telf"
          id="telf"
          placeholder="Phone"
          required
          onChange={handleAdd}
        />
        <input
          className="new-contact__form__input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
          onChange={handleAdd}
        />
        <input
          className="new-contact__form__btn"
          type="submit"
          value="Add"
          onClick={handleClick}
        />
        {isAdded}
      </form>
      </div>
  );
}

export default AddNewC;
