import React, { useState } from "react";
import Login from "./components/Login";
import './App.css';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <div>
      <h1>Fail2Feed</h1>
      <p>Firearm Reliabilty Data</p>
      <Login></Login>
    </div>
    // <div>
    //   {token ? (
    //     <h1>Welcome! You're logged in.</h1>
    //   ) : (
    //     <Login onLoginSuccess={setToken} />
    //   )}
    // </div>
  );
};

export default App;
