import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>PitchCraft</div>

      {/* Desktop Links */}
      <ul className={styles.links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Pitch Features</Link></li>
        <li><Link to="/history">User History</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/contact">Contact</Link></li>

      </ul>

      {/* Mobile Menu Button */}
      <div className={styles.menuBtn} onClick={() => setOpen(!open)}>
        {open ? <HiX size={28} /> : <HiMenu size={28} />}
      </div>

      {/* Mobile Dropdown */}
      <div className={`${styles.mobileMenu} ${open && styles.openMenu}`}>
        <Link onClick={() => setOpen(false)} to="/">Home</Link>
        <Link onClick={() => setOpen(false)} to="/features">Pitch Features</Link>
        <Link onClick={() => setOpen(false)} to="/history">User History</Link>
        <Link onClick={() => setOpen(false)} to="/profile">Profile</Link>
        <Link onClick={() => setOpen(false)} to="/contact">Contact</Link>
      </div>
    </nav>
  );
}
