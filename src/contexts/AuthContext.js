import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        setIsLoadingUser(false);
      }, []);

    const generateUserId = async () => {
        try {
            const res = await axios.get("http://localhost:3001/users");
            const users = res.data;

            const maxId = users.reduce((max, u) => {
                const match = u.id?.match(/^EXAM(\d+)$/);
                const num = match ? parseInt(match[1]) : 0;
                return Math.max(max, num);
            }, 0);

            return `EXAM${maxId + 1}`;
        } catch (err) {
            console.error("Lỗi khi tạo ID:", err);
            return `EXAM1`; 
        }
    };

    const login = async ({ email, password }) => {
        try {
            const res = await axios.get("http://localhost:3001/users");
            const users = res.data;
            const foundUser = users.find(
                (user) => user.email === email && user.password === password
            );
    
            if (foundUser) {
                setUser(foundUser);
                localStorage.setItem("user", JSON.stringify(foundUser));
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
        const newId = await generateUserId();
    
        const newUser = {
            id: newId,
            ...data
        };
    
        try {
            await axios.post("http://localhost:3001/users", newUser);
            const now = new Date();
            const creationDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            const newUserInfor = {
                id: newId,
                accountType: "Miễn phí",
                examCount: 0,
                phoneNumber: '',
                creationDate: creationDate
            };
    
            await axios.post("http://localhost:3001/userInfor", newUserInfor);
    
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
