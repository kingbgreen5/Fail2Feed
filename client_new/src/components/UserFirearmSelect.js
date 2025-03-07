// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config";

// const UserFirearmSelect = () => {
//     const [makes, setMakes] = useState([]);
//     const [models, setModels] = useState([]);
//     const [selectedMake, setSelectedMake] = useState("");
//     const [selectedModel, setSelectedModel] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");



//     //-------------------------------------------------------------------GET MAKES
//     useEffect(() => {
//         setLoading(true);
//         setError("");
//         axios.get(`${config.API_URL}/api/firearms/makes`)
//             .then(response => {
//                 // console.log("Makes response:", response.data);
//                 setMakes(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching makes:", error);
//                 setError("Failed to load manufacturers. Please try again.");
//             })
//             .finally(() => setLoading(false));
//     }, []);


//     //-------------------------------------------------------------------GET MODELS

//     useEffect(() => {
//         if (selectedMake) {
//             setLoading(true);
//             setError("");
//             axios.get(`${config.API_URL}/api/firearms/models`, {
//                 params: { make: selectedMake }
//             })
//             .then(response => {
//                 // console.log("Models response:", response.data);
//                 setModels(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching models:", error);
//                 setError("Failed to load models. Please try again.");
//                 setModels([]);
//             })
//             .finally(() => setLoading(false));
//         } else {
//             setModels([]);
//         }
//     }, [selectedMake]);




//     const handleConfirmSelection = () => {
//         if (!selectedMake || !selectedModel) {
//             setError("Please select both manufacturer and model");
//             return;
//         }

//         setLoading(true);
//         setError("");
//         setMessage("");

//         const token = localStorage.getItem("token");
//         axios.post(
//             `${config.API_URL}/api/userFirearms/add`,
//             { make: selectedMake, model: selectedModel },
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .then(response => {
//             setMessage(response.data.message || "Firearm added to your profile!");
//             // Clear selections
//             setSelectedMake("");
//             setSelectedModel("");
//         })
//         .catch(error => {
//             console.error("Error adding firearm:", error);
//             setError(error.response?.data?.message || "Error adding firearm. Please try again.");
//         })
//         .finally(() => setLoading(false));
//     };








//     return (
//         <div className="firearm-select">
//             <h2>Add Firearm to Collection</h2>

//             {error && <div className="error-message">{error}</div>}
//             {message && <div className="success-message">{message}</div>}

//             <div className="select-group">
//                 <label>Manufacturer:</label>
//                 <select 
//                     value={selectedMake} 
//                     onChange={(e) => setSelectedMake(e.target.value)}
//                     disabled={loading}
//                 >
//                     <option value="">Select Manufacturer</option>
//                     {makes.map((make, index) => (
//                         <option key={index} value={make}>{make}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="select-group">
//                 <label>Model:</label>
//                 <select 
//                     value={selectedModel} 
//                     onChange={(e) => setSelectedModel(e.target.value)}
//                     disabled={!selectedMake || loading}
//                 >
//                     <option value="">Select Model</option>
//                     {models.map((model, index) => (
//                         <option key={index} value={model}>{model}</option>
//                     ))}
//                 </select>
//             </div>
// <div>



//           {/* //------------------------------------------------------------usersFirearm Modifications */}
//     <h4> Firearm Modifications</h4>


// <div className = "usersFirearm Modifications">





//     <h5>
//         What elements of the gun have been modified from the Factory configuration?
//     </h5>

//         {/* //------------------------------------------------------------Slide */}
// <label>
//                 <input
//                     type="checkbox"
//                     name="Slide"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//               The Slide
//             </label>


// </div>
// {/* //-----------------------------------------------------------------Trigger */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Trigger"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//               Trigger Group
//             </label>
    
// </div>

// {/* //---------------------------------------------------------------------Hammer */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Hammer"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//               The Hammer
//             </label>
    
// </div>

// {/* //------------------------------------------------------------Firing Pin/Striker */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Firing Pin/Striker"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//                Firing Pin/Striker
//             </label>
    
// </div>

// {/* //-------------------------------------------------------------------Extractor */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Extractor"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//                Extractor
//             </label>
    
// </div>

// {/* //---------------------------------------------------------------Recoil Spring */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Recoil Spring"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//                Recoil Spring
//             </label>
    
// </div>

// {/* //-----------------------------------------------------------------------Barrel */}
// <div>
// <label>
//                 <input
//                     type="checkbox"
//                     name="Barrel"
//                     // checked={formData.catastrophicFailure}
//                     // onChange={handleChange}
//                 />
//                Barrel
//             </label>
    
// </div>

// </div>


//             <button 
//                 onClick={handleConfirmSelection} 
//                 disabled={!selectedMake || !selectedModel || loading}
//                 className="confirm-button"
//             >
//                 {loading ? "Adding..." : "Confirm Selection"}
//             </button>
//         </div>
//     );
// };

// export default UserFirearmSelect;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config";

// const UserFirearmSelect = () => {
//     const [makes, setMakes] = useState([]);
//     const [models, setModels] = useState([]);
//     const [selectedMake, setSelectedMake] = useState("");
//     const [selectedModel, setSelectedModel] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     // Modification state
//     const [modifications, setModifications] = useState({
//         slide_mod: false,
//         triggerGroup_mod: false,
//         hammer_mod: false,
//         firingPinStriker_mod: false,
//         extractor_mod: false,
//         recoilSpring_mod: false,
//         barrel_mod: false
//     });

//     // Handle checkbox change
//     const handleModificationChange = (event) => {
//         const { name, checked } = event.target;
//         setModifications((prevMods) => ({
//             ...prevMods,
//             [name]: checked
//         }));
//     };

//     // Fetch firearm makes
//     useEffect(() => {
//         setLoading(true);
//         setError("");
//         axios.get(`${config.API_URL}/api/firearms/makes`)
//             .then(response => setMakes(response.data))
//             .catch(error => setError("Failed to load manufacturers. Please try again."))
//             .finally(() => setLoading(false));
//     }, []);

//     // Fetch models based on selected make
//     useEffect(() => {
//         if (selectedMake) {
//             setLoading(true);
//             setError("");
//             axios.get(`${config.API_URL}/api/firearms/models`, { params: { make: selectedMake } })
//                 .then(response => setModels(response.data))
//                 .catch(error => setError("Failed to load models. Please try again."))
//                 .finally(() => setLoading(false));
//         } else {
//             setModels([]);
//         }
//     }, [selectedMake]);

//     // Handle firearm selection and send API request
//     const handleConfirmSelection = () => {
//         if (!selectedMake || !selectedModel) {
//             setError("Please select both manufacturer and model");
//             return;
//         }

//         setLoading(true);
//         setError("");
//         setMessage("");

//         const token = localStorage.getItem("token");

//         // Convert boolean modifications to 1/0 for API
//         const formattedMods = Object.fromEntries(
//             Object.entries(modifications).map(([key, value]) => [key, value ? 1 : 0])
//         );

//         axios.post(
//             `${config.API_URL}/api/userFirearms/add`,
//             { 
//                 make: selectedMake, 
//                 model: selectedModel,
//                 ...formattedMods
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .then(response => {
//             setMessage("Firearm added to your profile!");
//             setSelectedMake("");
//             setSelectedModel("");
//             setModifications({
//                 slide_mod: false,
//                 triggerGroup_mod: false,
//                 hammer_mod: false,
//                 firingPinStriker_mod: false,
//                 extractor_mod: false,
//                 recoilSpring_mod: false,
//                 barrel_mod: false
//             });
//         })
//         .catch(error => {
//             setError("Error adding firearm. Please try again.");
//         })
//         .finally(() => setLoading(false));
//     };

//     return (
//         <div className="firearm-select">
//             <h2>Add Firearm to Collection</h2>

//             {error && <div className="error-message">{error}</div>}
//             {message && <div className="success-message">{message}</div>}

//             <div className="select-group">
//                 <label>Manufacturer:</label>
//                 <select 
//                     value={selectedMake} 
//                     onChange={(e) => setSelectedMake(e.target.value)}
//                     disabled={loading}
//                 >
//                     <option value="">Select Manufacturer</option>
//                     {makes.map((make, index) => (
//                         <option key={index} value={make}>{make}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="select-group">
//                 <label>Model:</label>
//                 <select 
//                     value={selectedModel} 
//                     onChange={(e) => setSelectedModel(e.target.value)}
//                     disabled={!selectedMake || loading}
//                 >
//                     <option value="">Select Model</option>
//                     {models.map((model, index) => (
//                         <option key={index} value={model}>{model}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* Modifications Section */}
//             <h4>Firearm Modifications</h4>
//             <h5>What elements of the gun have been modified from the factory configuration?</h5>

//             {Object.keys(modifications).map((mod) => (
//                 <div key={mod}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name={mod}
//                             checked={modifications[mod]}
//                             onChange={handleModificationChange}
//                         />
//                         {mod.replace("_mod", "").replace(/([A-Z])/g, " $1")} {/* Formats the label */}
//                     </label>
//                 </div>
//             ))}

//             <button 
//                 onClick={handleConfirmSelection} 
//                 disabled={!selectedMake || !selectedModel || loading}
//                 className="confirm-button"
//             >
//                 {loading ? "Adding..." : "Confirm Selection"}
//             </button>
//         </div>
//     );
// };

// export default UserFirearmSelect;

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config";

// const UserFirearmSelect = () => {
//     const [makes, setMakes] = useState([]);
//     const [models, setModels] = useState([]);
//     const [selectedMake, setSelectedMake] = useState("");
//     const [selectedModel, setSelectedModel] = useState("");
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");

//     // Explicitly define modifications
//     const [modifications, setModifications] = useState({
//         slide_mod: false,
//         triggerGroup_mod: false,
//         hammer_mod: false,
//         firingPinStriker_mod: false,
//         extractor_mod: false,
//         recoilSpring_mod: false,
//         barrel_mod: false
//     });

//     // Checkbox label mapping
//     const modificationOptions = [
//         { key: "slide_mod", label: "The Slide" },
//         { key: "triggerGroup_mod", label: "Trigger Group" },
//         { key: "hammer_mod", label: "The Hammer" },
//         { key: "firingPinStriker_mod", label: "Firing Pin/Striker" },
//         { key: "extractor_mod", label: "Extractor" },
//         { key: "recoilSpring_mod", label: "Recoil Spring" },
//         { key: "barrel_mod", label: "Barrel" }
//     ];

//     // Handle checkbox change
//     const handleModificationChange = (event) => {
//         const { name, checked } = event.target;
//         setModifications((prevMods) => ({
//             ...prevMods,
//             [name]: checked
//         }));
//     };

//     // Fetch firearm makes
//     useEffect(() => {
//         setLoading(true);
//         setError("");
//         axios.get(`${config.API_URL}/api/firearms/makes`)
//             .then(response => setMakes(response.data))
//             .catch(error => setError("Failed to load manufacturers. Please try again."))
//             .finally(() => setLoading(false));
//     }, []);

//     // Fetch models based on selected make
//     useEffect(() => {
//         if (selectedMake) {
//             setLoading(true);
//             setError("");
//             axios.get(`${config.API_URL}/api/firearms/models`, { params: { make: selectedMake } })
//                 .then(response => setModels(response.data))
//                 .catch(error => setError("Failed to load models. Please try again."))
//                 .finally(() => setLoading(false));
//         } else {
//             setModels([]);
//         }
//     }, [selectedMake]);

//     // Handle firearm selection and send API request
//     const handleConfirmSelection = () => {
//         if (!selectedMake || !selectedModel) {
//             setError("Please select both manufacturer and model");
//             return;
//         }

//         setLoading(true);
//         setError("");
//         setMessage("");

//         const token = localStorage.getItem("token");

//         // Convert boolean modifications to 1/0 for API
//         const formattedMods = Object.fromEntries(
//             Object.entries(modifications).map(([key, value]) => [key, value ? 1 : 0])
//         );

//         axios.post(
//             `${config.API_URL}/api/userFirearms/add`,
//             { 
//                 make: selectedMake, 
//                 model: selectedModel,
//                 ...formattedMods
//             },
//             { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .then(response => {
//             setMessage("Firearm added to your profile!");
//             setSelectedMake("");
//             setSelectedModel("");
//             setModifications({
//                 slide_mod: false,
//                 triggerGroup_mod: false,
//                 hammer_mod: false,
//                 firingPinStriker_mod: false,
//                 extractor_mod: false,
//                 recoilSpring_mod: false,
//                 barrel_mod: false
//             });
//         })
//         .catch(error => {
//             setError("Error adding firearm. Please try again.");
//         })
//         .finally(() => setLoading(false));
//     };

//     return (
//         <div className="firearm-select">
//             <h2>Add Firearm to Collection</h2>

//             {error && <div className="error-message">{error}</div>}
//             {message && <div className="success-message">{message}</div>}

//             <div className="select-group">
//                 <label>Manufacturer:</label>
//                 <select 
//                     value={selectedMake} 
//                     onChange={(e) => setSelectedMake(e.target.value)}
//                     disabled={loading}
//                 >
//                     <option value="">Select Manufacturer</option>
//                     {makes.map((make, index) => (
//                         <option key={index} value={make}>{make}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="select-group">
//                 <label>Model:</label>
//                 <select 
//                     value={selectedModel} 
//                     onChange={(e) => setSelectedModel(e.target.value)}
//                     disabled={!selectedMake || loading}
//                 >
//                     <option value="">Select Model</option>
//                     {models.map((model, index) => (
//                         <option key={index} value={model}>{model}</option>
//                     ))}
//                 </select>
//             </div>

//             {/* Modifications Section */}
//             <h4>Firearm Modifications</h4>
//             <h5>What elements of the gun have been modified from the factory configuration?</h5>

//             {modificationOptions.map((mod) => (
//                 <div key={mod.key}>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name={mod.key}
//                             checked={modifications[mod.key]}
//                             onChange={handleModificationChange}
//                         />
//                         {mod.label}
//                     </label>
//                 </div>
//             ))}

//             <button 
//                 onClick={handleConfirmSelection} 
//                 disabled={!selectedMake || !selectedModel || loading}
//                 className="confirm-button"
//             >
//                 {loading ? "Adding..." : "Confirm Selection"}
//             </button>
//         </div>
//     );
// };

// export default UserFirearmSelect;
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
                            <label><input type="checkbox" name="slide_mod" /> The Slide</label>
                            <label><input type="checkbox" name="triggerGroup_mod" /> Trigger Group</label>
                            <label><input type="checkbox" name="hammer_mod" /> The Hammer</label>
                            <label><input type="checkbox" name="firingPinStriker_mod" /> Firing Pin/Striker</label>
                            <label><input type="checkbox" name="extractor_mod" /> Extractor</label>
                            <label><input type="checkbox" name="recoilSpring_mod" /> Recoil Spring</label>
                            <label><input type="checkbox" name="barrel_mod" /> Barrel</label>

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
