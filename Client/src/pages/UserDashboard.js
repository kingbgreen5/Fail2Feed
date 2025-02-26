import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserFirearmSelect from "../components/UserFirearmSelect";
import UserFirearmList from "../components/UserFirearmList";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    console.log("User data:", user);
    




    
//     const [reports, setReports] = useState([]);

//     useEffect(() => {
//         const fetchReports = async () => {
//             if (!user) return;

//             const response = await fetch("/api/reports/user", {
//                 headers: { Authorization: `Bearer ${user}` },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setReports(data);
//             } else {
//                 alert("Failed to fetch reports.");
//             }
//         };

//         fetchReports();
//     }, [user]);

    return (
        <div>
            {/* <h2>Your Range Reports</h2>
            {reports.length === 0 ? (
                <p>No reports submitted yet.</p>
            ) : (
                <ul>
                    {reports.map((report) => (
                        <li key={report.id}>
                            <strong>Date:</strong> {report.report_date} |  
                            <strong> Firearm ID:</strong> {report.firearm_id} |  
                            <strong> Rounds Fired:</strong> {report.rounds_fired}
                        </li>
                    ))}
                </ul>
            )} */}
<div>
    User Role: {user.role}
     </div>

     <div>
     User ID: {user.id}
     </div>


<UserFirearmSelect />
<UserFirearmList />


        </div>
    );
};

export default UserDashboard;
