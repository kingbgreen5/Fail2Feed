import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            if (!user) return;

            const response = await fetch("/api/reports/user", {
                headers: { Authorization: `Bearer ${user}` },
            });

            if (response.ok) {
                const data = await response.json();
                setReports(data);
            } else {
                alert("Failed to fetch reports.");
            }
        };

        fetchReports();
    }, [user]);

    return (
        <div>
            <h2>Your Range Reports</h2>
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
            )}
        </div>
    );
};

export default Dashboard;
