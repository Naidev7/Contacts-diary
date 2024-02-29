

function Filter({SetFiltered}) {
  return (
    <form>
    <input
      className="header__search"
      autoComplete="off"
      type="search"
      name="search"
      placeholder="Filtrar contactos por nombre"
    onChange={(ev)=> SetFiltered(ev.target.value)}/>
  </form>

  )
}

export default Filter