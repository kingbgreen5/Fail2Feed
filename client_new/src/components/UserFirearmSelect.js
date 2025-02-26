import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const UserFirearmSelect = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        axios.get(`${config.API_URL}/api/firearms/makes`)
            .then(response => {
                console.log("Makes response:", response.data);
                setMakes(response.data);
            })
            .catch(error => {
                console.error("Error fetching makes:", error);
                setError("Failed to load manufacturers. Please try again.");
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (selectedMake) {
            setLoading(true);
            setError("");
            axios.get(`${config.API_URL}/api/firearms/models`, {
                params: { make: selectedMake }
            })
            .then(response => {
                console.log("Models response:", response.data);
                setModels(response.data);
            })
            .catch(error => {
                console.error("Error fetching models:", error);
                setError("Failed to load models. Please try again.");
                setModels([]);
            })
            .finally(() => setLoading(false));
        } else {
            setModels([]);
        }
    }, [selectedMake]);

    const handleConfirmSelection = () => {
        if (!selectedMake || !selectedModel) {
            setError("Please select both manufacturer and model");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        const token = localStorage.getItem("token");
        axios.post(
            `${config.API_URL}/api/userFirearms/add`,
            { make: selectedMake, model: selectedModel },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(response => {
            setMessage(response.data.message || "Firearm added to your profile!");
            // Clear selections
            setSelectedMake("");
            setSelectedModel("");
        })
        .catch(error => {
            console.error("Error adding firearm:", error);
            setError(error.response?.data?.message || "Error adding firearm. Please try again.");
        })
        .finally(() => setLoading(false));
    };

    return (
        <div className="firearm-select">
            <h2>Select Firearm</h2>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <div className="select-group">
                <label>Manufacturer:</label>
                <select 
                    value={selectedMake} 
                    onChange={(e) => setSelectedMake(e.target.value)}
                    disabled={loading}
                >
                    <option value="">Select Manufacturer</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>

            <div className="select-group">
                <label>Model:</label>
                <select 
                    value={selectedModel} 
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake || loading}
                >
                    <option value="">Select Model</option>
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>
            </div>

            <button 
                onClick={handleConfirmSelection} 
                disabled={!selectedMake || !selectedModel || loading}
                className="confirm-button"
            >
                {loading ? "Adding..." : "Confirm Selection"}
            </button>
        </div>
    );
};

export default UserFirearmSelect;
