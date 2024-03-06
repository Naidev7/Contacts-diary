
import loginData from "../../services/login";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login( { handleLogin, setSaveToken, isLogin } ) {

  const [goToHome, setGoToHome] = useState(false);

  if(goToHome){
    return <Navigate to="/getContacts" />;
  }

  const handleSendData = (e)=>{
      e.preventDefault();
      try {
        loginData(isLogin).then( (data) => {
          console.log('isLoged correct? ', data);
          setSaveToken(data.token);

          if(data.success){
            setGoToHome(true);
          }

        })
      } catch (error) {
        console.log('error: ', error);
      }
  }

  const handleValueToLogin = (e)=>{
    const value = e.target.value;
    const id = e.target.id;
    handleLogin(id, value);
  }



  return (

   <section className="container">
      <article className="hero">
        <img src="../../public/singinImg.png" alt="#" />
    </article>

    <article className="register login">
    <h1 className="register__title">Sign In</h1>

    <form className="form" onSubmit={handleSendData}>

    <label htmlFor="email">
      <input type="text" id="email" onChange={handleValueToLogin} placeholder="Enter your email" className="form__input" />
    </label>

    <label htmlFor="password">
      <input type="text" id="password" onChange={handleValueToLogin} placeholder="Enter your password" className="form__input form__pass" />
      <button>
    <i className="fa-solid fa-eye-slash form__icon"></i>
    </button>
    </label>

    <button className="form__btn">
      sign in
    </button>
    </form>
 
    <div>
      <h5 className="textToLogin" >Dont't have an account? <Link className="link" to="/"> Register </Link> </h5>
    </div>
    </article>
   </section>
  )
}

export default Login