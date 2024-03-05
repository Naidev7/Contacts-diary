import { Link } from "react-router-dom";
import callToApi from "../../services/dataApi";
import { Navigate } from "react-router-dom";
import { useState } from "react";

function Registrer({ handleUsers, handleAddUser, registrer }) {
  const [goToLogin, setGoLogin] = useState(false);

  if (goToLogin) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviado");
    handleUsers();

    callToApi(registrer).then((data) => {
      console.log("success? ", data.success);
      if (data.success) {
        setGoLogin(true);
      } else {
        return null;
      }
    });
  };
  const handleRegistrer = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    handleAddUser(id, value);
  };

  return (
    <section className="container">
    <article className="hero">
        <img src="../../public/signupImg.png" alt="#" />
    </article>
      <article className="register">
        <h1 className="register__title">Register</h1>
        <p className="register__subtitle">Please fill in this form to create acount</p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="name">
            <input className="form__input"
              type="text"
              id="name"
              placeholder="Enter your name"
              required
              onChange={handleRegistrer}
            />
          </label>
          <label htmlFor="email">
            <input className="form__input"
              type="text"
              placeholder="Enter your email"
              id="email"
              required
              onChange={handleRegistrer}
            />
          </label>
          <label htmlFor="adress">
            <input className="form__input"
              type="text"
              id="adress"
              placeholder="Enter yor adress"
              onChange={handleRegistrer}
            />
          </label>
          <label htmlFor="password">
            <input className="form__input"
              type="text"
              id="password"
              placeholder="Create a password"
              required
              onChange={handleRegistrer}
            />
          </label>
          <button className="form__btn">Register</button>
        </form>
        <div>
          <h3 className="textToLogin">
            Already have an account? <Link className="link" to="/login">Login</Link>
          </h3>
        </div>
      </article>
    </section>
  );
}

export default Registrer;
