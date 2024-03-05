import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  return (
   <section className="container">
      <article className="hero">
        <img src="../../public/singinImg.png" alt="#" />
    </article>

    <article className="register login">
    <h1 className="register__title">Sign In</h1>

    <form className="form">

    <label htmlFor="email">
      <input type="text" id="email" placeholder="Enter your email" className="form__input" />
    </label>

    <label htmlFor="password">
      <input type="text" id="password" placeholder="Enter your password" className="form__input form__pass" />
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