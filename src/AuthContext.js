import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthentificated, setIsAuthentificated] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [user, setUser] = useState(null);
    console.log(user);  

    const navigate = useNavigate();

    // Connexion
    const login = async (pseudo, password) => {
        try {
            console.log("iciii")
            console.log(pseudo);
            console.log(password);
            const response = await axios.post('http://127.0.0.1:5000/api/v1.0/test', { pseudo, password });
            if (response.status === 200) {
                console.log("logiiin success")
                setIsAuthentificated(true);
                setUser(response.data.user);
                console.log(response.data.user);
                
                navigate('/home');
            }
        } catch(error) {
            console.error("Login failed", error);
            setIsAuthentificated(false)
            if (error.response.status === 401) {
                // Gérer l'erreur 401 ici, par exemple :
                alert("User name or password is incorrect !");
            } else {
                // Gérer d'autres erreurs HTTP ici
                alert("Connection error !");
            }
        }
    };

    // Deconnexion
    const logout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1.0/logout');
            if (response.status === 200) {
                console.log("logout success");
                setIsAuthentificated(false);
                setUser(null);
                navigate('/logout');
            }
        } catch(error) {
            console.error("logout failed", error);
            alert("Decconnection error !")
        }
    };

    // S'enregister
    const signup = async (nom, prenom, pseudo, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/v1.0/signup', {prenom, nom, pseudo, password});
            if (response.status === 200) {
                console.log("signup success");
                alert("Vous êtes bien inscrit, vous pouvez maintenant vous connecter !")
                setIsRegister(true);
                navigate('/login')
            }
        } catch(error) {
            setIsRegister(false);
            console.error("signup failed", error);
            alert("Signup error !")
        }
    };

    //  Permet de lancer le jeu snake
    const launchSnakegame = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/api/v1.0/launchSnake');
            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Failed to launch snake game !", error);
            alert("Failed to launch snake game !");
        }
    }

    // Score du jeu Snake 
    const  scoreSnakeGame = async () => {
        try {
            const response = await axios.get('hhtp://127.0.0.1:5000/api/v1.0/score', {pseudo, score});
            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Failed to save the score !", error);
            alert("Failed to save the score !");
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthentificated, isRegister, user, signup, login, logout, launchSnakegame }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

