

function AddNewC({handleAddContacts, handleContacts}) {

  const handleClick = (event)=>{
    event.preventDefault();
    handleContacts();
  }

  const handleAdd = (ev)=>{
    const id = ev.target.id;
    const value = ev.target.value;
    handleAddContacts(id, value)
  }

  return (
    <form className="new-contact__form">
    <h2 className="new-contact__title">Añade un nuevo contacto</h2>
    <input
      className="new-contact__input"
      type="text"
      name="name"
      id="name"
      placeholder="Nombre"
    onChange={handleAdd}/>
    <input
      className="new-contact__input"
      type="text"
      name="lastname"
      id="lastname"
      placeholder="Apellidos"
      onChange={handleAdd}/>
    <input
      className="new-contact__input"
      type="phone"
      name="phone"
      id="phone"
      placeholder="Teléfono"
      onChange={handleAdd}/>
    <input
      className="new-contact__input"
      type="email"
      name="email"
      id="email"
      placeholder="Email"
      onChange={handleAdd} />
    <input className="new-contact__btn" type="submit" value="Añadir" onClick={handleClick}/>
  </form>
  )
}

export default AddNewC