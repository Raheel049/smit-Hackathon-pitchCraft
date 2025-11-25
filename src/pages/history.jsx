import React, { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import styles from "./history.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const HistoryPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userUid = localStorage.getItem("uid");

    // If NOT logged in → redirect
    if (!userUid) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "pitches"),
      where("userId", "==", userUid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name || "",
        tagline: doc.data().tagline || "",
        pitch: doc.data().pitch || "",
      }));
      setResults(data);
    });

    return () => unsub();
  }, [navigate]);

  return (
    <>
    <Navbar />
    <div className={styles.wrapper}>
      <h2 className={styles.title}>📜 Your Pitch History</h2>

      <div className={styles.cards}>
        {results.length === 0 ? (
          <p className={styles.noResults}>You have no saved pitches yet.</p>
        ) : (
          results.map((item) => (
            <div key={item.id} className={styles.card}>
              <div className={styles.dateCont}>
                <div className={styles.idea}>💡 {item.idea}</div>
                <div className={styles.date}>{item.createdAt?.toDate().toLocaleString()}</div>

              </div>

              <div className={styles.block}>
                <h4>Business Name</h4>
                <p>{item.name}</p>
              </div>

              <div className={styles.block}>
                <h4>Tagline</h4>
                <p>{item.tagline}</p>
              </div>

              <div className={styles.block}>
                <h4>Pitch</h4>
                <p>{item.pitch}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default HistoryPage;
