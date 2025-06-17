import React, { useState } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./header.module.css"
import logoImage from "../../images/ph-logo.png"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/" onClick={closeMenu}>
            <img
              src={logoImage}
              alt="PH Aqui - Car Dealership"
              className={styles.logoImage}
              width="150"
              height="50"
            />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Desktop Navigation */}
        <div className={styles.navAndButton}>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li><Link to="/" activeClassName={styles.active}>Home</Link></li>
              <li><Link to="/about" activeClassName={styles.active}>About Us</Link></li>
              <li><Link to="/services" activeClassName={styles.active}>Services</Link></li>
              <li><Link to="/inventory" activeClassName={styles.active}>Inventory</Link></li>
              <li><Link to="/contact" activeClassName={styles.active}>Contact Us</Link></li>
            </ul>
          </nav>
          
          <Link to="/contact" className={styles.standaloneButton}>
            Get Started
          </Link>
        </div>

        {/* Mobile Navigation Menu */}
        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
          <ul className={styles.mobileNavList}>
            <li><Link to="/" activeClassName={styles.active} onClick={closeMenu}>Home</Link></li>
            <li><Link to="/about" activeClassName={styles.active} onClick={closeMenu}>About Us</Link></li>
            <li><Link to="/services" activeClassName={styles.active} onClick={closeMenu}>Services</Link></li>
            <li><Link to="/inventory" activeClassName={styles.active} onClick={closeMenu}>Inventory</Link></li>
            <li><Link to="/contact" activeClassName={styles.active} onClick={closeMenu}>Contact Us</Link></li>
            <li>
              <Link to="/contact" className={styles.mobileButton} onClick={closeMenu}>
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header