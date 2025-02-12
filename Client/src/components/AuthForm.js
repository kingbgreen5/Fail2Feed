import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const AuthForm = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        isRegistering: false,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = formData.isRegistering ? "/api/auth/register" : "/api/auth/login";
        
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: formData.username, password: formData.password }),
        });

        const data = await response.json();
        if (response.ok) {
            login(data.token);
            alert("Authentication successful!");
        } else {
            alert(data.message || "Authentication failed.");
        }
    };

    return (
        <div>
            <h2>{formData.isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">{formData.isRegistering ? "Register" : "Login"}</button>
            </form>
            <button onClick={() => setFormData({ ...formData, isRegistering: !formData.isRegistering })}>
                {formData.isRegistering ? "Already have an account? Login" : "No account? Register"}
            </button>
        </div>
    );
};

export default AuthForm;
