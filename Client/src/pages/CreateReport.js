import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";


const CreateReport = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");

    // Fetch Makes
    useEffect(() => {
        axios.get("http://localhost:5000/api/firearms/makes")
            .then(response => 

                // console.log("Server response for makes:", response.data),
                setMakes(response.data))
        
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    useEffect(() => {
        console.log("Updated makes state:", makes);
    }, [makes]);
    

    useEffect(() => {
        console.log("Selected Make:", selectedMake);
    }, [selectedMake]);
    




    // Fetch Models when Make is selected
    useEffect(() => {
        if (selectedMake) {
            axios.get(`http://localhost:5000/api/firearms/models?make=${selectedMake}`)
                .then(response => {
                    console.log("Models response:", response.data); // Debugging
                    setModels(response.data || []); // Ensure it never sets null
                })
                .catch(error => {
                    console.error("Error fetching models:", error);
                    setModels([]); // Reset models on error
                });
        } else {
            setModels([]); // Clear models if no make is selected
        }
    }, [selectedMake]);
    




    return (
        <form>
            <h2>Create Range Report</h2>
<h3>Select Firearm</h3>
{/* <h1>Makes:{makes.map}</h1> */}
<div> 
            {/* Make Dropdown */}
            <label>Manufacturer: </label>
            <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                <option value="">Select Make</option>
                {makes.map((make, index) => (
                    <option key={index} value={make}>{make}</option>
                ))}
            </select>
            </div>
            <div> 
            {/* Model Dropdown */}
            <label>Model: </label>
            <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)} disabled={!selectedMake || models.length === 0}>
                <option value="">{models.length === 0 ? "No models available" : "Select Model"}</option>
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
    ))}
</select>
</div>
<div>
   <h2>FIREARM: {selectedMake} {selectedModel}</h2>

</div>


            {/* Submit Button */}
            <button type="submit">Submit Report</button>
        </form>
    );
};

export default CreateReport;
