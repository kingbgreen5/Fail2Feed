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
            <h1>Firearm Collection </h1>
            {message && <p>{message}</p>}

            {firearms.length === 0 ? (
  <p>No firearms added to your profile.</p>
) : (
  <div className="firearm-list">
    {firearms.map((firearm) => (
      <div key={firearm.id} className="firearm-tile">
        <div className="firearm-info">
          <h3 className="firearm-tile-title">{firearm.Firearm.make} {firearm.Firearm.model}</h3>
          {/* <h2 className="firearm-tile-title">{firearm.Firearm.model}</h2> */}



          {/* -------------------------------------------MAKE MODS DISPLAY ON HOVER???? */}
<div></div>
            <div className="firearm-tile-mods"> 
          <h3 className="firearm-tile-mods">---- Modifications ----</h3>
          <p className="firearm-tile-mods">{firearm.slide_mod === 1 ? "Slide" : ""}</p>
          <p className="firearm-tile-mods">{firearm.barrel_mod === 1 ? "Barrel" : ""}</p>
          <p className="firearm-tile-mods">{firearm.recoilSpring_mod === 1 ? "Recoil Spring" : ""}</p>
          <p className="firearm-tile-mods">{firearm.extractor_mod === 1 ? "Extractor" : ""}</p>
          <p className="firearm-tile-mods">{firearm.triggerGroup_mod === 1 ? "Trigger Group" : ""}</p>
          <p className="firearm-tile-mods">{firearm.hammer_mod === 1 ? "Hammer" : ""}</p>
          <p className="firearm-tile-mods">{firearm.firingPinStriker_mod === 1 ? "Firing Pin/Striker" : ""}</p>
          </div>
          <p className="firearm-tile-debug"> Internal ID: {firearm.Firearm.id}</p>
          <p className="firearm-tile-debug"> userFirearm ID: {firearm.id} </p>
          <br></br>


        </div>
        <button
          className="userFirearm remove-button"
          onClick={() => handleRemoveFirearm(firearm.id)}
        >
          Delete
        </button>
      </div>
    ))}
  </div>
)}
<hr></hr>
        </div>
    );
};

export default UserFirearmList;
