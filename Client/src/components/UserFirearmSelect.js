import React, { useState, useEffect } from "react";
import axios from "axios";

const UserFirearmSelect = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [message, setMessage] = useState("");

    // Fetch Makes
    useEffect(() => {
        axios.get("http://localhost:5000/api/firearms/makes")
            .then(response => setMakes(response.data))
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    // Fetch Models when Make is selected
    useEffect(() => {
        if (selectedMake) {
            axios.get(`http://localhost:5000/api/firearms/models?make=${selectedMake}`)
                .then(response => setModels(response.data || []))
                .catch(error => {
                    console.error("Error fetching models:", error);
                    setModels([]);
                });
        } else {
            setModels([]);
        }
    }, [selectedMake]);

    // Function to confirm firearm selection
    const handleConfirmSelection = () => {
        if (!selectedMake || !selectedModel) return;

        const token = localStorage.getItem("token"); // Assuming user authentication
        axios.post("http://localhost:3000/api/userFirearms/add", 
            { make: selectedMake, model: selectedModel }, 
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => setMessage("Firearm added to your profile!"))
        .catch(error => setMessage("Error adding firearm. Try again."));
    };

    return (
        <div>
            <h2>Select Firearm</h2>

            {/* Manufacturer Dropdown */}
            <label>Manufacturer:</label>
            <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                <option value="">Select Make</option>
                {makes.map((make, index) => (
                    <option key={index} value={make}>{make}</option>
                ))}
            </select>

            {/* Model Dropdown */}
            <label>Model:</label>
            <select 
                value={selectedModel} 
                onChange={(e) => setSelectedModel(e.target.value)} 
                disabled={!selectedMake || models.length === 0}
            >
                <option value="">{models.length === 0 ? "No models available" : "Select Model"}</option>
                {models.map((model, index) => (
                    <option key={index} value={model}>{model}</option>
                ))}
            </select>

            {/* Confirm Selection Button */}
            {selectedMake && selectedModel && (
                <button onClick={handleConfirmSelection}>Confirm Selection</button>
            )}

            {/* Message Display */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default UserFirearmSelect;
