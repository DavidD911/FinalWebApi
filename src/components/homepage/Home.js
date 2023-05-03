import React, { useState, useEffect } from "react";
import Header from "../UI/header";
import Footer from "../UI/footer";
import headerPhoto from "../images/mma.png"
import { ClassCard } from "../UI/ClassCard";
import { ScheduledCard } from "../UI/ClassCard";
import './Home.css'
import GymClassModal from "../viewClass/ViewClass";
/*
Data contains the json payload received from the server. JSON object has the following:
message: Some random message
data: All of the classes in the database in an array
status: status code
*/


const Home = () => {

    const [data, setData] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    useEffect(() => {
        fetch("https://limitless-ce6c.onrender.com/class")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error));

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleResize = () => {
        const image = document.querySelector(".image");
        if (image) {
            const { naturalWidth, naturalHeight } = new Image();
            naturalWidth.src = headerPhoto;
            naturalHeight.src = headerPhoto;
            const aspectRatio = naturalWidth / naturalHeight;
            const width = image.offsetWidth;
            const height = width / aspectRatio;
            image.style.height = `${height}px`;
        }
    };

    if (!data) {
      return <div>Loading...</div>
    }
    const realData = data.data


    const handleClassClick = (gymClass) => {
      setSelectedClass(gymClass);
    };

    return (
        <div className="page-container">
            <Header />
            <div className="div1">
                <div
                    className="image"
                    style={{ backgroundImage: `url(${headerPhoto})` }}
                ></div>
            </div>
            <div className="classes">
                <div className="userclass">
                    <h2 className="title">Current Classes</h2>
                    <hr></hr>
                    <div style={{paddingTop: "10px"}}>
                        <ClassCard />
                    </div>
                    <div className="">
                        <ClassCard />
                    </div>
                </div>
                <div className="upcomingclass">
                    <h4 className="title2">Scheduled Classes</h4>
                    <hr></hr>
                    <div>
                        <div >
                            {realData.map((classObj, index) => (
                                <div onClick={() => handleClassClick(classObj)} key={index} >
                                    <ScheduledCard classObj={classObj} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="socials">
                    <h4 className="title2">Socials</h4>
                    <hr></hr>
                </div>
                {selectedClass && (
                    <GymClassModal
                        gymClass={selectedClass}
                        onClose={() => setSelectedClass(null)}
                    />
                )}
            </div>
            <Footer />
        </div>

    );
}

export default Home;