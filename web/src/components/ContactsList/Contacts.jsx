import { useEffect } from "react";

function Contacts( { eachContact, saveToken } ) {

/*   const handleDelete = ()=>{
    
    try {
      
        useEffect(()=>{
          const updateContact = async ()=>{
          const response = await fetch("http://localhost:3000/addContacts", {
            method: "POST",
            headers: {
              Authorization: "Bearer " + saveToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataContacts),
          });
        }
        updateContact();
      }, [])

    } catch (error) {
      console.error(error)
    }
  } */


  return (
    <li className="contact__item">

    <div className="infoCont" >
    <p className="contact__item__name">
        <label className="contact__label">
          <i className="fa-solid fa-user"></i> </label>
          {eachContact.name}
      </p>
      
      <p >
        <label className="contact__label"><i className="fa-solid fa-phone"></i> </label>
        <a className="contact__item__phone" href="tel:603256289" title="Pulsa aquí para llamar a Lola">
          {eachContact.telf}
        </a>
      </p>

      <p >
        <label className="contact__label"><i className="fa-solid fa-envelope"></i> </label>
        <a className="contact__item__phone"
          href="mailto:lmartinez@adalab.es"
          title="Pulsa aquí para escribir a Lola"
        >
         {eachContact.email}
        </a>
      </p>
    </div>

     <div className="buttonsContainer">
     <button  className="cardBtn c1">
      <i className="fa-solid fa-x cardIcon "></i>
      </button>

      <button className="cardBtn  c2">
      <i className="fa-solid fa-pen-to-square cardIcon"></i>
      </button>
     </div>


    </li>
  );
}

export default Contacts;
