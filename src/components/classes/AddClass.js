import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import "../classes/AddClass.css";
import LoadingPage from "../UI/LoadingPage";
import Header from "../UI/header";

function AddClass() {
  const [dateOfClass, setDateOfClass] = useState("");
  const [timeOfClass, setTimeOfClass] = useState("");
  const [trainerName, setTrainerName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [typeOfClass, setTypeOfClass] = useState("");
  const [location, setLocation] = useState("");
  const [isClassAdded, setIsClassAdded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "https://limitless-ce6c.onrender.com/class",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
          body: JSON.stringify({
            dateOfClass: dateOfClass,
            timeOfClass: timeOfClass,
            trainerName: trainerName,
            capacity: parseInt(capacity),
            typeOfClass: typeOfClass,
            location: location,
          }),
        }
      );
      const data = await response.json(); // parse response body as JSON
      console.log(data);
      if (response.ok) {
        setIsClassAdded(true); // set a state variable to true to trigger the redirect
      } else {
        console.log("Error adding class! Try again.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // set loading to false regardless of success or error
    }
  };

  if (isClassAdded) {
    return <Navigate replace to="/profile" />;
  }

  return (
    <div>
      <Header />,
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="addclass-container">
          <form onSubmit={handleSubmit} className="addclass-form">
            <h2 className="addclass-h2">
              Create a New Class<p></p>
            </h2>
            <section>
              <input
                type="date"
                required
                value={dateOfClass}
                onChange={(e) => setDateOfClass(e.target.value)}
                placeholder="Date of Class"
                className="addclass-input"
              />
            </section>
            <section>
              <input
                type="time"
                required
                value={timeOfClass}
                onChange={(e) => setTimeOfClass(e.target.value)}
                className="addclass-input"
                placeholder="Time of Class"
              />
            </section>
            <section>
              <input
                type="text"
                required
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                className="addclass-input"
                placeholder="Trainer Name"
              />
            </section>
            <section>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="addclass-input"
                placeholder="Capacity"
              />
            </section>
            <section>
              <input
                type="text"
                required
                value={typeOfClass}
                onChange={(e) => setTypeOfClass(e.target.value)}
                className="addclass-input"
                placeholder="Type of Class"
              />
            </section>
            <section>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="addclass-input"
                placeholder="Location"
              />
            </section>
            <button type="submit" className="addclass-button">
              Add Class
            </button>
            <h5 className="addclass-h5">Want to go back?</h5>
            <Link className="addclass-back" to="/Home">
              Go Back
            </Link>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddClass;
