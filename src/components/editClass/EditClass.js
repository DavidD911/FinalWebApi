import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../UI/header";
import "./EditClass.css";

const EditClass = () => {
  const [classes, setClasses] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch("https://limitless-ce6c.onrender.com/class")
      .then((response) => response.json())
      .then((data) => setClasses(data))
      .catch((error) => console.error(error));
  }, []);

  if (!classes) {
    return <div>Loading...</div>;
  }

  const handleEdit = (classObj) => {
    console.log(classObj);
  };
  const handleDelete = (id) => {
    axios
      .delete(`https://limitless-ce6c.onrender.com/class/${id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then((response) => {
        setClasses((prevState) => ({
          data: prevState.data.filter((classObj) => classObj._id !== id),
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header />
      <table>
        <thead>
          <tr>
            <th>Trainer Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {classes.data.map((classObj) => (
            <tr key={classObj._id}>
              <td>{classObj.trainerName}</td>
              <td>{classObj.dateOfClass}</td>
              <td>{classObj.timeOfClass}</td>
              <td>
                <button onClick={() => handleEdit(classObj)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(classObj._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default EditClass;
