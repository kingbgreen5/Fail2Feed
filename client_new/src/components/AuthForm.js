import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import config from "../config";

const AuthForm = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        isRegistering: false,
    });

    // Check if user just verified their email
    const justVerified = new URLSearchParams(location.search).get('verified') === 'true';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = formData.isRegistering ? "/api/auth/register" : "/api/auth/login";
        
        const requestData = formData.isRegistering 
            ? { 
                username: formData.username,
                email: formData.email, 
                password: formData.password 
            }
            : { 
                email: formData.email, 
                password: formData.password 
            };

        console.log("Form data:", formData);
        console.log("Request data:", requestData);
        console.log("Endpoint:", `${config.API_URL}${endpoint}`);
        
        try {
            const response = await fetch(`${config.API_URL}${endpoint}`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(requestData),
                credentials: 'include'
            });

            console.log("Response status:", response.status);
            const data = await response.json();
            console.log("Response data:", data);

            if (response.ok) {
                if (formData.isRegistering) {
                    alert(data.message || "Registration successful! Please check your email to verify your account.");
                    setFormData(prev => ({ ...prev, isRegistering: false }));
                } else {
                    const success = login(data.token);
                    if (success) {
                        alert("Login successful!");
                        navigate('/collection');
                    } else {
                        alert("Error processing login. Please try again.");
                    }
                }
            } else {
                alert(data.message || "Authentication failed.");
            }
        } catch (error) {
            console.error("Authentication error:", error);
            alert("Error connecting to the server. Please make sure the backend is running.");
        }
    };

    return (
        <div className="auth-form">
            {justVerified && (
                <div className="verification-success">
                    Email verified successfully! You can now log in.
                </div>
            )}
            <h2>{formData.isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                {formData.isRegistering && (
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="username" 
                            value={formData.username}
                            placeholder="Username" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                )}
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        placeholder="Email" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        placeholder="Password" 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button type="submit" className="auth-button">
                    {formData.isRegistering ? "Register" : "Login"}
                </button>
            </form>
            <button 
                onClick={() => setFormData(prev => ({ 
                    username: "",
                    email: "",
                    password: "",
                    isRegistering: !prev.isRegistering 
                }))}
                className="toggle-auth-mode"
            >
                {formData.isRegistering ? "Already have an account? Login" : "No account? Register"}
            </button>
        </div>
    );
};

export default AuthForm;
