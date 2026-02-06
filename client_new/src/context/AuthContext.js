// import { createContext, useState, useEffect } from 'react';
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             try {
//                 const decodedUser = jwtDecode(token);
//                 setUser(decodedUser);
//                 setIsAuthenticated(true);
//             } catch (error) {
//                 console.error("Invalid token", error);
//                 localStorage.removeItem('token');
//                 setUser(null);
//                 setIsAuthenticated(false);
//             }
//         }
//     }, []);

//     const login = (token) => {
//         try {
//             localStorage.setItem('token', token);
//             const decodedUser = jwtDecode(token);
//             setUser(decodedUser);
//             setIsAuthenticated(true);
//             return true;
//         } catch (error) {
//             console.error("Login error:", error);
//             return false;
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         setUser(null);
//         setIsAuthenticated(false);
//     };

//     return (
//         <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthContext;



import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    const isTokenExpired = (decodedToken) => {
        if (!decodedToken?.exp) return true;
        return decodedToken.exp * 1000 < Date.now();
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decodedUser = jwtDecode(token);

            if (isTokenExpired(decodedUser)) {
                logout();
            } else {
                setUser(decodedUser);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error("Invalid token", error);
            logout();
        }
    }, []);

    const login = (token) => {
        try {
            const decodedUser = jwtDecode(token);

            if (isTokenExpired(decodedUser)) {
                logout();
                return false;
            }

            localStorage.setItem('token', token);
            setUser(decodedUser);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
