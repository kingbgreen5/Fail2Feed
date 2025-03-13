import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserFirearmSelect from "../components/UserFirearmSelect";
import UserFirearmList from "../components/UserFirearmList";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div>
            <div>
                User Role: {user.role}
            </div>
        <div>
            User ID: {user.id}
        <div>
        <UserFirearmSelect />
            <UserFirearmList />

        </div>

        </div>
  
        </div>
    );
};

export default UserDashboard;
