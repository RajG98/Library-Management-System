import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [loading, setLoading] = useState(true);
    const login = async (userData) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/login`,
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                // Now fetch the authenticated user info
                const authCheck = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/check-auth`,
                    { withCredentials: true }
                );

                if (authCheck.status === 200) {
                    const loggedInUser = authCheck.data; // e.g., { username: "admin" }
                    localStorage.setItem("user", JSON.stringify(loggedInUser));
                    setUser(loggedInUser);
                    console.log("Login successful for", loggedInUser.username);
                }
            }
        } catch (e) {
            console.log("Login Failed: " + e);
            alert("Invalid credentials");
        }
    };

    const logout = async () => {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/logout`, null, {
            withCredentials: true,
        });
        console.log(response.data);
        localStorage.removeItem("user");
        setUser(null);

    }
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/check-auth`, { withCredentials: true });
                setUser(res.data);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    },[])
    return (
        <AuthContext.Provider value={{ user,loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}