// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const NavBar = () => {
//   const { user, isAuthenticated, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <ul>
//         {isAuthenticated ? (
//           <>
          
//           <li><Link to="/guns">The Data</Link></li>
//             <li><Link to="/collection">My Collection</Link></li>
//             <li><Link to="/create-report">Create Report</Link></li>
//             <li><Link to="/search">Advanced Search</Link></li>




//             {/* <li><Link to="/guns">Guns</Link></li> */}
//             {/* {user && 
//             <li>Welcome, {user.email}!</li>
//             } */}
//             <li><button onClick={handleLogout}>Logout</button></li>
//           </>
//         ) : (
//           <li><Link to="/login">Login</Link></li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default NavBar;


import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <NavLink to="/guns" className={({ isActive }) => isActive ? "active" : ""}>
                The Data
              </NavLink>
            </li>
            <li>
              <NavLink to="/collection" className={({ isActive }) => isActive ? "active" : ""}>
                My Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/create-report" className={({ isActive }) => isActive ? "active" : ""}>
                Create Report
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => isActive ? "active" : ""}>
                Advanced Search
              </NavLink>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login" className={({ isActive }) => isActive ? "active" : ""}>
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
