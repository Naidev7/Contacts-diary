import Contacts from "./Contacts";

function ContactList({ searchContacts }) {
  return (
    <ul className="contact__list">
      {searchContacts.map((contact, i) => (
        <Contacts key={i} searchContacts={contact}/>
        
        ))}
    </ul>
  );
}

export default ContactList;
