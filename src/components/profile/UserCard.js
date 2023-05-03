import React from "react";
import "./UserCard.css";
import defaultImg from "../images/default.jpg";
import {useNavigate} from "react-router-dom";
import handleLogout from "../UI/header.js";

const UserCard = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    try {
        if (!user || !user.createdAt) {
            throw new TypeError("User's createdAt property is null or undefined");
        }

        const date = new Date(user.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        const imageSource = user.image ? user.image : defaultImg;

        // console.log(user);
        return (
            <div className="UserCard-card">
                <h5 className="UserCard-card-title">
                    {user.firstName} {user.lastName}
                </h5>
                <img src={imageSource} alt="user" className="UserCard-img" />
                <div className="UserCard-card-body">
                    <button className="btn btn-primary">Change Picture</button>
                    <p className="UserCard-card-text">Joined on: {formattedDate}</p>

                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        handleLogout();
        navigate("/home");
        return null;
    }
};

export default UserCard;