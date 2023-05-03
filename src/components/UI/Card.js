import React from "react";
import "./Card.css";

const Card = ({ title, content, backgroundColor, width, height }) => {
  const cardStyle = {
    backgroundColor,
    width,
    height,
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Card;
