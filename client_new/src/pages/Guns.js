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







<div className="firearm-data-container">
  {firearms && firearms.map((item) => (
    <div key={item.id} className="firearm-card">
      <h2>{item.Firearm?.make} {item.Firearm?.model}</h2>
{/*       
      <h3>Failure Rate:</h3>
      <h2 className="failure-rate">{item.failure_rate_percentage} %</h2>
 */}

      <h4>
        <span className="failure-rate-label">Failure Rate: </span> 
        <span className="failure-rate-value">{item.failure_rate_percentage} % </span>

        <div>   
            
        <div>Malfunctions</div>
        <div>   Firing: {item.firing_total}  </div>
        <div>   Unlocking:   </div>
        <div>   Extracting:   </div>
        <div>   Ejecting:   </div>
        <div>   Cocking:   </div>
        <div>   Feeding:   </div>
        <div>   Chambering:   </div>
        <div>   Locking:   </div>
        <div>   Magazine:   </div>
        <div>   Ammunition:   </div>
        <div>   Other:   </div>
        <div>   Catastrophic: </div>

        </div>

      </h4>

      {/* <h4>Total Rounds Fired: {item.rounds_fired}</h4>
      <h4>Malfunctions: {item.total_malfunctions}</h4> */}

    </div>
  ))}
</div>



</div>
)};



export default Guns;
