
//-----------THIS COMPONENT SHOWS THE LIST OF FIREARMS ADDED TO THE USER'S PROFILE AND ALLOWS REMOVAL OF FIREARMS FROM THE PROFILE----------------//



import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const UserFirearmList = () => {
    const [firearms, setFirearms] = useState([]);
    const [userFirearms, setUserFirearms] = useState([]);
    const [message, setMessage] = useState("");



    //---------------------------------------------------------GET USER FIREARMS
    useEffect(() => {
      // console.log(firearms)
        const token = localStorage.getItem("token");
        // console.log("Token from local storage",token)
        axios.get(`${config.API_URL}/api/userFirearms`, { 
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then(response => setFirearms(response.data))
        .catch(error => console.error("Error fetching user firearms:", error));
        console.log(firearms)
        
    }, [console.log(firearms)]);


//---------------------------------------------------------------REMOVE FIREARM
    const handleRemoveFirearm = (firearmId) => {
        const token = localStorage.getItem("token");
        axios.delete(`${config.API_URL}/api/userFirearms/remove/${firearmId}`, { 
            headers: { Authorization: `Bearer ${token}` } 
        })
      
        .then(() => {
            setFirearms(firearms.filter(firearm => firearm.id !== firearmId));
            setMessage("Firearm removed successfully.");
            
        })
        .catch(error => setMessage("Error removing firearm."));
    };












return (
  <div>
    <h1>Firearm Collection</h1>
    <h4>(add to collection to add to range report and quick access to firearm detail page)</h4>
    {message && <p>{message}</p>}

    {firearms.length === 0 ? (
      <p>No firearms added to your profile.</p>
    ) : (
      <div className="firearm-list">
        {firearms.map((firearm) =>
          firearm.Firearm ? ( // ✅ only render if Firearm exists
            <div key={firearm.id} className="firearm-tile">
              <div className="firearm-info">
                <h3 className="firearm-tile-title">
                  {firearm.Firearm?.make} {firearm.Firearm?.model}
                </h3>

                <div className="firearm-tile-mod-container">
                  <h4 className="firearm-tile-mod-title">-Modifications-</h4>
                  <p className="firearm-tile-mods">{firearm.slide_mod === true ? "Slide" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.barrel_mod === true ? "Barrel" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.recoilSpring_mod === true ? "Recoil Spring" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.extractor_mod === true ? "Extractor" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.triggerGroup_mod === true ? "Trigger Group" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.hammer_mod === true ? "Hammer" : ""}</p>
                  <p className="firearm-tile-mods">{firearm.firingPinStriker_mod === true ? "Firing Pin/Striker" : ""}</p>
                </div>

                <br />
              </div>
              <button
                className="userFirearm remove-button"
                onClick={() => handleRemoveFirearm(firearm.id)}
              >
                Delete
              </button>
            </div>
          ) : null // ✅ skip null Firearm rows
        )}
      </div>
    )}
    <hr />
  </div>
)};













export default UserFirearmList;
