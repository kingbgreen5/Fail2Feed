import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const FirearmSelectorWithMods = ({ onSelect }) => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);

    const [selectedMake, setSelectedMake] = useState("");
    const [selectedFirearmID, setSelectedFirearmID] = useState("");

    const [modifications, setModifications] = useState({
        slide_mod: false,
        barrel_mod: false,
        recoilspring_mod: false,
        extractor_mod: false,
        triggergroup_mod: false,
        hammer_mod: false,
        firingpinstriker_mod: false
    });

    // -------- Fetch Makes --------
    useEffect(() => {
        axios.get(`${config.API_URL}/api/firearms/makes`)
            .then(res => setMakes(res.data))
            .catch(err => console.error("Error fetching makes:", err));
    }, []);

    // -------- Fetch Models when Make Changes --------
    useEffect(() => {
        if (selectedMake) {
            axios.get(`${config.API_URL}/api/firearms/modelsandid`, {
                params: { make: selectedMake }
            })
            .then(res => {
                setModels(res.data);
                setSelectedFirearmID("");
            })
            .catch(err => {
                console.error("Error fetching models:", err);
                setModels([]);
            });
        } else {
            setModels([]);
            setSelectedFirearmID("");
        }
    }, [selectedMake]);

    const handleModificationChange = (e) => {
        const { name, checked } = e.target;
        setModifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    const handleModelChange = (e) => {
        const firearmID = e.target.value;
        setSelectedFirearmID(firearmID);

        if (onSelect) {
            onSelect({
                firearm_id: firearmID,
                modifications
            });
        }
    };

    return (
        <div className="firearm-select">

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
                    value={selectedFirearmID}
                    onChange={handleModelChange}
                    disabled={!selectedMake}
                >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.model}
                        </option>
                    ))}
                </select>
            </div>

            {/* 🔥 SHOW MODIFICATIONS ONLY AFTER MODEL SELECTED */}
            {selectedFirearmID && (
                <div>
                    <h4>Firearm Modifications</h4>

                    <label>
                        <input 
                            type="checkbox"
                            name="slide_mod"
                            checked={modifications.slide_mod}
                            onChange={handleModificationChange}
                        /> The Slide
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="triggergroup_mod"
                            checked={modifications.triggergroup_mod}
                            onChange={handleModificationChange}
                        /> Trigger Group
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="hammer_mod"
                            checked={modifications.hammer_mod}
                            onChange={handleModificationChange}
                        /> The Hammer
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="firingpinstriker_mod"
                            checked={modifications.firingpinstriker_mod}
                            onChange={handleModificationChange}
                        /> Firing Pin / Striker
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="extractor_mod"
                            checked={modifications.extractor_mod}
                            onChange={handleModificationChange}
                        /> Extractor
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="recoilspring_mod"
                            checked={modifications.recoilspring_mod}
                            onChange={handleModificationChange}
                        /> Recoil Spring
                    </label>

                    <label>
                        <input 
                            type="checkbox"
                            name="barrel_mod"
                            checked={modifications.barrel_mod}
                            onChange={handleModificationChange}
                        /> Barrel
                    </label>

                </div>
            )}
        </div>
    );
};

export default FirearmSelectorWithMods;