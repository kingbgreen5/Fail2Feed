import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const BarChartComponent = ({ data, title }) => {
    if (!data || data.length === 0) return <p>No data available</p>;

    return (
        <div className="malfunction-chart-container">
            <h2>{title}</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} layout="vertical">
                    <XAxis type="number" domain={[0, 100]} stroke="#8884d8" />
                    <YAxis type="category" dataKey="name" width={100} stroke="#8884d8" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={20} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;
