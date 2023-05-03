import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(
        localStorage.getItem("accessToken") || null
    );

    const login = (token) => {
        localStorage.setItem("accessToken", token);
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthToken(null);
    };

    const isAuthenticated = () => {
        return authToken !== null;
    };

    const value = {
        authToken,
        login,
        logout,
        isAuthenticated,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};