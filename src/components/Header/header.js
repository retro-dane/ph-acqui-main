import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import * as styles from "./header.module.css"
import logoImage from "../../images/ph-logo.png"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              src={logoImage}
              alt="PH Aqui - Car Dealership"
              className={styles.logoImage}
              width="150"
              height="50"
            />
          </Link>
        </div>
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
          
          <Link to="/get-started" className={styles.standaloneButton}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header