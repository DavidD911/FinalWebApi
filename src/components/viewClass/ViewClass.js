import React, { useState } from "react";
import axios from "axios";
import "./ViewClass.css";

const GymClassModal = ({ gymClass, onClose }) => {
  const [registeredUsers, setRegisteredUsers] = useState(
    gymClass.registeredUsers || []
  );
  const accessToken = localStorage.getItem("accessToken");

  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const registerForClass = async () => {
    try {
      const response = await axios.post(
        `https://limitless-ce6c.onrender.com/class/${gymClass._id}/register`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      setRegisteredUsers([...registeredUsers, response.data.user]);
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };


  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{gymClass.name}</h2>
              {/* <button className="close-button" onClick={closeModal}>
                &times;
              </button> */}
            </div>
            <div className="modal-content">
              <p>{gymClass.description}</p>
              <p>Location: {gymClass.location}</p>
              <p>Time: {gymClass.time}</p>
              <p>Price: {gymClass.price}</p>
              <h3>Registered Users:</h3>
              <ul>
                {registeredUsers.map((user) => (
                  <li key={user._id}>{user.name}</li>
                ))}
              </ul>
              {!isRegistered && (
                <button onClick={registerForClass}>Register</button>
              )}
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GymClassModal;
