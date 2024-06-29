import { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(() => {
        const savedRole = localStorage.getItem("role");
        return savedRole ? JSON.parse(savedRole) : null;
    });
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem("token");
        return savedToken ? JSON.parse(savedToken) : null;
    });
    const navigate = useNavigate();

    const LoginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:3002/user/login", data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRole(response.data.role);
            if (response.data && response.data.token) {
                setToken(response.data.token);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                navigate('/');
            }
            localStorage.setItem('role', JSON.stringify(response.data.role));
            if (response.data.role === "admin") {
                navigate('/');
            } else if (response.data.role === "user") {
                navigate('/');
            }
            return;
        } catch (err) {
            console.log(err);
        }
    };

    const logOut = () => {
        setToken(null);
        setRole(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ token, role, LoginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
