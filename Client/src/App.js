import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import NavBar from "./components/NavBar";
import CreateReport from "./pages/CreateReport";
import "./App.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // Track which page to show

  useEffect(() => {
    if (token) {
      fetch("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Failed to fetch user", err));
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCurrentPage("home"); // Reset to home page on logout
  };

  return (
    <div>
      <h1>Fail2Feed</h1>
      <p>Firearm Reliability Data</p>

      {token ? (
        <>
          <NavBar user={user} onLogout={handleLogout} setCurrentPage={setCurrentPage} />
          
          Conditionally render pages
          {/* {currentPage === "home" && <HomePage />} */}
          {currentPage === "createReport" && <CreateReport />}
        </>
      ) : (
        <Login onLoginSuccess={setToken} />
      )}
    </div>
  );
};

export default App;
