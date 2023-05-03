import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../login/Login.css";
import LoadingPage from "../UI/LoadingPage";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://limitless-ce6c.onrender.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            firstName: firstName,
            lastName: lastName,
            emailAddr: email,
            position: "member",
          }),
        }
      );
      const data = await response.json(); // parse response body as JSON
      console.log(data);
      console.log(
        `FirstName: ${firstName}, LastName: ${lastName}, Email: ${email}, Password: ${password}`
      );
      if (response.ok) {
        setIsRegistered(true); // set a state variable to true to trigger the redirect
      } else {
        console.log("Error Registering! Try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading to false regardless of success or error
    }
  };

  if (isRegistered) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="login-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-h2">Register</h2>
            <h5 className="login-h5">
              Join us now & unleash your full potential.
            </h5>
            <section>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="login-input"
              />
            </section>
            <section>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="login-input"
                placeholder="Last Name"
              />
            </section>
            <section>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="Email"
              />
            </section>
            <section>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="Password"
              />
            </section>
            <button type="submit" className="login-button">
              Register
            </button>
            <h5 className="login-h5">Already have an account?</h5>
            <Link className="login-signup" to="/login">
              Login
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}
export default Register;
