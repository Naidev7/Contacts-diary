
import Contacts from "./Contacts";
import getContacts from "../../services/getContacts";
import { useEffect, useState } from "react";
import AddNewC from "../AddNewContact/AddNewC";


function ContactList( {saveToken} ) {

  const [dataContacts, setDataContacts] = useState([])

  useEffect(()=>{
    const getData = ()=>{
      getContacts(saveToken).then((data)=>{
        console.log('data contacts: ', data.data)
        setDataContacts(data.data)
      })
    }
    getData()
  }, [])

  return (
    <section className="section">

      <header className="header">
      </header>

      <form className="section__form">
      <h1 className="section__form__title">My contacts</h1>
        <input
          className="section__form__input"
          autoComplete="off"
          type="search"
          name="search"
          placeholder="Filtrar contactos por nombre"
          onChange={(ev) => setFiltered(ev.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass section__form__icon"></i>
      </form>

      {<AddNewC/>}

      <ul className="containerContacts">
        {dataContacts.map((eachContact)=>{
         return <Contacts key={eachContact.id} eachContact={eachContact} />
        })}
      </ul>

    </section>
  );
}

export default ContactList;
