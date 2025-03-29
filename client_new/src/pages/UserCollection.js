import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserFirearmSelect from "../components/UserFirearmSelect";
import UserFirearmList from "../components/UserFirearmList";

const UserCollection = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <h6>
                User Role: {user.role} | User ID: {user.id}
            </h6>
     
   
        <div>
            <UserFirearmList />
            <UserFirearmSelect />
        </div>

  
  
        </div>
    );
};

export default UserCollection;
