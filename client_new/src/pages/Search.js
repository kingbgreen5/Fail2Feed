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
    const [reports, setReports] = useState([]);
    const [firearmId, setFirearmId] = useState("");
    const [totalRoundsFired, setTotalRoundsFired] = useState(0);

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




    // const fetchReports = async () => {
    //     if (!firearmId) {
    //         setError("Please enter a firearm ID.");
    //         return;
    //     }
    //     setError(""); // Clear previous errors

    //     try {
    //         const response = await axios.get(`${config.API_URL}/api/reports/firearm/${firearmId}`);
    //         setReports(response.data);
    //     } catch (err) {
    //         setError("No reports found or an error occurred.");
    //         setReports([]); // Clear reports on error
    //     }
    // };

//-----------------------------------------------------------------------------------FETCH REPORTS
    const fetchReports = async () => {
        if (!selectedFirearm) {
            setError("Please select a firearm first.");
            return;
        }
    
        setError(""); // Clear previous errors
    
        try {
            const response = await axios.get(`${config.API_URL}/api/reports/firearm/${selectedFirearm.id}`);
            const reportsData = response.data;
    
            setReports(reportsData);
    
            //--------------------------------------------------------------- Calculate total rounds fired
            const totalRounds = reportsData.reduce((sum, report) => sum + (report.rounds_fired || 0), 0);
            setTotalRoundsFired(totalRounds);
        } catch (err) {
            setError("No reports found or an error occurred.");
            setReports([]); // Clear reports on error
            setTotalRoundsFired(0); // Reset total rounds on error
        }
    };
//--------------------------------------------------------------------------------------CONSOLE LOG REPORTS

    useEffect(() => {
        if (reports !== null) {
            console.log(reports); // Logs the updated firearms state when it's not null
        }
    }, [reports]); // This effect runs when reports state changes
    



    // const fetchFirearmByMakeAndModel = async (make, model) => {
    //     try {
    //         const response = await axios.get(`${config.API_URL}/api/firearms/find`, {
    //             params: { make, model },
    //         });
    
    //         return response.data; // This contains the firearm data
    //     } catch (error) {
    //         console.error("Error fetching firearm:", error);
    //         return null;
    //     }
    // };


    // const handleSearchFirearm = async () => {
    //     if (!selectedMake || !selectedModel) {
    //         console.error("Make and model are required");
    //         return;
    //     }
    
    //     const firearm = await fetchFirearmByMakeAndModel(selectedMake, selectedModel);
    
    //     if (firearm) {
    //         console.log("Found firearm:", firearm);
    //         // You can update state or display the firearm info here
    //     } else {
    //         console.log("No firearm found.");
    //     }
    // };






   
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

{/* 
   <button onClick={handleSearchFirearm}>Search Firearm</button>
 */}





   {selectedFirearm && (
                <div className="firearm-details">
                    <h3>Selected Firearm:</h3>
                    <p><strong>Make:</strong> {selectedFirearm.make}</p>
                    <p><strong>Model:</strong> {selectedFirearm.model}</p>
                    <p> ID: {selectedFirearm.id}</p>
                    <p> TOTAL ROUNDS FIRED: {totalRoundsFired}</p>
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
                    <p> {totalRoundsFired}</p>
                </div>
            )}
        </div>







        <div>
            <h3>Get Reports by Firearm ID</h3>

            {/* Input Field for Firearm ID */}
            <input
                type="number"
                placeholder="Enter Firearm ID"
                value={firearmId}
                onChange={(e) => setFirearmId(e.target.value)}
            />

            {/* Fetch Reports Button */}
            <button onClick={fetchReports}>Fetch Reports</button>

            {/* Display Errors */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Display Reports */}
            {reports.length > 0 && (
                <div>
                    <h4>Reports for Firearm ID: {firearmId}</h4>
                    <ul>
                        {reports.map((report) => (
                            <li key={report.id}>
                                <strong>Date:</strong> {report.date}, <strong>Rounds Fired:</strong> {report.rounds_fired}
                                <br />
                                <strong>Comments:</strong> {report.comments}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
             


















                </div>
            
    );
};

export default Search;
