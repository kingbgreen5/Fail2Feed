import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const FirearmDetail = () => {
    const { id } = useParams(); // Get firearm ID from URL
    const [firearm, setFirearm] = useState(null);

    useEffect(() => {
        axios.get(`${config.API_URL}/api/aggregate/${id}`)
            .then(response => {
                setFirearm(response.data);
            })
            .catch(error => console.error("Error fetching firearm details:", error));
    }, [id]);

    if (!firearm) return <p>Loading firearm details...</p>;

    const chartData = [
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
    ].filter(data => data.value !== null && data.value !== undefined);

    return (

  
        <div>
            <h1>{firearm.Firearm?.make} {firearm.Firearm?.model} - Detailed Breakdown</h1>
            <h3>Failure Rate: {firearm.failure_rate_percentage} %</h3>

            <h2>Malfunction Breakdown</h2>
            {firearm.feeding_percent}

            
            {/* <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" width={100} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={20} />
                </BarChart>
            </ResponsiveContainer> */}



        </div>




    // <div className="firearm-detail">
    //     <h2>{firearm.make} {firearm.model}</h2>
    //     <p>Rounds Fired: {firearm.rounds_fired}</p>
    //     <p>Total Malfunctions: {firearm.total_malfunctions}</p>

    //     {/* Ensure the container is rendered before ResponsiveContainer */}
    //     <div style={{ width: "100%", height: 300 }}>
    //         {firearm && (
    //             <ResponsiveContainer width="100%" height="100%">
    //                 <BarChart data={firearm.malfunctions}>
    //                     <XAxis dataKey="type" />
    //                     <YAxis />
    //                     <Tooltip />
    //                     <Bar dataKey="count" fill="#8884d8" />
    //                 </BarChart>
    //             </ResponsiveContainer>
    //         )}
    //     </div>
    // </div>






);
};

export default FirearmDetail;
