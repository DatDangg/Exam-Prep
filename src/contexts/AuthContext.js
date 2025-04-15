import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserID] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUserID(JSON.parse(savedUser));
        }
        setIsLoadingUser(false);
    }, []);

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/users/login",
                { email: email, password: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.data) {
                setUserID(res.data.userId);
                localStorage.setItem("user", JSON.stringify(res.data.userId));
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
        setUserID(null);
        localStorage.removeItem("user");
    };

    const register = async (data) => {
        try {
            console.log(data);
            await axios.post("http://localhost:8080/api/users/register", data, {
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
                userId,
                isAuthenticated: !!userId,
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
