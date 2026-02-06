

//THIS IS AGGREGATED DATA FOR A SPECIFIC FIREARM

import config from "../config";
import MalfunctionChartComponent from "../components/BarChartComponent";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

import BarChartComponent from "../components/BarChartComponent";
import RadarChartComponent from "../components/RadarChartComponent";


// FIREARM is in thise use case is what is coming back from the AGGREGATE table. SO firearm.id will give you the id of the item in the table, whereas firearm.firearm_id will give you the consistent id of the firearm in the firearms table
const FirearmDetail = () => {
    const { id } = useParams(); // Get firearm ID from URL
    const [firearm, setFirearm] = useState(null);

    useEffect(() => {
        axios.get(`${config.API_URL}/api/aggregate/${id}`)
            .then(response => {
                setFirearm(response.data);
                console.log(response.data)
            })
            .catch(error => console.error("Error fetching firearm details:", error));
    }, [id]);



    const chartData = firearm
    ? [
        { name: "Firing", value: firearm.firing_percent },
        { name: "Unlocking", value: firearm.unlocking_percent },
        { name: "Extracting", value: firearm.extracting_percent },
        { name: "Ejecting", value: firearm.ejecting_percent },
        { name: "Cocking", value: firearm.cocking_percent },
        { name: "Feeding", value: firearm.feeding_percent },
        { name: "Chambering", value: firearm.chambering_percent },
        { name: "Locking", value: firearm.locking_percent},
        { name: "Magazine", value: firearm.magazine_percent },
        { name: "Ammunition", value: firearm.ammunition_percent },
        { name: "Other", value: firearm.other_percent },
    ].filter(data => data.value !== null && data.value !== undefined)
    : []; // If firearm is null, return an empty array



    

    const radarChartData = firearm
    ? [
        { name: "Firing", value: 100 - firearm.firing_percent},
        { name: "Unlocking", value:  100 -firearm.unlocking_percent },
        { name: "Extracting", value:  100 -firearm.extracting_percent },
        { name: "Ejecting", value:  100 -firearm.ejecting_percent },
        { name: "Cocking", value:  100 -firearm.cocking_percent },
        { name: "Feeding", value:  100 -firearm.feeding_percent },
        { name: "Chambering", value:  100 -firearm.chambering_percent },
        { name: "Locking", value:  100-firearm.locking_percent},
        { name: "Magazine", value: 100- firearm.magazine_percent },
        // { name: "Ammunition", value:  100 - firearm.ammunition_percent },
        { name: "Other", value:  100 - firearm.other_percent },
    ].filter(data => data.value !== null && data.value !== undefined)
    : []; // If firearm is null, return an empty array




    if (!firearm) return <p>Loading firearm data...</p>;
//--------------------------------------------------------------------RETURN STATEMENT-----------------------------------------------------------------------------
    return (
        <div className="firearm-detail">
            <h2>{firearm.Firearm.make} {firearm.Firearm.model}</h2>
            
<div><span className="failure-label">Database Firearm ID: </span> <span className="failure-label">{firearm.firearm_id}  </span></div>

            <h3>
                <span >Total Failure Rate per round fired: </span> 
                <span className="failure-percent">{firearm.failure_rate_percentage} % </span>
            </h3>

            <p>Rounds Fired: {firearm.rounds_fired}</p>
            <p>Total Malfunctions: {firearm.total_malfunctions}</p>

<div className="malfunction-span-breakdown"> 
                          <h2>Malfunction Breakdown</h2>
                          <h4> Of {firearm.total_malfunctions} total malfunctions</h4>
    <hr />
                            <div><span className="failure-label">Firing: </span> <span className="failure-percent">{firearm.firing_total}  </span></div>
                            <div><span className="failure-label">Unlocking: </span> <span className="failure-percent">{firearm.unlocking_total}  </span></div>
                            <div><span className="failure-label">Extracting: </span> <span className="failure-percent">{firearm.extracting_total}  </span></div>
                             <div><span className="failure-label">Ejecting: </span> <span className="failure-percent">{firearm.ejecting_total}  </span></div>
                             <div><span className="failure-label">Cocking: </span> <span className="failure-percent">{firearm.cocking_total}  </span></div>
                             <div><span className="failure-label">Feeding: </span> <span className="failure-percent">{firearm.feeding_total}  </span></div>
                             <div><span className="failure-label">Chambering: </span> <span className="failure-percent">{firearm.chambering_total}  </span></div>
                             <div><span className="failure-label">Locking: </span> <span className="failure-percent">{firearm.locking_total}  </span></div>
                             <div><span className="failure-label">Magazine: </span> <span className="failure-percent">{firearm.magazine_total}  </span></div>
                             <div><span className="failure-label">Ammunition: </span> <span className="failure-percent">{firearm.ammunition_total}  </span></div>
                             <div><span className="failure-label">Other: </span> <span className="failure-percent">{firearm.other_total}  </span></div>
                            </div>


{/* <div className="malfunction-chart-container"> 
    <h2> % of all Malfunctions</h2>
{firearm && chartData.length > 0 && (
    
    <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} stroke="#8884d8" />
            <YAxis type="category" dataKey="name" width={100} stroke="#8884d8" />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" barSize={20} />
        </BarChart>
    </ResponsiveContainer>
)}
<h4> </h4>
</div> */}
<BarChartComponent data={chartData} title="% of All Malfunctions" />
<RadarChartComponent data={radarChartData} title="Stat Profile" />




        </div>
    );
};

export default FirearmDetail;

