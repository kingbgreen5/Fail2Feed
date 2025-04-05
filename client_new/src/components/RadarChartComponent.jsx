// import React from "react";
// import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';


// const RadarChartComponent = ({ data, title }) => {
//     if (!data || data.length === 0) return <p>No data available</p>;

// return (
//     <ResponsiveContainer width="100%" height="100%">
//          <h2>{title}</h2>
//       <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//         <PolarGrid />
//         <PolarAngleAxis dataKey="name" />
//         <PolarRadiusAxis />
//         <Radar name="Mike" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//       </RadarChart>
//     </ResponsiveContainer>
//   );

// };


// export default RadarChartComponent;




import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const RadarChartComponent = ({ data, title }) => {
    if (!data || data.length === 0) return <p>No data available</p>;

    return (
        <div style={{ width: "100%", height: "400px" }}> {/* Set explicit height */}
            <h2>{title}</h2>

            <ResponsiveContainer width="100%" height="100%">
             
            <RadarChart cx="50%" cy="50%" outerRadius={150} data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} axisLine={false} tick={false} tickCount={1} />
                    <Radar name="Malfunctions" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RadarChartComponent;
