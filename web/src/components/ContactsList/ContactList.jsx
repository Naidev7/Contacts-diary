
import Contacts from "./Contacts";


function ContactList({ searchContacts, setFiltered }) {

  return (
    <section className="section">

      <header className="header">
      </header>
      <section className="profile">
          <img className="profile__img" src="/public/profilePicture.avif" alt="#" />
        </section>

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

      <ul className="container">
        {searchContacts.map((contact, i) => (
          <Contacts key={i} searchContacts={contact} />
        ))}
      </ul>

    </section>
  );
}

export default ContactList;
