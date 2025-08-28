import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthContext";



const CreateReport = () => {
    const { user } = useContext(AuthContext);
    const [userFirearms, setUserFirearms] = useState([]);
    const [selectedFirearmID, setSelectedFirearmID] =useState("")
    const [selectedUserFirearm, setSelectedUserFirearm] = useState(null);
    const [selectedAmmo,setSelectedAmmo] = useState(null);

//------------------------------------------------------------------------- GETS USERS FIREARMS
    useEffect(() => {
      
          const token = localStorage.getItem("token");
          // console.log("Token from local storage",token)
          axios.get(`${config.API_URL}/api/userFirearms`, { 
              headers: { Authorization: `Bearer ${token}` } 
          })
          .then(response => setUserFirearms(response.data))
          .catch(error => console.error("Error fetching user firearms:", error));
      }, []);
  

    const handleSelect = (e) => {
        const id = parseInt(e.target.value, 10); // Convert value to integer
        setSelectedFirearmID(id);

        // Find the firearm in userFirearms that matches the selected ID
        const firearm = userFirearms.find(f => f.Firearm.id === id);
        setSelectedUserFirearm(firearm || null); 
    };
    
    // UseEffect to watch for selectedUserFirearm updates and COnsole logs them
    useEffect(() => {
        console.log("Selected User Firearm:", selectedUserFirearm);
    }, [selectedUserFirearm]); // This will log only when selectedUserFirearm updates
    
    useEffect(() => {
      console.log("Form Data:", formData);
  }, [selectedUserFirearm]); // This will log only when selectedUserFirearm updates
  




    // const RangeReportForm = ({ selectedUserFirearm, ammoOptions }) => {
        const [formData, setFormData] = useState({
            user_id:"",
            firearm_id: "",
            ammo_id: "1",
            suppressor: 0,
            optic: 0,
            date: new Date().toISOString().split("T")[0], // Default to today's date
            barrel_mod:0,
            slide_mod:0,
            extractor_mod:0,
            recoilspring_mod:0,
            triggergroup_mod:0,
            hammer_mod:0,
            firingpinstriker_mod:0,
            rounds_fired: 0,
                firing: 0,
                unlocking: 0,
                extracting: 0,
                ejecting: 0,
                cocking: 0,
                feeding: 0,
                chambering: 0,
                locking: 0,
                magazine: 0,
                ammunition: 0,
                other: 0,
                catastrophic: false,
                comments: "",
        } );
    








        // const handleChange = (e) => {
        //     const { name, value, type, checked } = e.target;
        //     setFormData((prev) => ({
        //         ...prev,
        //         [name]: type === "checkbox" ? checked : value,
            
        //     }));
        //     console.log("Form Data", formData)
        // };





        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            let newValue = type === "checkbox" ? checked : value;
        
            // Convert negative numbers to 0
            if (type === "number" && Number(newValue) < 0) {
                newValue = "0"; // Ensuring it's a string to prevent input issues
            }
        
            setFormData((prev) => ({
                ...prev,
                [name]: newValue,
            }));
        
            console.log("Handle Change Form Data", { ...formData, [name]: newValue });
        };
        










        const handleSubmit = async () => {
            const token = localStorage.getItem("token");
        
            try {
                const response = await axios.post(`${config.API_URL}/api/reports`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
        
                console.log("Report submitted successfully:", response.data);
                alert("Report submitted successfully!");
                
                // Optionally, reset the form after submission
                setFormData({
                    user_id: user?.id || "",
                    firearm_id: selectedFirearmID || "",
                    ammo_id: "1",
                    suppressor: 0,
                    optic: 0,
                    date: new Date().toISOString().split("T")[0],
                    barrel_mod: 0,
                    slide_mod: 0,
                    extractor_mod: 0,
                    s: 0,
                    g: 0,
                    hammer_mod: 0,
                    firingpinstriker_mod: 0,
                    rounds_fired: 0,
                    firing: 0,
                    unlocking: 0,
                    extracting: 0,
                    ejecting: 0,
                    cocking: 0,
                    feeding: 0,
                    chambering: 0,
                    locking: 0,
                    magazine: 0,
                    ammunition: 0,
                    other: 0,
                    catastrophic: false,
                    comments: "",
                });
        
            } catch (error) {
                console.error("Error submitting report:", error);
                alert("Failed to submit report.");
            }
        };
        






//--------------------------------------------------------------------Dynamic add malfunctions


// const malfunctionTypes = [
//     "Firing", "Unlocking", "Extracting", "Ejecting", "Cocking",
//     "Feeding", "Chambering", "Locking", "Magazine Failure", "Ammunition Failure"
//   ];
  
//   const MAX_MALFUNCTIONS = 10;
  
//   const [malfunctions, setMalfunctions] = useState([
//     { type: "", count: 0 }
//   ]);
  
//   const handleMalfunctionChange = (index, field, value) => {
//     const updated = [...malfunctions];
//     updated[index][field] = field === "count" ? Number(value) : value;
//     setMalfunctions(updated);
//     console.log("Malfunction Data", malfunctions);
    
//   };
  

//   const addMalfunction = () => {
//     if (malfunctions.length < MAX_MALFUNCTIONS) {
//       setMalfunctions([...malfunctions, { type: "", count: 0 }]);
//     }
//   };
  
//   const removeMalfunction = (index) => {
//     const updated = [...malfunctions];
//     updated.splice(index, 1);
//     setMalfunctions(updated);
//   };
  







  const malfunctionTypes = [
    "Firing", "Unlocking", "Extracting", "Ejecting", "Cocking",
    "Feeding", "Chambering", "Locking", "Magazine", "Ammunition", 
    "Other"
  ];
  
  const MAX_MALFUNCTIONS = 10;
  
  const [malfunctions, setMalfunctions] = useState({});
  const [selectedTypes, setSelectedTypes] = useState([]);
  
  const handleTypeSelect = (index, newType) => {
    const updated = [...selectedTypes];
    updated[index] = newType;
    setSelectedTypes(updated);
  };
  
  const handleCountChange = (type, count) => {
   
    setMalfunctions(prev => ({
      ...prev,
      [type]: Number(count)
    }));
        console.log("Malfunction Data", malfunctions);
  };
  
  const addMalfunction = () => {
    if (selectedTypes.length < MAX_MALFUNCTIONS) {
      setSelectedTypes([...selectedTypes, ""]);
    }
  };
  
  const removeMalfunction = (index) => {
    const removedType = selectedTypes[index];
    const updatedTypes = [...selectedTypes];
    updatedTypes.splice(index, 1);
    setSelectedTypes(updatedTypes);
  
    setMalfunctions(prev => {
      const updated = { ...prev };
      delete updated[removedType];
      return updated;
    });
  };
  

























//-----------------------------------------------------------------------------------------UPDATES FORMDATA WHEN VALUES CHANGE ------------------------------------------------
//-----------------------------------------------------------------------------------------Stuffs values from userSelecteFirearm into formData ------------------------------------------------

useEffect(() => {
  setFormData((prev) => ({
      ...prev,
      firearm_id: selectedFirearmID, 
      user_id: user?.id || "", 
      barrel_mod: selectedUserFirearm?.barrel_mod ?? 0, // Use optional chaining and fallback value
      slide_mod: selectedUserFirearm?.slide_mod ?? 0,
      extractor_mod: selectedUserFirearm?.extractor_mod ?? 0,
      s:selectedUserFirearm?.s ?? 0,
      g:selectedUserFirearm?.g ?? 0,
      firingpinstriker_mod:selectedUserFirearm?.firingpinstriker_mod ?? 0,
      firing:malfunctions.Firing ?? 0,
      unlocking:malfunctions.Unlocking ?? 0,
      extracting:malfunctions.Extracting ?? 0,
      ejecting:malfunctions.Ejecting ?? 0,
      cocking:malfunctions.Cocking ?? 0,
      feeding:malfunctions.Feeding ?? 0,
      chambering:malfunctions.Chambering ?? 0,
      locking:malfunctions.Locking ?? 0,
      magazine:malfunctions.Magazine ?? 0,
      ammunition:malfunctions.Ammunition ?? 0,
      other:malfunctions.Other ?? 0,

  }));
  console.log("form Data:", formData)
}, [selectedFirearmID, user?.id, selectedUserFirearm, malfunctions]); 

//^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--













// ----------------------------------------------------------------------------------RETURN STATEMENT-------------------------------------------------------------------

    return (

          <div>

        <div  className="report-form">






            <h1>Range Report</h1>
            <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
        {/* ----------------------------------------------------------------ADD FIREARM FROM COllLLECTION */}
            <h2>- Firearm Used -</h2>
<select value={selectedFirearmID} onChange={handleSelect} className="range-report-firearm-select">
    <option value="">Select Firearm from Collection</option>
    {userFirearms.map((firearm) => (
        <option key={firearm.Firearm.id} value={firearm.Firearm.id}>
            {firearm.Firearm.make} - {firearm.Firearm.model}
        </option>
    ))}
</select>

{/* 
-----------------------------------ADD AMMO SELECTION */}




            {/* <h2 className="text-xl font-semibold">Range Report</h2> */}


{/* 
//-----------------------------------------------------------------------------------IF SELECTED USER FIREARM EXISTS, Display */}
            {selectedUserFirearm && (
  <div>
    {/* Your content here */}



                                                                                        {/* MODIFICATIONS */}
    <div className="range-report-modification-container">

                       <div className="range-report-modification-title">
                <h3>   Firearm Modifications         </h3>
                        </div>

                        <div className="range-report-modification-list">

{/* //--------------------------------------------------------------------------------------DISPLAY MODIFICATIONS */}
            <p>{selectedUserFirearm.slide_mod === 1 ? "• Slide  " : ""}</p>
            <p>{selectedUserFirearm.barrel_mod === 1 ? "• Barrel  " : ""}</p>
            <p>{selectedUserFirearm.s === 1 ? "• Recoil Spring " : ""}</p>
            <p>{selectedUserFirearm.extractor_mod === 1 ? "• Extractor" : ""}</p>
            <p>{selectedUserFirearm.g === 1 ? "• Trigger Group" : ""}</p>
            <p>{selectedUserFirearm.hammer_mod === 1 ? "• Hammer" : ""}</p>
            <p>{selectedUserFirearm.firingpinstriker_mod === 1 ? "• Firing Pin/Striker" : ""}</p> 
            </div>
            <hr></hr>
            </div>





            <div className="range-report-suppressor-optic">
                                                                                       {/* Suppressor Checkbox */}
        <label>
            <input
                type="checkbox"
                name="suppressor"
                checked={formData.suppressor === 1}
                onChange={(e) => setFormData((prev) => ({
                ...prev,
            suppressor: e.target.checked ? 1 : 0, //1 when checked, 0 unchecked
   
        }))}
    />
       : Suppressor Used
            </label>
            </div>

            <div className="range-report-suppressor-optic">
                                                                                        {/* Optic Checkbox */}
            <label>
            <input
                type="checkbox"
                name="optic"
                checked={formData.optic === 1}
                onChange={(e) => setFormData((prev) => ({
                ...prev,
            optic: e.target.checked ? 1 : 0, //1 when checked, 0 unchecked
   
        }))}
    />
   : Optic Used
            </label>
            </div>







                <div>


</div>
                         
        <div className="range-report-date">                                                                              {/* Date Input */}
            <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </label>
        </div>   



            <div>
  
</div>
                                                                                           {/* Rounds Fired Input */}









            <div className="range-report-rounds-fired-container" >

{/* 

           <label  className="range-report-rounds-fired-label">
                Rounds Fired :
                <input type="number" name="rounds_fired" value={formData.rounds_fired}  min="0" onChange={handleChange} className="range-report-rounds-fired-input" />
            </label>
 */}






<div className="range-report-rounds-fired-wrapper">
  <span className="range-report-rounds-fired-label">Rounds Fired:</span>
  <input
    type="number"
    name="rounds_fired"
    value={formData.rounds_fired}
    min="0"
    onChange={handleChange}
    className="range-report-rounds-fired-input"
  />
</div>
</div>






{/* ------------------------------------------------------------------------------MALFUNCTIONS ENCOUNTERED */}
{/* 

            <div className="malfunction-dynamic-section">
  <h2 className="section-title">Malfunctions Encountered</h2>

  {malfunctions.map((entry, index) => (
    <div key={index} className="malfunction-entry">
      <select
        value={entry.type}
        onChange={(e) => handleMalfunctionChange(index, "type", e.target.value)}
        className="malfunction-select"
      >
        <option value="">Select Malfunction Type</option>
        {malfunctionTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <input
        type="number"
        min="0"
        value={entry.count}
        onChange={(e) => handleMalfunctionChange(index, "count", e.target.value)}
        className="malfunction-count"
        placeholder="Count"
      />

      {malfunctions.length > 1 && (
        <button
          type="button"
          onClick={() => removeMalfunction(index)}
          className="remove-button"
        >
          Remove
        </button>
      )}
    </div>
  ))}

  {malfunctions.length < MAX_MALFUNCTIONS && (
    <button
      type="button"
      onClick={addMalfunction}
      className="add-malfunction-button"
    >
      + Add Another Malfunction
    </button>
  )}
</div>

 */}


<div className="malfunction-dynamic-section">
  <h2 className="section-title">Malfunctions Encountered</h2>

  {selectedTypes.map((type, index) => (
    <div key={index} className="malfunction-entry">
      <select
        value={type}
        onChange={(e) => handleTypeSelect(index, e.target.value)}
        className="malfunction-select"
      >
        <option value="">Select Malfunction Type</option>
        {malfunctionTypes
          .filter(t => !selectedTypes.includes(t) || t === type)
          .map((typeOption) => (
            <option key={typeOption} value={typeOption}>{typeOption}</option>
          ))}
      </select>

      <input
        type="number"
        min="0"
        value={malfunctions[type] ?? 0}
        onChange={(e) => handleCountChange(type, e.target.value)}
        className="malfunction-count"
        placeholder="Count"
        disabled={!type}
      />

      <button
        type="button"
        onClick={() => removeMalfunction(index)}
        className="remove-button"
      >
        Remove
      </button>
    </div>
  ))}

  {selectedTypes.length < MAX_MALFUNCTIONS && (
    <button
      type="button"
      onClick={addMalfunction}
      className="add-malfunction-button"
    >
      + Add Another Malfunction
    </button>
  )}
</div>






{/* Catastrophic Malfunction */}
            {/* <label>
                <input
                    type="checkbox"
                    name="catastrophicFailure"
                    checked={formData.catastrophicFailure}
                    onChange={handleChange}
                />
                Did you encounter a Catastrophic Malfunction?
            </label> */}


            <label className="range-report-catastrophic">
            <input
                type="checkbox"
                name="catastrophic"
                checked={formData.catastrophic === 1}
                onChange={(e) => setFormData((prev) => ({
                ...prev,
            catastrophic: e.target.checked ? 1 : 0, //1 when checked, 0 unchecked
   
        }))}
    />
     Did you encounter a Catastrophic Malfunction?
            </label>

<div className="range-report-comments">
                                                                                {/* Comment Box */}
                                                                               <h2>Comments:</h2>
                <label>
             
                <textarea name="comments" value={formData.comments} onChange={handleChange} rows="4" className="range-report-comment-box" cols={40}/>
            </label>
</div>


{/* 
            <button type="button" >
             Submit Report
          </button>
 */}



  <button type="submit" disabled={!selectedUserFirearm}>
    Submit Report
  </button>

{/* 
          <button type="submit" onClick={handleSubmit} disabled={!selectedUserFirearm}>
            Submit Report
          </button> */}






    {/* Add more fields as needed */}
  </div>
)}



<hr></hr>

{/* <div>
    suppressor{formData.suppressor}
</div> */}

{/* ----------------------------------------------------------------------DEBUG MENU---------------------------(HIDDEN)---------------- */}

</form>

</div>



<h4 className="create-report-debug">---Debug Menu---</h4>

<h6>User_id: {formData.user_id}</h6>
<h6>Ammo_id: {formData.ammo_id}</h6>
<h6>Supressor: {formData.suppressor}</h6>
<h6>Optic: {formData.optic}</h6>
<h6>Barrel mod: {formData.barrel_mod}</h6>
<h6>Slide mod: {formData.slide_mod}</h6>
<h6>Recoil: {formData.s}</h6>
<h6>Extractor: {formData.extractor_mod}</h6>
<h6> Hammer: {formData.hammer_mod}</h6>
<h6> Trigger Group: {formData.g}</h6>
<h6>Firing Pin/Striker: {formData.firingpinstriker_mod}</h6>
<h5>Malfunctions</h5>
<h6>Firing: {formData.firing}</h6>
<h6> Unlocking: {formData.unlocking}</h6>
<h6> Extracting: {formData.extracting}</h6>
<h6> Ejecting: {formData.ejecting}</h6>
<h6>Cocking: {formData.cocking}</h6>
<h6> Feeding: {formData.feeding}</h6>
<h6> Chambering: {formData.chambering}</h6>
<h6>Locking: {formData.locking}</h6>
<h6> Magazine: {formData.magazine}</h6>
<h6> Ammunition: {formData.ammunition}</h6>
<h6> Other: {formData.other}</h6>
<h6>Catastrophic: {formData.catastrophic}</h6>






</div>







)}





export default CreateReport;
