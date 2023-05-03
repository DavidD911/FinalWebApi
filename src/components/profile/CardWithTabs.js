import React, { useState, useEffect } from "react";
import "./CardWithTabs.css";
import axios from "axios";

function CardWithTabs() {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken")
  const [selectedTab, setSelectedTab] = useState("user-info");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [bio, setBio] = useState("");

  async function updateProfile(data) {
    try {
      const response = await axios.put(
          `https://limitless-ce6c.onrender.com/user/${userId}`,
          data,
          {
            headers: {
              Authorization: accessToken,
            },
          }
      );
      return response.data;
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    if (userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setEmail(userInfo.emailAddr || "");
      setHomeAddress(userInfo.homeAddress || "");
      setBio(userInfo.bio || "");
      setConfirmPassword("");
      setPassword("");
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const updatedData = {
      firstName,
      lastName,
      emailAddr: email,
      homeAddress,
      bio,
    };

    try {
      const response = await updateProfile(updatedData);
      // Update the user object in localStorage with the new data
      localStorage.setItem("user", JSON.stringify({...userInfo, ...updatedData}));
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  }
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="card-with-tabs">
      <div className="tabs">
        <div
          className={`tab ${selectedTab === "user-info" ? "active" : ""}`}
          onClick={() => handleTabClick("user-info")}
        >
          User Info
        </div>
        <div
          className={`tab ${selectedTab === "memberships" ? "active" : ""}`}
          onClick={() => handleTabClick("memberships")}
        >
          Memberships
        </div>
      </div>
      {selectedTab === "user-info" ? (

        <div className="user-info-tab">
          <h1>Edit your profile</h1>
          <form className="profile-form" onSubmit={handleSubmit}>

            <div className="row">

              <div className="col">

                <label htmlFor="first-name">First Name</label>
                <input
                  type="text"
                  id="first-name"
                  name="first-name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="last-name">Last Name</label>
                <input
                  type="text"
                  id="last-name"
                  name="last-name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="col">
                <label htmlFor="home-address">Home Address</label>
                <input
                  type="text"
                  id="home-address"
                  name="home-address"
                  value={homeAddress}
                  onChange={(event) => setHomeAddress(event.target.value)}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="bio">Bio</label>
                <textarea
                  type="text"
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </div>
            </div>
            <div className="row">
                <button className="btnClass" type="submit">Update Profile</button>

            </div>
          </form>
        </div>
      ) : (
        <div className="memberships-tab">
          No Memberships Available yet! Check back soon
        </div>
      )}
    </div>
  );
}

export default CardWithTabs;
