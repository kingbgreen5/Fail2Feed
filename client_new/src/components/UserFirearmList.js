import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const UserFirearmList = () => {
    const [firearms, setFirearms] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        
        const token = localStorage.getItem("token");
        axios.get(`${config.API_URL}/api/userFirearms`, { 
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then(response => setFirearms(response.data))
        .catch(error => console.error("Error fetching user firearms:", error));
        console.log(firearms)
    }, []);

    const handleRemoveFirearm = (firearmId) => {
        const token = localStorage.getItem("token");
        axios.delete(`${config.API_URL}/api/userFirearms/${firearmId}`, { 
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
            <h2>Your Firearms</h2>
            {message && <p>{message}</p>}

            {firearms.length === 0 ? (
  <p>No firearms added to your profile.</p>
) : (
  <div className="firearm-list">
    {firearms.map((firearm) => (
      <div key={firearm.id} className="firearm-tile">
        <div className="firearm-info">
          <p className="firearm-make">{firearm.Firearm.make}</p>
          <p className="firearm-model">{firearm.Firearm.model}</p>
        </div>
        <button
          className="remove-button"
          onClick={() => handleRemoveFirearm(firearm.id)}
        >
          Remove
        </button>
      </div>
    ))}
  </div>
)}

        </div>
    );
};

export default UserFirearmList;
