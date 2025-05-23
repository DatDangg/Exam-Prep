import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const API = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoadingUser(false);
    }, []);

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(
                `${API}/users/login`,
                { email: email, password: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data) {
                const data = {userId: res.data.userId, role: res.data.role, username: res.data.username, account: res.data.accountType} 
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.error("Lỗi khi đăng nhập:", err);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const register = async (data) => {
        try {
            console.log(data);
            await axios.post(`${API}/users/register`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            login({ email: data.email, password: data.password });
        } catch (err) {
            console.error("Lỗi khi đăng ký:", err);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoadingUser,
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
