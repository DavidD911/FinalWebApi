import React, { useState, useEffect } from "react";
import "./LoadingPage.css";
import { Card, Button, Modal } from 'react-bootstrap';
import headerPhoto from "../images/mma.jpg"
import "./ClassCard.css";


export const ClassCard = () => {
  const className = "MMA";
  const classTime = "January 1st, 2023";
  const classSpots = "7/10"
  const classCoach = "Mark"
    return (
        <div className="card2" onClick={() => createModal()}>
            <img className="img" src={headerPhoto} alt="header" />
            <p className="a2 uclassname">{className}</p>
            <p className="a2 udate">{classTime}</p>
            <p className="a2 uspots">{classSpots}</p>
        </div>
    );
};

function createModal() {
  <div>
    <div>
      <h3>Modal</h3>
      <p>Modal content</p>
      <button className="btn" id="close">Close</button>
    </div>
  </div>
};

// async function getData() {
//   const response = await fetch("https://limitless-ce6c.onrender.com/class");
//   const data = await response.json();
//   // const classes = JSON.parse(data);
//   // console.log(data.data);
//   if (data && typeof data === 'object') {
//     Object.values(data).forEach(gymClass => {
//       Object.values(gymClass).forEach(singleClass => {
//         <ScheduledCard singleClass={singleClass} />
//         console.log(singleClass);
//       })
//     })
//   }
// }

export const ScheduledCard = ({classObj}) => {

  var { attendants, capacity, dateOfClass, timeOfClass, trainerName, typeOfClass } = classObj;
  if (attendants == 0) {
    attendants = 0;
  }

    return (
        <div className="card2">
            <img className="img2" src={headerPhoto} alt="header" />
            <p className="a1 schclassname">{typeOfClass}</p>
            <p className="a1 schcoach">{trainerName}</p>
            <p className="a1 schdate">{dateOfClass + " @ " + timeOfClass}</p>
            <p className="a1 schspots">{attendants + " / " + capacity}</p>
        </div>
    );
}