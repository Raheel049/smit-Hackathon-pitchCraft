import React, { useState, useEffect } from "react";
import axios from "axios";
import { addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "./firebase";
import styles from "./dashbord.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [idea, setIdea] = useState("");
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);


  // ⭐ FIREBASE REALTIME LISTENER
  const navigate = useNavigate();

  useEffect(() => {


    const userUid = localStorage.getItem("uid");
    if(!userUid){
      navigate("/");
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
  }, []);

  // ⭐ Generate pitch using AI + save to Firestore
  const handleGeneratePitch = async () => {
    if (!idea.trim()) {
      alert("⚠️ Please enter your idea first!");
      return;
    }

    setLoading(true);
    const userUid = localStorage.getItem("uid");


    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a startup pitch generator. Always reply in STRICT format only. No extra text, no explanation."
            },
            {
              role: "user",
              content: `Create a startup pitch for this idea: "${idea}"\n\nReturn output ONLY in this exact format:\nName: <company name>\nTagline: <short tagline>\nPitch: <full pitch paragraph>`
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const generatedText = response.data.choices[0].message.content;

      // Parse AI response
      const parseAIResponse = (text) => {
        const nameMatch = text.match(/Name:\s*(.*)/i);
        const taglineMatch = text.match(/Tagline:\s*(.*)/i);
        const pitchMatch = text.match(/Pitch:\s*([\s\S]*)/i);
        return {
          name: nameMatch ? nameMatch[1].trim() : "",
          tagline: taglineMatch ? taglineMatch[1].trim() : "",
          pitch: pitchMatch ? pitchMatch[1].trim() : text,
        };
      };

      const parsed = parseAIResponse(generatedText);

      // Save to Firestore
      await addDoc(collection(db, "pitches"), {
        userId: userUid,
        idea,
        generated: generatedText,
        name: parsed.name,
        tagline: parsed.tagline,
        pitch: parsed.pitch,
        createdAt: new Date(),
      });

      // Update local results
      setResults((prev) => [
        {
          id: Date.now().toString(),
          idea,
          generated: generatedText,
          ...parsed,
          createdAt: new Date(),
        },
        ...prev,
      ]);

      setIdea("");
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Filter results based on search term
  const filteredResults = results.filter((item) =>
    item.idea.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
  <Navbar />

    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <h2 className={styles.title}> PitchCraft — AI Business Setup Assistant</h2>

        {/* Input Box */}
        <textarea
          placeholder="Type your business idea here..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className={styles.textarea}
        />

        {/* Generate Button */}
        <button
          onClick={handleGeneratePitch}
          disabled={loading}
          className={`${styles.button} ${loading && styles.disabled}`}
        >
          {loading ? "Generating..." : "Generate Pitch"}
        </button>

        {/* Search bar */}
        <input
          type="text"
          placeholder="Search your pitches..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.search}
        />

        {/* Results */}
        <div className={styles.results}>
          {filteredResults.length === 0 ? (
            <p className={styles.noResults}>No pitches found</p>
          ) : (
            filteredResults.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.ideaBox}>💡 {item.idea}</div>
                <div className={styles.subCard}>
                  <h4>Business Name</h4>
                  <p>{item.name}</p>
                </div>
                <div className={styles.subCard}>
                  <h4>Tagline</h4>
                  <p>{item.tagline}</p>
                </div>
                <div className={styles.subCard}>
                  <h4>Pitch</h4>
                  <p>{item.pitch}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
}
