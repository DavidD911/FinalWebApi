import React from "react";
import "./LoadingPage.css";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import headerPhoto from "../images/mma.png"
import "./ScheduledCard.css";


function ScheduledCard() {
    const classType = "scheduledClass";

    if (classType == "scheduledClass") {
      return (
        <Card className="card" onClick={"hi"}>
          <Card.Img className="img" src={headerPhoto}/>
          <Card.ImgOverlay>
            <Card.Title>Title</Card.Title>
            <Card.Subtitle>Class 1</Card.Subtitle>
          </Card.ImgOverlay>
        </Card>
      )
    }
    if (classType == "upcomingClass") {

    }
  }

export default ScheduledCard;
