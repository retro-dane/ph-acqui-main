import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"
import storageManager from "../../utils/storageManager"
import heroCarImage from "../../images/hero-car.png"
import "../../styles/vehicle-detail.css"

const VehicleDetailPage = ({ params }) => {
  const [vehicle, setVehicle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        const vehicles = await storageManager.getVehicles()
        const foundVehicle = vehicles.find(v => v.id === params.id)
        
        if (foundVehicle) {
          setVehicle(foundVehicle)
        } else {
          setError('Vehicle not found')
        }
      } catch (err) {
        setError('Failed to load vehicle details')
        console.error('Error loading vehicle:', err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadVehicle()
    }
  }, [params.id])

  if (loading) {
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
    description = 'No description available.'
  } = vehicle

  return (
    <Layout pageTitle={`${year} ${make} ${model}`}>
      <div className="vehicle-detail-container">
        <Link to="/inventory" className="back-to-inventory">
          ← Back to Inventory
        </Link>
        
        <div className="vehicle-detail-content">
          <div className="vehicle-images">
            <div className="main-image">
              <img 
                src={heroCarImage} 
                alt={`${year} ${make} ${model}`}
                className="vehicle-main-image"
              />
            </div>
          </div>

          <div className="vehicle-info">
            <div className="vehicle-header">
              <h1 className="vehicle-title">
                {year} {make} {model}
              </h1>
              <p className="vehicle-price">
                ${price && !isNaN(price) ? parseInt(price).toLocaleString() : 'Contact for price'}
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
      </div>
    </Layout>
  )
}

export default VehicleDetailPage