// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config";


// const Guns = () => {
//     const [firearms, setFirearms] = useState(null);
//     const [expandedCard, setExpandedCard] = useState(null); // Track which card is expanded

//     // Fetch firearms data
//     useEffect(() => {
//         axios.get(`${config.API_URL}/api/aggregate/all`)
//             .then(response => {
//                 setFirearms(response.data);
//                 console.log(response.data)
//             })
//             .catch(error => console.error("Error fetching Firearm Aggregate Data:", error));
//     }, []);

//     // Toggle malfunction breakdown visibility
//     const toggleCard = (id) => {
//         setExpandedCard(expandedCard === id ? null : id);
//     };

//     return (
//         <div>
//             <h1>Handgun Reliability Data</h1>

//             <div className="firearm-data-container">
//                 {firearms && firearms.map((item) => (
//                     <div 
//                         key={item.id} 
//                         className="firearm-card"
//                         onClick={() => toggleCard(item.id)} // Toggle visibility on click
//                         style={{ cursor: "pointer" }} // Indicate clickability
//                     >
//                         <h2>{item.Firearm?.make} {item.Firearm?.model}</h2>

//                         <h4>
//                             <span className="failure-label">Failure Rate: </span> 
//                             <span className="failure-percent">{item.failure_rate_percentage} % </span>
//                         </h4>

//                         {/* Collapsible malfunction breakdown */}
//                         <div 
//                             className="malfunction-breakdown"
//                             style={{
//                                 maxHeight: expandedCard === item.id ? "500px" : "0px",
//                                 overflow: "hidden",
//                                 transition: "max-height 0.3s ease-in-out"
//                             }}
//                         >
//                             <br />
//                             <div>Malfunction Breakdown</div>
//                             <hr />
//                             <div><span className="failure-label">Firing: </span> <span className="failure-percent">{item.firing_percent} % </span></div>
//                             <div><span className="failure-label">Unlocking: </span> <span className="failure-percent">{item.unlocking_percent} % </span></div>
//                             <div><span className="failure-label">Extracting: </span> <span className="failure-percent">{item.extracting_percent} % </span></div>
//                             <div><span className="failure-label">Ejecting: </span> <span className="failure-percent">{item.ejecting_percent} % </span></div>
//                             <div><span className="failure-label">Cocking: </span> <span className="failure-percent">{item.cocking_percent} % </span></div>
//                             <div><span className="failure-label">Feeding: </span> <span className="failure-percent">{item.feeding_percent} % </span></div>
//                             <div><span className="failure-label">Chambering: </span> <span className="failure-percent">{item.chambering_percent} % </span></div>
//                             <div><span className="failure-label">Locking: </span> <span className="failure-percent">{item.locking_percent} % </span></div>
//                             <div><span className="failure-label">Magazine: </span> <span className="failure-percent">{item.magazine_percent} % </span></div>
//                             <div><span className="failure-label">Ammunition: </span> <span className="failure-percent">{item.ammunition_percent} % </span></div>
//                             <div><span className="failure-label">Other: </span> <span className="failure-percent">{item.other_percent} % </span></div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Guns;



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
