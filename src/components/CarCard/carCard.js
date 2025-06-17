import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import CarPlaceholder from "../CarPlaceholder"
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
  
  // Check for images in priority order: thumbnail > featured > default
  const thumbnailImage = car.thumbnailImages && car.thumbnailImages.length > 0 ? car.thumbnailImages[0].url : null
  const firebaseImageUrl = thumbnailImage || (car.featuredImage && car.featuredImage.includes('firebase') ? car.featuredImage : null)

  return (
    <div className={styles.card}>
      <Link 
        to={fields?.slug || `/vehicle/${car.id || ''}`} 
        className={styles.cardLink}
      >
        <div className={styles.imageContainer}>
          {firebaseImageUrl ? (
            <img
              src={firebaseImageUrl}
              alt={`${year} ${make} ${model}`}
              className={styles.carImage}
            />
          ) : imageData ? (
            <GatsbyImage
              image={imageData}
              alt={`${year} ${make} ${model}`}
              className={styles.carImage}
            />
          ) : (
            <CarPlaceholder
              className={styles.imagePlaceholder}
              alt={`${year} ${make} ${model}`}
            />
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