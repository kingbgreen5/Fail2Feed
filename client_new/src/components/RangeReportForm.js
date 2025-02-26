import { useState } from "react";

const RangeReportForm = () => {
    const [formData, setFormData] = useState({
        firearm_id: "",
        report_date: "",
        temperature: "",
        rounds_fired: "",
        ammunition_used: "",
        malfunctions: {
            failure_to_feed: 0,
            failure_to_eject: 0,
            double_feed: 0,
            hangfire: 0,
            light_primer_strike: 0,
            ammunition_malfunction: 0,
        },
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleMalfunctionChange = (e) => {
        setFormData({
            ...formData,
            malfunctions: {
                ...formData.malfunctions,
                [e.target.name]: Number(e.target.value),
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/reports/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert("Range report submitted successfully.");
        } else {
            alert("Failed to submit range report.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>New Range Report</h2>
            
            <label>Firearm ID:</label>
            <input type="text" name="firearm_id" onChange={handleChange} required />

            <label>Report Date:</label>
            <input type="date" name="report_date" onChange={handleChange} required />

            <label>Temperature (°F):</label>
            <input type="number" name="temperature" onChange={handleChange} required />

            <label>Rounds Fired:</label>
            <input type="number" name="rounds_fired" onChange={handleChange} required />

            <label>Ammunition Used:</label>
            <input type="text" name="ammunition_used" onChange={handleChange} required />

            <h3>Malfunctions</h3>
            <label>Failure to Feed:</label>
            <input type="number" name="failure_to_feed" min="0" onChange={handleMalfunctionChange} />

            <label>Failure to Eject:</label>
            <input type="number" name="failure_to_eject" min="0" onChange={handleMalfunctionChange} />

            <label>Double Feed:</label>
            <input type="number" name="double_feed" min="0" onChange={handleMalfunctionChange} />

            <label>Hangfire:</label>
            <input type="number" name="hangfire" min="0" onChange={handleMalfunctionChange} />

            <label>Light Primer Strike:</label>
            <input type="number" name="light_primer_strike" min="0" onChange={handleMalfunctionChange} />

            <label>Ammunition Malfunction:</label>
            <input type="number" name="ammunition_malfunction" min="0" onChange={handleMalfunctionChange} />

            <button type="submit">Submit Report</button>
        </form>
    );
};

export default RangeReportForm;
