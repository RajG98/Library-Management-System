import axios from "axios";
import React, { createContext, useContext, useState } from "react";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    
    const login = async (userData) => {
        try {
            const response = await axios.post("http://localhost:8080/login", userData, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
            if (response.status === 200) {
                console.log("Login Successful");
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
                
            }
        } catch (e) {
            console.log("Login Failed: " + e);
            alert("Invalid credentials");
        }
    }
    const logout = async () => {
        const response = await axios.post("http://localhost:8080/logout");
        console.log(response.data);
        localStorage.removeItem("user");
        setUser(null);
        
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}