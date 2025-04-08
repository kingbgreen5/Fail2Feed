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
            recoilSpring_mod:0,
            triggerGroup_mod:0,
            hammer_mod:0,
            firingPinStriker_mod:0,
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
        recoilSpring_mod:selectedUserFirearm?.recoilSpring_mod ?? 0,
        triggerGroup_mod:selectedUserFirearm?.triggerGroup_mod ?? 0,
        firingPinStriker_mod:selectedUserFirearm?.firingPinStriker_mod ?? 0,
    }));
    console.log("Form Data:", formData)
}, [selectedFirearmID, user?.id, selectedUserFirearm]);

//^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--^--







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
        
            console.log("Form Data", { ...formData, [name]: newValue });
        };
        









        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     console.log("Form Submitted:", formData);
        // };

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
                    recoilSpring_mod: 0,
                    triggerGroup_mod: 0,
                    hammer_mod: 0,
                    firingPinStriker_mod: 0,
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
        



// ----------------------------------------------------------------------------------RETURN STATEMENT-------------------------------------------------------------------

    return (

        
        <div  className="report-form">





        <form>
            <h1>Range Report</h1>

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



<form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
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
            <p>{selectedUserFirearm.recoilSpring_mod === 1 ? "• Recoil Spring " : ""}</p>
            <p>{selectedUserFirearm.extractor_mod === 1 ? "• Extractor" : ""}</p>
            <p>{selectedUserFirearm.triggerGroup_mod === 1 ? "• Trigger Group" : ""}</p>
            <p>{selectedUserFirearm.hammer_mod === 1 ? "• Hammer" : ""}</p>
            <p>{selectedUserFirearm.firingPinStriker_mod === 1 ? "• Firing Pin/Striker" : ""}</p> 
            </div>
            </div>

<hr></hr>



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

<div className="range-report-rounds-fired" >
                                                                                           {/* Rounds Fired Input */}
            <label>
                Rounds Fired :
                <input type="number" name="rounds_fired" value={formData.rounds_fired}  min="0" onChange={handleChange} />
            </label>


</div>
            <h2 className="text-lg font-semibold">Malfunctions Encountered</h2>




            <div className="malfunction-section-container">
  <h2 className="section-title">Firearm Malfunctions</h2>

  <div className="malfunction-grid">
    {/* Left Column */}
    <div className="malfunction-column">
      <label className="malfunction-card">
        Firing
        <input type="number" name="firing" value={formData.firing} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Unlocking
        <input type="number" name="unlocking" value={formData.unlocking} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Extracting
        <input type="number" name="extracting" value={formData.extracting} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Ejecting
        <input type="number" name="ejecting" value={formData.ejecting} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Cocking
        <input type="number" name="cocking" value={formData.cocking} onChange={handleChange} className="malfunction-input" />
      </label>
    </div>

    {/* Right Column */}
    <div className="malfunction-column">
      <label className="malfunction-card">
        Feeding
        <input type="number" name="feeding" value={formData.feeding} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Chambering
        <input type="number" name="chambering" value={formData.chambering} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Locking
        <input type="number" name="locking" value={formData.locking} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Magazine 
        <input type="number" name="magazine" value={formData.magazine} onChange={handleChange} className="malfunction-input" />
      </label>

      <label className="malfunction-card">
        Ammunition
        <input type="number" name="ammunition" value={formData.ammunition} onChange={handleChange} className="malfunction-input" />
      </label>
    </div>
  </div>


  
</div>




{/* 

<div >
            <label className="range-report-malfunction-card">
                    Firing:
                <input type="number" name="firing" value={formData.firing} onChange={handleChange} className="range-report-malfunctions-field"/>
            </label>
 
            <label className="range-report-malfunction-card">
            Unlocking:
                <input type="number" name="unlocking" value={formData.unlocking} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

            <label className="range-report-malfunction-card">
            Extracting:
                <input type="number" name="extracting" value={formData.extracting} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

</div>


<div>
            <label className="range-report-malfunction-card">
                    Ejecting
                <input type="number" name="ejecting" value={formData.ejecting} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

            <label className="range-report-malfunction-card">
            Cocking
                <input type="number" name="cocking" value={formData.cocking} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

            <label className="range-report-malfunction-card">
            Feeding
                <input type="number" name="feeding" value={formData.feeding} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

</div>



<div>
<label className="range-report-malfunction-card">

            Chambering 
                <input type="number" name="chambering" value={formData.chambering} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

            <label className="range-report-malfunction-card">
                    Locking 
                <input type="number" name="locking" value={formData.locking} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>


</div>

<div>
<label>
                    Magazine Failure
                <input type="number" name="magazine" value={formData.magazine} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

</div>




<div>
<label>
                    Ammunition Failure
                <input type="number" name="ammunition" value={formData.ammunition} onChange={handleChange} className="range-report-malfunctions-field" />
            </label>

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

            <button type="button" onClick={handleSubmit}>
    Submit Report
</button>









    {/* Add more fields as needed */}
  </div>
)}



<hr></hr>

{/* <div>
    suppressor{formData.suppressor}
</div> */}

{/* ----------------------------------------------------------------------DEBUG MENU---------------------------(HIDDEN)---------------- */}



{/* <h4 className="create-report-debug">---Debug Menu---</h4

<h6>User_id: {formData.user_id}</h6>
<h6>Ammo_id: {formData.ammo_id}</h6>
<h6>Supressor: {formData.suppressor}</h6>
<h6>Optic: {formData.optic}</h6>
<h6>Barrel mod: {formData.barrel_mod}</h6>
<h6>Slide mod: {formData.slide_mod}</h6>
<h6>Recoil: {formData.recoilSpring_mod}</h6>
<h6>Extractor: {formData.extractor_mod}</h6>
<h6> Hammer: {formData.hammer_mod}</h6>
<h6> Trigger Group: {formData.triggerGroup_mod}</h6>
<h6>Firing Pin/Striker: {formData.firingPinStriker_mod}</h6>
 */}


        </form>
        </form>




    </div>





)}





export default CreateReport;
