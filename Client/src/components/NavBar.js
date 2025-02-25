import React from "react";

const NavBar = ({ user, onLogout, setCurrentPage }) => {
  return (
    <nav>
      <ul>
        <li><button onClick={() => setCurrentPage("home")}>Home</button></li>
        <li><button onClick={() => setCurrentPage("createReport")}>Create Report</button></li>
        <li><button onClick={() => setCurrentPage("UserDashboard")}>User Dashboard</button></li>
        {user && <li>Welcome, {user.name}!</li>}
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
