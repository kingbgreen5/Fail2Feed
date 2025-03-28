import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthContext";



const Guns = () => {

    const [firearms, setFirearms] = useState(null);



    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [firearm, setFirearm] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [selectedFirearm, setSelectedFirearm] = useState(null);
    const [reports, setReports] = useState([]);
    const [firearmId, setFirearmId] = useState("");
    const [totalRoundsFired, setTotalRoundsFired] = useState(0);
    const [totalMalfunctions, setTotalMalfunctions] = useState(0);






    
// ----------------------------------------------------------GET ALL FIREARMS
useEffect(() => {
    axios.get(`${config.API_URL}/api/aggregate/all`)
        .then(response => {
            // setMakes(response.data);
            setFirearms(response.data); // Ensure firearms are updated with fetched data

        })
        .catch(error => console.error("Error fetching Firearm Aggregate Data:", error));
}, []); // Runs only once when the component mounts





   useEffect(() => {
    if (firearms !== null) {
        console.log(firearms); // Logs the updated firearms state when it's not null
    }
}, [firearms]); // This effect runs when firearms state changes





return (
<div>

<h1>
    Handgun Reliability Data
</h1>



<div>



{firearms && (   

<ul className="firearm-data-list">
      {firearms.map((item) => (

<div  className="firearm-data-li">  
    <li key={item.id}> 
        <h2>{item.Firearm?.make} {item.Firearm?.model}</h2>  
        <h4>Total Rounds Fired: {item.rounds_fired}</h4>  
        <h4>Malfunctions: {item.total_malfunctions}</h4> 
        <h4>Failure Rate: {item.failure_rate_percentage} %</h4>
    </li>
</div>

      ))}
    </ul>










)}

</div>

</div>
)};



export default Guns;
