
import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

const UserFirearmSelect = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [showComponent, setShowComponent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [modifications, setModifications] = useState({
        slide_mod: false,
        barrel_mod: false,
        recoilSpring_mod: false,
        extractor_mod: false,
        triggerGroup_mod: false,
        hammer_mod: false,
        firingPinStriker_mod: false
    });
    

    const handleModificationChange = (e) => {
        const { name, checked } = e.target;
        setModifications(prev => ({
            ...prev,
            [name]: checked
        }));
    };





    useEffect(() => {
        axios.get(`${config.API_URL}/api/firearms/makes`)
            .then(response => setMakes(response.data))
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    useEffect(() => {
        if (selectedMake) {
            axios.get(`${config.API_URL}/api/firearms/models`, { params: { make: selectedMake } })
                .then(response => setModels(response.data))
                .catch(error => {
                    console.error("Error fetching models:", error);
                    setModels([]);
                });
        } else {
            setModels([]);
        }
    }, [selectedMake]);













    // const handleConfirmSelection = () => {
    //     if (!selectedMake || !selectedModel) {
    //         setError("Please select both manufacturer and model");
    //         return;
    //     }

    //     setLoading(true);
    //     setError("");
    //     setMessage("");

    //     const token = localStorage.getItem("token");
    //     axios.post(
    //         `${config.API_URL}/api/userFirearms/add`,
    //         { make: selectedMake, model: selectedModel },
    //         { headers: { Authorization: `Bearer ${token}` } }
    //     )
    //     .then(response => {
    //         setMessage(response.data.message || "Firearm added to your profile!");
    //         setSelectedMake("");
    //         setSelectedModel("");
    //         console.log()
    //         // window.location.reload();
    //     })
    //     .catch(error => {
    //         console.error("Error adding firearm:", error);
    //         setError(error.response?.data?.message || "Error adding firearm. Please try again.");
    //     })
    //     .finally(() => setLoading(false));
    // };



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
            { 
                make: selectedMake, 
                model: selectedModel,
                ...modifications  // ✅ Include modifications in the request
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(response => {
            setMessage(response.data.message || "Firearm added to your profile!");
            setSelectedMake("");
            setSelectedModel("");
            setModifications({  // Reset checkboxes after submission
                slide_mod: false,
                barrel_mod: false,
                recoilSpring_mod: false,
                extractor_mod: false,
                triggerGroup_mod: false,
                hammer_mod: false,
                firingPinStriker_mod: false
            });
        })
        .catch(error => {
            console.error("Error adding firearm:", error);
            setError(error.response?.data?.message || "Error adding firearm. Please try again.");
        })
        .finally(() => setLoading(false));
    };
    

























    return (
        <div>
            <button onClick={() => setShowComponent(!showComponent)}>
                {showComponent ? "Hide Firearm Selection" : "Add Firearm"}
            </button>

            {showComponent && (
                <div className="firearm-select">
                    <h2>Add Firearm to Collection</h2>

                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}

                    <div className="select-group">
                        <label>Manufacturer:</label>
                        <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                            <option value="">Select Manufacturer</option>
                            {makes.map((make, index) => (
                                <option key={index} value={make}>{make}</option>
                            ))}
                        </select>
                    </div>

                    <div className="select-group">
                        <label>Model:</label>
                        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
                            <option value="">Select Model</option>
                            {models.map((model, index) => (
                                <option key={index} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    {/* Show modifications only if a model is selected */}
                    {selectedModel && (
                        <div>
                            <h4>Firearm Modifications</h4>
                            {/* <label><input type="checkbox" name="slide_mod" /> The Slide</label>
                            <label><input type="checkbox" name="triggerGroup_mod" /> Trigger Group</label>
                            <label><input type="checkbox" name="hammer_mod" /> The Hammer</label>
                            <label><input type="checkbox" name="firingPinStriker_mod" /> Firing Pin/Striker</label>
                            <label><input type="checkbox" name="extractor_mod" /> Extractor</label>
                            <label><input type="checkbox" name="recoilSpring_mod" /> Recoil Spring</label>
                            <label><input type="checkbox" name="barrel_mod" /> Barrel</label> */}

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
        name="triggerGroup_mod" 
        checked={modifications.triggerGroup_mod} 
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
        name="firingPinStriker_mod" 
        checked={modifications.firingPinStriker_mod} 
        onChange={handleModificationChange} 
    /> Firing Pin/Striker
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
        name="recoilSpring_mod" 
        checked={modifications.recoilSpring_mod} 
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









                            {/* Submit Button */}
                            <button 
                                onClick={handleConfirmSelection} 
                                disabled={loading} 
                                className="confirm-button"
                            >
                                {loading ? "Adding..." : "Confirm Selection"}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserFirearmSelect;
