
import config from "../config";
import MalfunctionChartComponent from "../components/MalfunctionChart";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";



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
        { name: "Locking", value: firearm.locking_percent },
        { name: "Magazine", value: firearm.magazine_percent },
        { name: "Ammunition", value: firearm.ammunition_percent },
        { name: "Other", value: firearm.other_percent },
    ].filter(data => data.value !== null && data.value !== undefined)
    : []; // If firearm is null, return an empty array





    if (!firearm) return <p>Loading firearm data...</p>;

    return (
        <div className="firearm-detail">
            <h2>{firearm.Firearm.make} {firearm.Firearm.model}</h2>

            <h3>
                <span className="failure-label">Total Failure Rate per round fired: </span> 
                <span className="failure-percent">{firearm.failure_rate_percentage} % </span>
            </h3>

            <p>Rounds Fired: {firearm.rounds_fired}</p>
            <p>Total Malfunctions: {firearm.total_malfunctions}</p>

<div>
                          <h2>Malfunction Breakdown</h2>
    <hr />
                            <div><span className="failure-label">Firing: </span> <span className="failure-percent">{firearm.firing_percent} % </span></div>
                            <div><span className="failure-label">Unlocking: </span> <span className="failure-percent">{firearm.unlocking_percent} % </span></div>
                            <div><span className="failure-label">Extracting: </span> <span className="failure-percent">{firearm.extracting_percent} % </span></div>
                            <div><span className="failure-label">Ejecting: </span> <span className="failure-percent">{firearm.ejecting_percent} % </span></div>
                             <div><span className="failure-label">Cocking: </span> <span className="failure-percent">{firearm.cocking_percent} % </span></div>
                             <div><span className="failure-label">Feeding: </span> <span className="failure-percent">{firearm.feeding_percent} % </span></div>
                             <div><span className="failure-label">Chambering: </span> <span className="failure-percent">{firearm.chambering_percent} % </span></div>
                             <div><span className="failure-label">Locking: </span> <span className="failure-percent">{firearm.locking_percent} % </span></div>
                             <div><span className="failure-label">Magazine: </span> <span className="failure-percent">{firearm.magazine_percent} % </span></div>
                             <div><span className="failure-label">Ammunition: </span> <span className="failure-percent">{firearm.ammunition_percent} % </span></div>
                             <div><span className="failure-label">Other: </span> <span className="failure-percent">{firearm.other_percent} % </span></div>
                            </div>


<div className="malfunction-chart-container"> 
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

</div>


        </div>
    );
};

export default FirearmDetail;
