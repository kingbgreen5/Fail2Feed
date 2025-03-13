import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthContext";

const Search = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [firearm, setFirearm] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [firearms, setFirearms] = useState(null);
    const [selectedFirearm, setSelectedFirearm] = useState(null);

// ----------------------------------------------------------GET ALL FIREARMS
useEffect(() => {
    axios.get(`${config.API_URL}/api/firearms/all`)
        .then(response => {
            // setMakes(response.data);
            setFirearms(response.data); // Ensure firearms are updated with fetched data
            console.log(firearms)
        })
        .catch(error => console.error("Error fetching makes:", error));
}, []); // Runs only once when the component mounts




   // ----------------------------------------------------------FIREARM CONSOLE LOG
   useEffect(() => {
    if (firearms !== null) {
        console.log(firearms); // Logs the updated firearms state when it's not null
    }
}, [firearms]); // This effect runs when firearms state changes

//-----------------------------------------------------------------EXTRACE MAKE FROM FIREARM LIST
useEffect(() => {
    if (firearms !== null) {
        // Extract 'make' from each firearm and get unique values using Set
        const uniqueMakes = [...new Set(firearms.map(firearm => firearm.make))];
        setMakes(uniqueMakes); // Set the unique makes into the state
    }
}, [firearms]); // Runs when firearms state changes



    // ---------------------------------------------------------- FILTER MODELS BASED ON SELECTED MAKE
    useEffect(() => {
        if (selectedMake && firearms !== null) {
            const filteredModels = firearms
                .filter(firearm => firearm.make === selectedMake) // Get only firearms with selected make
                .map(firearm => firearm.model); // Extract model names

            const uniqueModels = [...new Set(filteredModels)]; // Ensure uniqueness
            setModels(uniqueModels); // Store in state
            setSelectedModel(""); // Reset selected model when make changes
        } else {
            setModels([]); // Clear models if no make is selected
        }
    }, [selectedMake, firearms]);


    useEffect(() => {
        if (selectedMake && selectedModel && firearms !== null) {
            const firearm = firearms.find(f => f.make === selectedMake && f.model === selectedModel);
            setSelectedFirearm(firearm || null); // Store the matched firearm or null if not found
        } else {
            setSelectedFirearm(null);
        }
    }, [selectedMake, selectedModel, firearms]);






    // useEffect(() => {
    //     axios.get(`${config.API_URL}/api/firearms/makes`)
    //         .then(response => setMakes(response.data))
    //         .catch(error => console.error("Error fetching makes:", error));
    // }, []);

    // useEffect(() => {
    //     if (selectedMake) {
    //         axios.get(`${config.API_URL}/api/firearms/models`, { params: { make: selectedMake } })
    //             .then(response => setModels(response.data))
    //             .catch(error => {
    //                 console.error("Error fetching models:", error);
    //                 setModels([]);
    //                 console.log(models)
    //             });
    //     } else {
    //         setModels([]);
    //     }
    // }, [selectedMake]);
    




    // useEffect(() => {
    //     if (selectedModel) {
    //         axios.get(`${config.API_URL}/api/firearms/models`, { params: { make: selectedMake } })
    //             .then(response => setModels(response.data))
    //             .catch(error => {
    //                 console.error("Error fetching models:", error);
    //                 setModels([]);
    //                 console.log(models)
    //             });
    //     } else {
    //         setModels([]);
    //         console.log(models)
    //     }
    // }, [selectedMake]);
    





    const fetchFirearmByMakeAndModel = async (make, model) => {
        try {
            const response = await axios.get(`${config.API_URL}/api/firearms/find`, {
                params: { make, model },
            });
    
            return response.data; // This contains the firearm data
        } catch (error) {
            console.error("Error fetching firearm:", error);
            return null;
        }
    };


    const handleSearchFirearm = async () => {
        if (!selectedMake || !selectedModel) {
            console.error("Make and model are required");
            return;
        }
    
        const firearm = await fetchFirearmByMakeAndModel(selectedMake, selectedModel);
    
        if (firearm) {
            console.log("Found firearm:", firearm);
            // You can update state or display the firearm info here
        } else {
            console.log("No firearm found.");
        }
    };






   
    return (
        <div>
   
       
                <div className="firearm-select">
        <h1>Firearm Lookup</h1>

                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}
{/* 
                    <div className="select-group">
                        <label>Manufacturer:</label>
                        <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                            <option value="">Select Manufacturer</option>
                            {makes.map((make, index) => (
                                <option key={index} value={make}>{make}</option>
                            ))}
                        </select>
                    </div> */}



{/* //-------------------------------------------------------------------------------MANUFACTURER DROPDOWN */}
                    <div>
            <div className="select-group">
                <label>Manufacturer: (new dropdown)</label>
                <select 
                    value={selectedMake} 
                    onChange={(e) => setSelectedMake(e.target.value)}
                >
                    <option value="">Select Manufacturer </option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>
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

   {selectedMake} {selectedModel}


   <button onClick={handleSearchFirearm}>Search Firearm</button>






   {selectedFirearm && (
                <div className="firearm-details">
                    <h3>Selected Firearm:</h3>
                    <p><strong>Make:</strong> {selectedFirearm.make}</p>
                    <p><strong>Model:</strong> {selectedFirearm.model}</p>
                    <p> ID: {selectedFirearm.id}</p>
                                                                               {/* Add more firearm details as needed */}
                </div>
            )}












   {firearm && (
                <div>
                    <h3>Firearm Details</h3>
                    <p><strong>Make:</strong> {firearm.make}</p>
                    <p><strong>Model:</strong> {firearm.model}</p>
                    <p><strong>Rounds Fired:</strong> {firearm.rounds_fired}</p>
                    <p><strong>Reports Filed:</strong> {firearm.reports_filed}</p>
                </div>
            )}
        </div>
             
                </div>
            
    
    );
};

export default Search;
