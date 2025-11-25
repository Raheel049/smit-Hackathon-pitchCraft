import React from "react";
import { motion } from "framer-motion";
import styles from "./contact.module.css";
import { Mail, Phone, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";
import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <>
    <Navbar />
    <div className={styles.pageWrapper}>
      
      {/* HEADER */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={styles.title}
      >
        Contact Us
      </motion.h1>

      {/* CONTACT CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={styles.contactBox}
      >
        {/* LEFT INFO */}
        <div className={styles.left}>
          <h2 className={styles.heading}>Get in Touch</h2>
          <p className={styles.text}>
            Have questions or want to work with us?  
            Send us a message and we’ll get back to you soon!
          </p>

          <div className={styles.info}>
            <p><Mail size={20} /> raheel25031@gmail.com</p>
            <p><Phone size={20} /> +92 305 8093023</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className={styles.form}>
          <input type="email" placeholder="Your Email" className={styles.input} />
          <input type="text" placeholder="Your Contact Number" className={styles.input} />
          <textarea placeholder="Write your message..." className={styles.textarea}></textarea>

          <button className={styles.btn}>Send Message</button>
        </form>
      </motion.div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <a><Facebook /></a>
        <a><Linkedin /></a>
        <a><Twitter /></a>
        <a><MessageCircle /></a>
      </div>

    </div>
    </>
  );
}
