import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "./carCard.module.css"

const CarCard = ({ car }) => {
  // Safely destructure with fallbacks
  const { 
    frontmatter = {}, 
    fields = {} 
  } = car || {}

  const { 
    make = 'Unknown Make', 
    model = 'Unknown Model', 
    year = '', 
    price = 0, 
    featuredImage = null 
  } = frontmatter

  // Handle missing image data
  const imageData = featuredImage?.childImageSharp?.gatsbyImageData || null

  return (
    <div className={styles.card}>
      <Link 
        to={fields?.slug || `/vehicle/${car.id || ''}`} 
        className={styles.cardLink}
      >
        <div className={styles.imageContainer}>
          {imageData ? (
            <GatsbyImage
              image={imageData}
              alt={`${year} ${make} ${model}`}
              className={styles.carImage}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              Image not available
            </div>
          )}
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.carTitle}>
            {year} {make} {model}
          </h3>
          <p className={styles.carPrice}>
            ${typeof price === 'number' ? price.toLocaleString() : '0'}
          </p>
          <div className={styles.cardFooter}>
            <span className={styles.detailsLink}>View Details →</span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CarCard