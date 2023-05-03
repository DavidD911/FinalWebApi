import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import LoadingPage from "../UI/LoadingPage";
import "../login/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // initialize to false
  const [error, setError] = useState(null); // initialize to null
  // const [userData, setUserData] = useState(null);

  const handleSubmitButton = async (event) => {
    event.preventDefault();
    setLoading(true);

    const data = { emailAddr: username, password: password };

    try {
      const response = await fetch(
          "https://limitless-ce6c.onrender.com/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
      );

      if (response.ok) {
        const data = await response.json(); // parse JSON response
        localStorage.setItem("userId", data.data.userId);
        localStorage.setItem("accessToken", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        console.log(data.data.userId, data.token, "User Data:", data.data);

        setIsLoggedIn(true);
      } else if (response.status === 401) {
        setError("Username or Password incorrect");
      } else {
        // handle unsuccessful login here
        const errorData = await response.json(); // extract error message from response
        console.log(errorData.message); // display error message in console
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate replace to="/Home" />;
  }

  return (
      <div>
        {loading ? (
            <LoadingPage />
        ) : (
            <div className="login-container">
              <form className="login-form" onSubmit={handleSubmitButton}>
                {error && <div className="login-error-message">{error}</div>}
                <h2 className="login-h2">Sign in</h2>
                <h5 className="login-h5">Find a class that fits your schedule!</h5>
                <section>
                  <input
                      placeholder="Email"
                      id="username"
                      type="text"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                      required
                      autoFocus
                      className="login-input"
                  ></input>
                </section>
                <section>
                  <input
                      placeholder="Password"
                      id="password"
                      type="password"
                      value={password}
                      required
                      onChange={(event) => setPassword(event.target.value)}
                      className="login-input"
                  ></input>
                </section>
                <button type="submit" className="login-button">
                  Sign in
                </button>
                <h5 className="login-h5">Don't have account?</h5>
                <Link className="login-signup" to="/register">
                  Sign Up
                </Link>
              </form>
            </div>
        )}
      </div>
  );
};

export default Login;