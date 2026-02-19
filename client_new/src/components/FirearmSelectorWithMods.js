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

    // const handleModificationChange = (e) => {
    //     const { name, checked } = e.target;
    //     setModifications(prev => ({
    //         ...prev,
    //         [name]: checked
    //     }));
    // };

    // const handleModelChange = (e) => {
    //     const firearmID = e.target.value;
    //     setSelectedFirearmID(firearmID);

    //     if (onSelect) {
    //         onSelect({
    //             firearm_id: firearmID,
    //             modifications
    //         });
    //     }
    // };




const handleModelChange = (e) => {
    const firearmID = parseInt(e.target.value, 10);
    setSelectedFirearmID(firearmID);

    const selectedModelObj = models.find(m => m.id === firearmID);

    if (onSelect && selectedModelObj) {
        onSelect({
            Firearm: {
                id: firearmID,
                make: selectedMake,
                model: selectedModelObj.model
            },
            ...modifications
        });
    }
};





const handleModificationChange = (e) => {
    const { name, checked } = e.target;

    const updatedMods = {
        ...modifications,
        [name]: checked
    };

    setModifications(updatedMods);

    if (onSelect && selectedFirearmID) {
        onSelect({
            Firearm: {
                id: selectedFirearmID,
                make: selectedMake,
                model: models.find(m => m.id === selectedFirearmID)?.model
            },
            ...updatedMods
        });
    }
};
















className="range-report-firearm-select"

    return (
        <div className="firearm-select">

            <div className="select-group">
                <label>Manufacturer:</label>
                <select 
                    value={selectedMake}
                    onChange={(e) => setSelectedMake(e.target.value)}
                    className="range-report-firearm-select"
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
                    className="range-report-firearm-select"
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




















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../config";

// const FirearmSelectorWithMods = ({ formData, setFormData }) => {
//     const [makes, setMakes] = useState([]);
//     const [models, setModels] = useState([]);
//     const [selectedMake, setSelectedMake] = useState("");

//     // -------- Fetch Makes --------
//     useEffect(() => {
//         axios.get(`${config.API_URL}/api/firearms/makes`)
//             .then(res => setMakes(res.data))
//             .catch(err => console.error("Error fetching makes:", err));
//     }, []);

//     // -------- Fetch Models --------
//     useEffect(() => {
//         if (selectedMake) {
//             axios.get(`${config.API_URL}/api/firearms/modelsandid`, {
//                 params: { make: selectedMake }
//             })
//             .then(res => setModels(res.data))
//             .catch(err => {
//                 console.error("Error fetching models:", err);
//                 setModels([]);
//             });
//         } else {
//             setModels([]);
//         }
//     }, [selectedMake]);

//     const handleModelChange = (e) => {
//         const firearmID = e.target.value;

//         setFormData(prev => ({
//             ...prev,
//             firearm_id: firearmID
//         }));
//     };

//     const handleModificationChange = (e) => {
//         const { name, checked } = e.target;

//         setFormData(prev => ({
//             ...prev,
//             [name]: checked
//         }));
//     };

//     return (
//         <div className="firearm-select">

//             {/* -------- MAKE -------- */}
//             <div className="select-group">
//                 <label>Manufacturer:</label>
//                 <select
//                     value={selectedMake}
//                     onChange={(e) => {
//                         setSelectedMake(e.target.value);

//                         // reset firearm + mods when make changes
//                         setFormData(prev => ({
//                             ...prev,
//                             firearm_id: "",
//                             slide_mod: false,
//                             barrel_mod: false,
//                             recoilspring_mod: false,
//                             extractor_mod: false,
//                             triggergroup_mod: false,
//                             hammer_mod: false,
//                             firingpinstriker_mod: false
//                         }));
//                     }}
//                 >
//                     <option value="">Select Manufacturer</option>
//                     {makes.map((make, index) => (
//                         <option key={index} value={make}>
//                             {make}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* -------- MODEL -------- */}
//             <div className="select-group">
//                 <label>Model:</label>
//                 <select
//                     value={formData.firearm_id}
//                     onChange={handleModelChange}
//                     disabled={!selectedMake}
//                 >
//                     <option value="">Select Model</option>
//                     {models.map((model) => (
//                         <option key={model.id} value={model.id}>
//                             {model.model}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* -------- MODIFICATIONS -------- */}
//             {formData.firearm_id && (
//                 <div>
//                     <h4>Firearm Modifications</h4>

//                     {[
//                         ["slide_mod", "The Slide"],
//                         ["triggergroup_mod", "Trigger Group"],
//                         ["hammer_mod", "The Hammer"],
//                         ["firingpinstriker_mod", "Firing Pin / Striker"],
//                         ["extractor_mod", "Extractor"],
//                         ["recoilspring_mod", "Recoil Spring"],
//                         ["barrel_mod", "Barrel"]
//                     ].map(([key, label]) => (
//                         <label key={key}>
//                             <input
//                                 type="checkbox"
//                                 name={key}
//                                 checked={formData[key]}
//                                 onChange={handleModificationChange}
//                             />
//                             {label}
//                         </label>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FirearmSelectorWithMods;






