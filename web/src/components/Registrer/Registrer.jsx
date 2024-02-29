

function Registrer( {handleUsers, handleAddUser} ) {

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log('enviado');
        handleUsers();
    };

    const handleRegistrer = (e)=>{
        const id = e.target.id;
        const value = e.target.value;
        handleAddUser(id, value);
    }

  return (
    <section>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name"> Introduce tu nombre
            <input type="text" id="name" placeholder="Maria Lopez" required onChange={handleRegistrer}/>
            </label>
            <label htmlFor="email">Introduce tu email
            <input type="text" placeholder="maria@gmail.com" id="email" required onChange={handleRegistrer}/>
            </label>
            <label htmlFor="adress">Introduce tu dirección
            <input type="text" id="adress"  placeholder="C/ Adolfo Dominguez" onChange={handleRegistrer}/>
            </label>
            <label htmlFor="password">Introduce una contraseña
            <input type="text" id="password" required onChange={handleRegistrer}/>
            </label>
            <button>
                Comenzar
            </button>
        </form>
    </section>
  )
}

export default Registrer