import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const FirearmMakeModelPicker = ({ onSelect }) => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    const [selectedFirearmID, setSelectedFirearmID] = useState("");

    // -------- Fetch Makes --------
    useEffect(() => {
        axios.get(`${config.API_URL}/api/firearms/makes`)
            .then(response => setMakes(response.data))
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    // -------- Fetch Models when Make changes --------
    useEffect(() => {
        if (selectedMake) {
            axios.get(`${config.API_URL}/api/firearms/models`, {
                params: { make: selectedMake }
            })
            .then(response => {
                setModels(response.data);
               console.log("Models fetched for make:", selectedMake, response.data);



                setSelectedModel(""); // reset model when make changes
            })
            .catch(error => {
                console.error("Error fetching models:", error);
                setModels([]);
            });
        } else {
            setModels([]);
            setSelectedModel("");
        }
    }, [selectedMake]);

    // -------- When Model Changes, Set Firearm ID --------
    useEffect(() => {
        if (selectedModel) {
            // assuming your model response contains id
            const firearm = models.find(m => m.model === selectedModel);
            if (firearm) {
                setSelectedFirearmID(firearm.id);

                // pass up to parent if needed
                if (onSelect) {
                    onSelect(firearm.id);
                }
            }
        }
    }, [selectedModel, models, onSelect]);

    return (
        <div className="firearm-picker">
            <h1>------------OR-----</h1>
            <h3>Select Firearm</h3>

            <div className="select-group">
                <label>Manufacturer:</label>
                <select
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                >
                    <option value="">Select Manufacturer</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>
                            {make}
                        </option>
                    ))}
                </select>
            </div>

            <div className="select-group">
                <label>Model:</label>
                <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    disabled={!selectedMake}
                >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.model}>
                            {model.model}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FirearmMakeModelPicker;