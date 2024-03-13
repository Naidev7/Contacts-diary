function Contacts( { eachContact } ) {
  return (
    <li className="contact__item">

      <p className="contact__item__name">
        <label className="contact__label">
          <i className="fa-solid fa-user"></i> </label>{eachContact.name}
      </p>
      
      <p className="contact__item__phone">
        <label className="contact__label"><i className="fa-solid fa-phone"></i> </label>
        <a href="tel:603256289" title="Pulsa aquí para llamar a Lola">
          {eachContact.telf}
        </a>
      </p>

      <p className="contact__item__mail">
        <label className="contact__label"><i className="fa-solid fa-envelope"></i> </label>
        <a
          href="mailto:lmartinez@adalab.es"
          title="Pulsa aquí para escribir a Lola"
        >
         {eachContact.email}
        </a>
      </p>

    </li>
  );
}

export default Contacts;
