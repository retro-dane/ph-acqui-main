// src/components/Navbar/index.js
import React, { useState } from "react"
import { Link } from "gatsby"
import * as styles from "./navbar.module.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { text: "About Us", url: "/about" },
    { text: "Services", url: "/services" },
    { text: "Inventory", url: "/inventory" },
    { text: "Contact Us", url: "/contact" },
  ]

  return (
    <nav className={styles.navbar}>
      <button 
        className={styles.mobileMenuButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>
      
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.url} 
              activeClassName={styles.active}
              partiallyActive={true}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar