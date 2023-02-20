import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";

const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();
    return (
        <AuthContext.Provider
            value={{
                user: user && user.data,
                setUser,
                Authorization: user && user.Authorization,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export function useAuthContext() {
    return useContext(AuthContext);
}
