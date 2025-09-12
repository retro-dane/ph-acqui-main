import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../../components/Layout"
import { useVehicles } from "../../hooks/useVehicles"
import heroCarImage from "../../images/hero-car.png"
import "../../styles/vehicle-detail.css"

const VehicleDetailPage = ({ params, data }) => {
  const { allVehicles, isLoaded } = useVehicles(data?.allMarkdownRemark?.nodes || [])
  const [vehicle, setVehicle] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (isLoaded && params.id) {
      const foundVehicle = allVehicles.find(v => v.id === params.id)
      
      if (foundVehicle) {
        setVehicle(foundVehicle)
        setError(null)
      } else {
        // Try case-insensitive match
        const caseInsensitiveMatch = allVehicles.find(v => 
          v.id && v.id.toLowerCase() === params.id.toLowerCase()
        )
        
        if (caseInsensitiveMatch) {
          setVehicle(caseInsensitiveMatch)
          setError(null)
        } else {
          setError(`Vehicle not found. ID: ${params.id}`)
        }
      }
    }
  }, [allVehicles, isLoaded, params.id])

  if (!isLoaded) {
    return (
      <Layout pageTitle="Loading...">
        <div className="vehicle-detail-loading">
          <h1>Loading vehicle details...</h1>
        </div>
      </Layout>
    )
  }

  if (error || !vehicle) {
    return (
      <Layout pageTitle="Vehicle Not Found">
        <div className="vehicle-detail-error">
          <h1>Vehicle Not Found</h1>
          <p>{error || 'The requested vehicle could not be found.'}</p>
          <Link to="/inventory" className="back-to-inventory">
            ← Back to Inventory
          </Link>
        </div>
      </Layout>
    )
  }

  const {
    make = 'Unknown',
    model = 'Unknown',
    year = 'N/A',
    price = 0,
    mileage = 0,
    condition = 'Unknown',
    transmission = 'Unknown',
    fuelType = 'Unknown',
    drivetrain = 'Unknown',
    vin = 'Not provided',
    exteriorColor = 'Unknown',
    interiorColor = 'Unknown',
    features = [],
    description = 'No description available.',
    featuredImage = null,
    thumbnailImages = [],
    galleryImages = []
  } = vehicle

  // Handle different image sources
  const getImageUrl = (image) => {
    if (typeof image === 'string') return image
    if (image?.url) return image.url
    if (image?.publicURL) return image.publicURL
    if (image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src) {
      return image.childImageSharp.gatsbyImageData.images.fallback.src
    }
    return heroCarImage
  }

  // Use uploaded images if available, otherwise fallback to featured image or default
  const mainImage = thumbnailImages.length > 0 
    ? getImageUrl(thumbnailImages[0]) 
    : (featuredImage ? getImageUrl(featuredImage) : heroCarImage)
  
  // All images for gallery (thumbnail + gallery images + featured if different)
  const allImages = [...thumbnailImages, ...galleryImages]
  if (featuredImage && !thumbnailImages.length && !galleryImages.length) {
    allImages.push({ url: getImageUrl(featuredImage) })
  }

  const openModal = (imageIndex) => {
    setSelectedImage(imageIndex)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  return (
    <Layout pageTitle={`${year} ${make} ${model}`}>
      <div className="vehicle-detail-container">
        <Link to="/inventory" className="back-to-inventory">
          ← Back to Inventory
        </Link>
        
        <div className="vehicle-detail-content">
          <div className="vehicle-images">
            <div className="main-image" onClick={() => openModal(0)}>
              <img 
                src={mainImage} 
                alt={`${year} ${make} ${model}`}
                className="vehicle-main-image"
              />
              {allImages.length > 1 && (
                <div className="image-overlay">
                  <span>📸 View Gallery ({allImages.length} photos)</span>
                </div>
              )}
            </div>
            
            {allImages.length > 1 && (
              <div className="image-gallery">
                <h3>More Photos ({allImages.length})</h3>
                <div className="gallery-grid">
                  {allImages.map((image, index) => (
                    <div 
                      key={index} 
                      className="gallery-item"
                      onClick={() => openModal(index)}
                    >
                      <img 
                        src={getImageUrl(image)} 
                        alt={`${year} ${make} ${model} - Photo ${index + 1}`}
                        className="gallery-image"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="vehicle-info">
            <div className="vehicle-header">
              <h1 className="vehicle-title">
                {year} {make} {model}
              </h1>
              <p className="vehicle-price">
                J${price && !isNaN(price) ? parseInt(price).toLocaleString() : 'Contact for price'}
              </p>
            </div>

            <div className="vehicle-specs">
              <h2>Vehicle Specifications</h2>
              <div className="specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Year:</span>
                  <span className="spec-value">{year}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Make:</span>
                  <span className="spec-value">{make}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Model:</span>
                  <span className="spec-value">{model}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Mileage:</span>
                  <span className="spec-value">
                    {mileage && !isNaN(mileage) ? parseInt(mileage).toLocaleString() : 'N/A'} miles
                  </span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Condition:</span>
                  <span className="spec-value">{condition}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Transmission:</span>
                  <span className="spec-value">{transmission}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fuel Type:</span>
                  <span className="spec-value">{fuelType}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Drivetrain:</span>
                  <span className="spec-value">{drivetrain}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Exterior Color:</span>
                  <span className="spec-value">{exteriorColor}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Interior Color:</span>
                  <span className="spec-value">{interiorColor}</span>
                </div>
                {vin && vin !== 'Not provided' && (
                  <div className="spec-item">
                    <span className="spec-label">VIN:</span>
                    <span className="spec-value">{vin}</span>
                  </div>
                )}
              </div>
            </div>

            {features && features.length > 0 && (
              <div className="vehicle-features">
                <h2>Features</h2>
                <ul className="features-list">
                  {features.map((feature, index) => (
                    <li key={index} className="feature-item">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {description && description !== 'No description available.' && (
              <div className="vehicle-description">
                <h2>Description</h2>
                <p>{description}</p>
              </div>
            )}

            <div className="contact-section">
              <h2>Interested?</h2>
              <p>Contact us today to schedule a viewing or get more information about this vehicle.</p>
              <div className="contact-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Contact Us
                </Link>
                <a href={`tel:+1234567890`} className="btn btn-secondary">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {showModal && allImages.length > 0 && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>×</button>
              
              <div className="modal-image-container">
                <img 
                  src={getImageUrl(allImages[selectedImage])} 
                  alt={`${year} ${make} ${model} - Photo ${selectedImage + 1}`}
                  className="modal-image"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button className="modal-nav prev" onClick={prevImage}>‹</button>
                    <button className="modal-nav next" onClick={nextImage}>›</button>
                    
                    <div className="modal-counter">
                      {selectedImage + 1} / {allImages.length}
                    </div>
                  </>
                )}
              </div>
              
              <div className="modal-thumbnails">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`modal-thumbnail ${index === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={getImageUrl(image)} 
                      alt={`Thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          make
          model
          year
          price
          mileage
          condition
          featuredImage {
            publicURL
            childImageSharp {
              gatsbyImageData(width: 800, placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`

export default VehicleDetailPage