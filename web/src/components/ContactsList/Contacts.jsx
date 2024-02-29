function Contacts({ searchContacts }) {
  return (
    <li className="contact__item">
      <p className="contact__name">
        <label className="contact__label">Nombre:</label>{searchContacts.name + " " + searchContacts.lastname}
      </p>
      <p className="contact__phone">
        <label className="contact__label">Teléfono:</label>
        <a href="tel:603256289" title="Pulsa aquí para llamar a Lola">
          {searchContacts.phone}
        </a>
      </p>
      <p className="contact__mail">
        <label className="contact__label">Email:</label>
        <a
          href="mailto:lmartinez@adalab.es"
          title="Pulsa aquí para escribir a Lola"
        >
         {searchContacts.email}
        </a>
      </p>
    </li>
  );
}

export default Contacts;
