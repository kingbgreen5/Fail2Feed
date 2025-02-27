import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
// import UserFirearmList from "../components/UserFirearmList";



const CreateReport = () => {
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [selectedMake, setSelectedMake] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [userFirearms, setUserFirearms] = useState([]);
    const [selectedFirearm, setSelectedFirearm] =useState("")


// GET USERS FIREARMS
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
  
  





    useEffect(() => {
        axios.get("http://localhost:5000/api/firearms/makes")
            .then(response => setMakes(response.data))
            .catch(error => console.error("Error fetching makes:", error));
    }, []);

    useEffect(() => {
        if (selectedMake) {
            axios.get(`http://localhost:5000/api/firearms/models?make=${selectedMake}`)
                .then(response => {
                    setModels(response.data || []);
                })
                .catch(error => {
                    console.error("Error fetching models:", error);
                    setModels([]);
                });
        } else {
            setModels([]);
        }
    }, [selectedMake]);

    return (
        <div>
        <form>
            <h1>Range Report</h1>
        
            <h2>Firearm Used</h2>
            <h3>Add from Collection</h3>
            <div> 
                <label> </label>
                <select value={selectedFirearm} onChange={(e) => setSelectedMake(e.target.value)}>
                    <option value="">Select Firearm from Collection</option>
                    {userFirearms.map((firearm, index) => (
                          <option key={index} value={firearm.Firearm.id}>
                          {firearm.Firearm.make} - {firearm.Firearm.model}
                      </option>
                    ))}
                </select>
            </div>

<h3>
    Add by Make/Model
</h3>

            <div> 
                <label>Manufacturer: </label>
                <select value={selectedMake} onChange={(e) => setSelectedMake(e.target.value)}>
                    <option value="">Select Make</option>
                    {makes.map((make, index) => (
                        <option key={index} value={make}>{make}</option>
                    ))}
                </select>
            </div>
            <div> 
                <label>Model: </label>
                <select 
                    value={selectedModel} 
                    onChange={(e) => setSelectedModel(e.target.value)} 
                    disabled={!selectedMake || models.length === 0}
                >
                    <option value="">{models.length === 0 ? "No models available" : "Select Model"}</option>
                    {models.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                    ))}
                </select>
            </div>
            <div>
                <h2>FIREARM: {selectedMake} {selectedModel}</h2>
            </div>

            <button type="submit">Submit Report</button>
        </form>

{/* <div> <UserFirearmList /> </div>  */}
 
</div>
    );
};

export default CreateReport;
