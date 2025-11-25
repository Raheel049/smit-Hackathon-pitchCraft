import React, { useState } from 'react';
import InputField from '../components/InputField';
import ButtonCmp from '../components/ButtonCmp';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./login.module.css";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem("uid", response.user.uid);
            navigate("/dashbord");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={styles.wrapper}>
            
            {/* Title */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={styles.title}
            >
                <LogIn size={35} /> Login to Your Account
            </motion.h1>

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={styles.loginCard}
            >
                <InputField 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    type='password'
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <div className={styles.footer}>
                    <p>
                        Create Account?  
                        <Link to="/signup" className={styles.signupLink}> Sign Up</Link>
                    </p>

                    <ButtonCmp onClick={login} title="Login" />
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
