import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Wand2, Database, Zap } from "lucide-react";
import styles from "./features.module.css";
import Navbar from "../components/Navbar";

export default function FeaturesPage() {
  const features = [
    {
      icon: <Rocket size={40} />,
      title: "AI Startup Pitch Generator",
      desc: "Generate powerful business pitches instantly using advanced AI.",
    },
    {
      icon: <Wand2 size={40} />,
      title: "Auto Branding",
      desc: "Get unique business names and taglines crafted automatically.",
    },
    {
      icon: <Database size={40} />,
      title: "Save & Manage Pitches",
      desc: "Your generated pitches are securely stored and always accessible.",
    },
    {
      icon: <Zap size={40} />,
      title: "Fast & Reliable",
      desc: "Lightning‑fast AI responses with real‑time database syncing.",
    },
  ];

  return (
    <>
    <Navbar />
    <div className={styles.pageWrapper}>
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.header}
      >
        <Sparkles /> PitchCraft Features
      </motion.h1>

      {/* FEATURES GRID */}
      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(140,0,255,0.5)" }}
            className={styles.card}
          >
            <div className={styles.cardIcon}>{f.icon}</div>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    </>
  );
}
