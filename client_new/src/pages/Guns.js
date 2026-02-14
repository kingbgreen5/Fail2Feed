
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { useNavigate } from "react-router-dom";

const Guns = () => {
    const [firearms, setFirearms] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        axios.get(`${config.API_URL}/api/aggregate/all`)
            .then(response => {
                setFirearms(response.data);
                console.log(response.data)
            })
            .catch(error => console.error("Error fetching Firearm Aggregate Data:", error));
    }, []);

    return (
        <div>
            <h1>Handgun Reliability Data</h1>
    
            <div className="firearm-data-container">
                {firearms && firearms.map((item) => (
                    <div 
                        key={item.firearm_id} 
                        className="firearm-card"
                        onClick={() => navigate(`/firearm/${item.firearm_id}`)} // Navigate to detail page
                        style={{ cursor: "pointer" }}
                    >
                        <h2>{item.Firearm?.make} {item.Firearm?.model}</h2>
                        <h4>
                            <span className="failure-label">Failure Rate: </span> 
                            <span className="failure-percent">{item.failure_rate_percentage} % </span>
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Guns;
