import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";




const CreateReport = () => {
    const [userFirearms, setUserFirearms] = useState([]);
    const [selectedFirearmID, setSelectedFirearmID] =useState("")
    const [selectedUserFirearm, setSelectedUserFirearm] = useState(null);
    const [selectedAmmo,setSelectedAmmo] = useState(null);

//------------------------------------------------------------------------- GETS USERS FIREARMS
    useEffect(() => {
        // console.log(firearms)
          const token = localStorage.getItem("token");
          // console.log("Token from local storage",token)
          axios.get(`${config.API_URL}/api/userFirearms`, { 
              headers: { Authorization: `Bearer ${token}` } 
          })
          .then(response => setUserFirearms(response.data))
          .catch(error => console.error("Error fetching user firearms:", error));
      }, [console.log(userFirearms)]);
  

      const handleSelect = (e) => {
        const id = parseInt(e.target.value, 10); // Convert value to integer
        setSelectedFirearmID(id);
        // Find the firearm in userFirearms that matches the selected ID
        const firearm = userFirearms.find(f => f.Firearm.id === id);
        setSelectedUserFirearm(firearm || null); // Set to null if not found
    };
    

    // const RangeReportForm = ({ selectedUserFirearm, ammoOptions }) => {
        const [formData, setFormData] = useState({
            user_id:"",
            firearm_id:selectedFirearmID,
            ammo: "",
            suppressor: false,
            optic: false,
            modificationLevel: 1,
            date: new Date().toISOString().split("T")[0], // Default to today's date
            manufactureYear: "",
            roundsFired: "",
            malfunctions: {
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
            },
            catastrophicFailure: false,
            comments: "",
        });
    
        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        };
    
        const handleMalfunctionChange = (e) => {
            const { name, checked } = e.target;
            setFormData((prev) => ({
                ...prev,
                malfunctions: {
                    ...prev.malfunctions,
                    [name]: checked,
                },
            }));
        };
    
        const handleSubmit = (e) => {
            // e.preventDefault();
            console.log("Form Submitted:", formData);
        };






// ----------------------------------------------------------------------------------RETURN STATEMENT-------------------------------------------------------------------

    return (
        <div>
        <form>
            <h1>Range Report</h1>
        {/* ----------------------------------------------------------------ADD FIREARM FROM COllLLECTION */}
            <h2>Firearm Used</h2>
            <h3>Add from Collection</h3>




<select value={selectedFirearmID} onChange={handleSelect}>
    <option value="">Select Firearm from Collection</option>
    {userFirearms.map((firearm) => (
        <option key={firearm.Firearm.id} value={firearm.Firearm.id}>
            {firearm.Firearm.make} - {firearm.Firearm.model}
        </option>
    ))}
</select>

{/* 
-----------------------------------ADD AMMO SELECTION */}
{/* 
 <select value={selectedFirearmID} onChange={handleSelect}>
    <option value="">Ammunition used: </option>
    {userFirearms.map((firearm) => (
        <option key={firearm.Firearm.id} value={firearm.Firearm.id}>
            {firearm.Firearm.make} - {firearm.Firearm.model}
        </option>
    ))}
</select>  */}


<form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Range Report</h2>

            {/* Ammo Selection Dropdown */}
            <label>
                Ammo Selection:
                {/* <select name="ammo" value={formData.ammo} onChange={handleChange}>
                    <option value="">Select Ammo</option>
                    {ammoOptions.map((ammo) => (
                        <option key={ammo.id} value={ammo.name}>
                            {ammo.name}
                        </option>
                    ))}
                </select> */}

            </label>

            <div>
                                                                                       {/* Suppressor Checkbox */}
            <label>
                <input type="checkbox" name="suppressor" 
                checked={formData.suppressor} onChange={handleChange} />
                Suppressor Used
            </label>
            </div>

            <div>
                                                                                        {/* Optic Checkbox */}
            <label>
                <input type="checkbox" name="optic" 
                checked={formData.optic} onChange={handleChange} />
                Optic Used
            </label>
            </div>

                <div>
                                                                                      {/* MODIFICATIONS */}
            <label>
                Modification Level: {formData.modificationLevel}
                <input
                    type="range"
                    name="modificationLevel"
                    min="0"
                    max="5"
                    value={formData.modificationLevel}
                    onChange={handleChange}
                />

            </label>
</div>
                                                                                                  {/* Date Input */}
            <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </label>
            <div>
            {/* Year of Manufacture */}
            {/* <label>
                Year of Manufacture(If known): 
                <input type="number" name="manufactureYear" value={formData.manufactureYear} onChange={handleChange} />
            </label> */}
</div>
<div>
                                                                                           {/* Rounds Fired Input */}
            <label>
                Rounds Fired with this Ammo:
                <input type="number" name="roundsFired" value={formData.roundsFired} onChange={handleChange} />
            </label>


</div>
            <h3 className="text-lg font-semibold">Malfunctions Encountered</h3>


<div>
            <label>
                    Firing
                <input type="number" name="Firing" value={formData.firing} onChange={handleChange} />
            </label>

            <label>
            Unlocking
                <input type="number" name="unlocking" value={formData.unlocking} onChange={handleChange} />
            </label>

            <label>
            Extracting
                <input type="number" name="Extracting" value={formData.extracting} onChange={handleChange} />
            </label>

</div>


<div>
            <label>
                    Ejecting
                <input type="number" name="Ejecting" value={formData.ejecting} onChange={handleChange} />
            </label>

            <label>
            Cocking
                <input type="number" name="Cocking" value={formData.cocking} onChange={handleChange} />
            </label>

            <label>
            Feeding
                <input type="number" name="Feeding" value={formData.feeding} onChange={handleChange} />
            </label>

</div>
<div>

</div>


<div>
<label>
            Chambering 
                <input type="number" name="Chambering" value={formData.chambering} onChange={handleChange} />
            </label>
            <label>
                    Locking 
                <input type="number" name="Locking" value={formData.locking} onChange={handleChange} />
            </label>


</div>

<div>
<label>
                    Magazine Failure
                <input type="number" name="Magazine" value={formData.magazine} onChange={handleChange} />
            </label>

</div>




<div>
<label>
                    Ammunition Failure
                <input type="number" name="Ammunition" value={formData.ammunition} onChange={handleChange} />
            </label>

</div>




                                                                                   {/* Malfunctions /}
            {Object.keys(formData.malfunctions).map((malfunction) => (
                <label key={malfunction}>
                    <input
                        type="checkbox"
                        name={malfunction}
                        checked={formData.malfunctions[malfunction]}
                        onChange={handleMalfunctionChange}
                    />
                    {malfunction.charAt(0).toUpperCase() + malfunction.slice(1)}
                </label>
            ))}

                                                                     // {/* Catastrophic Malfunction */}
            <label>
                <input
                    type="checkbox"
                    name="catastrophicFailure"
                    checked={formData.catastrophicFailure}
                    onChange={handleChange}
                />
                Did you encounter a Catastrophic Malfunction?
            </label>


<div>
                                                                                {/* Comment Box */}
                <label>
                Comments:
                <textarea name="comments" value={formData.comments} onChange={handleChange} rows="4" />
            </label>

            {/* Submit Button */}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit Report
            </button>
</div>


        </form>



            <div>
                <h2>Selected Firearm ID: {selectedFirearmID} </h2>
            </div>

         
        </form>

    </div>
)}


{/* ----------------------------------CHANGE TO DISPLAY ONCE ALL NECESSARY DATA HAS BEEN FILLED IN */}

 
// </div>

//     );
// };

export default CreateReport;
