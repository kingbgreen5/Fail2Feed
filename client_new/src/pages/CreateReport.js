import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateReport = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/firearms/makes")
            .then(response => setMakes(response.data))
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    useEffect(() => {
        if (selectedMake) {
            axios.get(`http://localhost:5000/api/firearms/models?make=${selectedMake}`)
                .then(response => {
                    setModels(response.data || []);
                })
                .catch(error => {
                    console.error("Error fetching models:", error);
                    setModels([]);
                });
        } else {
            setModels([]);
        }
    }, [selectedMake]);

    return (
        <form>
            <h2>Create Range Report</h2>
            <h3>Select Firearm</h3>
            <div> 
                <label>Manufacturer: </label>
                <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                    <option value="">Select Make</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>
            <div> 
                <label>Model: </label>
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
            </div>
            <div>
                <h2>FIREARM: {selectedMake} {selectedModel}</h2>
            </div>

            <button type="submit">Submit Report</button>
        </form>
    );
};

export default CreateReport;
