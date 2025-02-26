import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // if (token) setUser(token);

        if (token) {
            try {
                const decodedUser = jwtDecode(token); // Decode user data from JWT
                setUser(decodedUser);
            } catch (error) {
                console.error("Invalid token", error);
                setUser(null);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
