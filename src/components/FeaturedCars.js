import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useVehicles } from '../hooks/useVehicles'
import CarPlaceholder from './CarPlaceholder'

const FeaturedCars = () => {
  // Get markdown vehicles from GraphQL
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/inventory/" } }
      ) {
        nodes {
          id
          frontmatter {
            make
            model
            year
            price
            mileage
            condition
            transmission
            fuelType
            featuredImage {
              publicURL
            }
          }
          fields {
            slug
          }
        }
      }
    }
  `)

  const markdownVehicles = data.allMarkdownRemark.nodes
  const { allVehicles, isLoaded } = useVehicles(markdownVehicles)

  // Select featured vehicles (up to 5)
  const getFeaturedVehicles = () => {
    if (!allVehicles.length) return []
    
    // Prioritize vehicles with images, then by condition, then by price
    const sortedForFeatured = allVehicles
      .filter(vehicle => vehicle.make && vehicle.model && vehicle.year) // Ensure basic data
      .sort((a, b) => {
        // Priority 1: Vehicles with thumbnail images
        const aHasImage = (a.thumbnailImages && a.thumbnailImages.length > 0) || 
                         (a.frontmatter?.featuredImage?.publicURL && !a.frontmatter.featuredImage.publicURL.includes('hero-car'))
        const bHasImage = (b.thumbnailImages && b.thumbnailImages.length > 0) || 
                         (b.frontmatter?.featuredImage?.publicURL && !b.frontmatter.featuredImage.publicURL.includes('hero-car'))
        
        if (aHasImage && !bHasImage) return -1
        if (!aHasImage && bHasImage) return 1
        
        // Priority 2: Better condition
        const conditionOrder = { 'Excellent': 3, 'Good': 2, 'Fair': 1 }
        const aCondition = conditionOrder[a.condition || a.frontmatter?.condition] || 0
        const bCondition = conditionOrder[b.condition || b.frontmatter?.condition] || 0
        
        if (aCondition !== bCondition) return bCondition - aCondition
        
        // Priority 3: Newer year
        const aYear = a.year || a.frontmatter?.year || 0
        const bYear = b.year || b.frontmatter?.year || 0
        
        return bYear - aYear
      })
    
    return sortedForFeatured.slice(0, 5)
  }

  const featuredVehicles = getFeaturedVehicles()

  // Get the main image for a vehicle
  const getVehicleImage = (vehicle) => {
    // Try thumbnail images first
    if (vehicle.thumbnailImages && vehicle.thumbnailImages.length > 0) {
      return vehicle.thumbnailImages[0].url
    }
    
    // Try featured image from frontmatter
    if (vehicle.frontmatter?.featuredImage?.publicURL && 
        !vehicle.frontmatter.featuredImage.publicURL.includes('hero-car')) {
      return vehicle.frontmatter.featuredImage.publicURL
    }
    
    // Return null to show placeholder
    return null
  }

  // Get badge text based on vehicle properties
  const getBadge = (vehicle, index) => {
    const badges = ['Featured', 'Popular', 'New', 'Best Value', 'Luxury']
    
    if (vehicle.condition === 'Excellent') return 'Excellent'
    if (vehicle.year >= 2024) return 'New'
    if (index === 0) return 'Featured'
    
    return badges[index] || 'Quality'
  }

  if (!isLoaded) {
    return (
      <section className="featured-cars">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Loading our handpicked selection of premium vehicles...</p>
          </div>
          <div className="cars-container">
            <div className="cars-scroll">
              <div className="loading-placeholder">Loading vehicles...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!featuredVehicles.length) {
    return (
      <section className="featured-cars">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>New inventory coming soon</p>
          </div>
          <div className="cars-container">
            <div className="cars-scroll">
              <div className="no-vehicles">
                <p>Check back soon for our latest vehicle arrivals!</p>
                <Link to="/inventory" className="btn-primary">
                  View All Inventory
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="featured-cars">
      <div className="container">
        <div className="section-header">
          <h2>Featured Cars</h2>
          <p>Discover our handpicked selection of premium vehicles</p>
        </div>
        <div className="cars-container">
          <div className="cars-scroll">
            {featuredVehicles.map((vehicle, index) => {
              const make = vehicle.make || vehicle.frontmatter?.make || 'Unknown'
              const model = vehicle.model || vehicle.frontmatter?.model || 'Vehicle'
              const year = vehicle.year || vehicle.frontmatter?.year || 'N/A'
              const price = vehicle.price || vehicle.frontmatter?.price || 0
              const transmission = vehicle.transmission || vehicle.frontmatter?.transmission || 'Automatic'
              const fuelType = vehicle.fuelType || vehicle.frontmatter?.fuelType || 'Gasoline'
              const features = vehicle.features || vehicle.frontmatter?.features || []
              const condition = vehicle.condition || vehicle.frontmatter?.condition || 'Good'
              const imageUrl = getVehicleImage(vehicle)
              const vehicleSlug = vehicle.fields?.slug || `/vehicle/${vehicle.id}`
              
              // Estimate monthly payment (rough calculation for display)
              const monthlyPayment = price > 0 ? Math.round((price * 0.02)) : 0

              return (
                <div key={vehicle.id || index} className="car-card">
                  <div className="car-image">
                    {imageUrl ? (
                      <img src={imageUrl} alt={`${year} ${make} ${model}`} />
                    ) : (
                      <CarPlaceholder alt={`${year} ${make} ${model}`} />
                    )}
                    <div className="car-badge">{getBadge(vehicle, index)}</div>
                  </div>
                  <div className="car-info">
                    <h3>{year} {make} {model}</h3>
                    <p className="car-year">{year} • {condition} • {transmission}</p>
                    <div className="car-features">
                      {features.slice(0, 3).map((feature, idx) => (
                        <span key={idx}>{feature}</span>
                      ))}
                      {features.length === 0 && (
                        <>
                          <span>Quality Inspected</span>
                          <span>Financing Available</span>
                          <span>Warranty Included</span>
                        </>
                      )}
                    </div>
                    <div className="car-price">
                      <span className="price">
                        J${price > 0 ? parseInt(price).toLocaleString() : 'Contact for price'}
                      </span>
                      {monthlyPayment > 0 && (
                        <span className="monthly">J${monthlyPayment.toLocaleString()}/mo</span>
                      )}
                    </div>
                    <Link to={vehicleSlug} className="car-cta">
                      View Details
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="featured-cta">
          <Link to="/inventory" className="btn-outline">
            View All Inventory
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars