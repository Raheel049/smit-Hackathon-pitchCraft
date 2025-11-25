import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import Navbar from "../components/Navbar";
import styles from "./profile.module.css";
import InputField from "../components/InputField";

export default function ProfilePage() {
  const [user, setUser] = useState({ name: "", email: "", phone: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const uid = localStorage.getItem("uid");
      if (!uid) return navigate("/"); // redirect if not logged in

      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      }
    };

    fetchUser();
  }, [navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("uid");
    navigate("/");
  };

  // Edit Profile → update Firestore
  const editProfile = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("uid");
      if (!uid) return;

      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.pageWrapper}>
        <h1 className={styles.title}>My Profile</h1>

        <div className={styles.card}>
          <div className={styles.avatarWrapper}>
            <User size={80} />
          </div>

          <InputField
            className={styles.inputField}
            value={user.name || ""}
            placeholder="Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            className={styles.inputField}
            value={user.email || ""}
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            disabled
          />
          <InputField
            className={styles.inputField}
            value={user.phone || ""}
            placeholder="Phone"
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />

          <div className={styles.buttons}>
            <button
              className={styles.editBtn}
              onClick={editProfile}
              disabled={loading}
            >
              {loading ? "Updating..." : "Edit Profile"}
            </button>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
