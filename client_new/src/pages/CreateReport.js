import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import config from "../config";
import AuthContext from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import ReportForm from "../components/ReportForm";

const CreateReport = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
console.log("isAuthenticated:", isAuthenticated);
console.log("user:", user);
console.log("Create Report Page Rendered");

//------------------------------------------------------------Conditional Rendering based on Authentication------------------------------------------------------------

return (
<div>
    {isAuthenticated ? (
         <>
            <ReportForm />
         </>
       ) : (
        <div>
          <p>Please log in to Create a Report.</p>             
              <AuthForm />
        </div>
       )}
 </div>
)}

export default CreateReport;
