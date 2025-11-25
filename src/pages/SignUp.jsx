import React, { useState } from 'react';
import InputField from '../components/InputField';
import ButtonCmp from '../components/ButtonCmp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import styles from "./SignUp.module.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function SignUp() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            const uid = response.user.uid

            await setDoc(doc(db, "users", uid), {
                name,
                phone,
                email
            });

            navigate("/");

            
        } catch (error) {
            alert(error.message);
        }
    };



    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                
                <h1 className={styles.title}>Create Account</h1>
                <p className={styles.subtitle}>Join PitchCraft and start generating amazing pitches</p>

                <InputField
                    placeholder="Enter your full name"
                    value={name}
                    className={styles.inputField}
                    onChange={(e) => setName(e.target.value)}
                />

                <InputField
                    placeholder="Enter your mobile number"
                    value={phone}
                    type="text"
                    className={styles.inputField}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <InputField
                    placeholder="Enter your email"
                    value={email}
                    className={styles.inputField}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    className={styles.inputField}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <ButtonCmp
                    onClick={signUp}
                    title="Sign Up"
                    className={styles.button}
                />

                <p className={styles.loginText}>
                    Already have an account?{" "}
                    <Link to="/" className={styles.link}>Login</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
