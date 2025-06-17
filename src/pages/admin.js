import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import AdminAuth from '../components/AdminAuth'
import ImageUpload from '../components/ImageUpload'
import storageManager from '../utils/storageManager'
import '../styles/admin.css'

const AdminPage = () => {
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
          }
          fileAbsolutePath
        }
      }
    }
  `)

  const markdownVehicles = data.allMarkdownRemark.nodes
  const [storedVehicles, setStoredVehicles] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    price: '',
    mileage: '',
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    drivetrain: 'FWD',
    vin: '',
    exteriorColor: '',
    interiorColor: '',
    condition: 'Excellent',
    features: [],
    description: ''
  })

  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [storageStatus, setStorageStatus] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const [uploadedImagePath, setUploadedImagePath] = useState('')

  // Load stored vehicles on component mount
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const vehicles = await storageManager.getVehicles()
        setStoredVehicles(vehicles)
        
        // Load storage status asynchronously
        const status = await storageManager.getStorageStatus()
        setStorageStatus(status)
      } catch (error) {
        console.error('Error loading vehicles:', error)
        setStoredVehicles([])
      }
    }
    loadVehicles()
  }, [])

  // Combine markdown and stored vehicles
  const allVehicles = [
    ...markdownVehicles.map(v => ({
      id: v.id,
      source: 'markdown',
      ...v.frontmatter
    })),
    ...storedVehicles.map(v => ({
      ...v,
      source: 'stored'
    }))
  ]

  const commonFeatures = [
    'Air Conditioning',
    'Power Windows',
    'Power Steering',
    'Central Locking',
    'Bluetooth Connectivity',
    'Apple CarPlay/Android Auto',
    'Backup Camera',
    'Cruise Control',
    'Sunroof',
    'Heated Seats',
    'Alloy Wheels',
    'Fog Lights',
    'Anti-lock Brakes (ABS)',
    'Electronic Stability Control',
    'Multiple Airbags',
    'Tire Pressure Monitoring',
    'Daytime Running Lights',
    'Remote Engine Start',
    'Keyless Entry',
    'Leather Seats'
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => {
      if (prev.includes(feature)) {
        return prev.filter(f => f !== feature)
      } else {
        return [...prev, feature]
      }
    })
  }

  const handleDeleteVehicle = async (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await storageManager.deleteVehicle(vehicleId)
        const vehicles = await storageManager.getVehicles()
        setStoredVehicles(vehicles)
        setSubmitMessage('✅ Vehicle deleted successfully!')
      } catch (error) {
        setSubmitMessage(`❌ Error deleting vehicle: ${error.message}`)
      }
    }
  }

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle)
    setFormData({
      ...vehicle,
      features: vehicle.features || []
    })
    setSelectedFeatures(vehicle.features || [])
    setUploadedImageUrl(vehicle.featuredImage || '')
    setUploadedImagePath('')
    setSubmitMessage('')
  }

  const handleImageUploaded = (imageUrl, imagePath) => {
    setUploadedImageUrl(imageUrl)
    setUploadedImagePath(imagePath)
  }

  const saveVehicleData = async () => {
    const vehicleData = {
      ...formData,
      // Ensure numeric fields are stored as numbers
      year: formData.year ? parseInt(formData.year) : null,
      price: formData.price ? parseInt(formData.price) : null,
      mileage: formData.mileage ? parseInt(formData.mileage) : null,
      features: selectedFeatures,
      featuredImage: uploadedImageUrl || "./hero-car.png",
      imagePath: uploadedImagePath || '',
      galleryImages: uploadedImageUrl ? [uploadedImageUrl] : ["../../images/vehicles/icon.png"]
    }
    
    return await storageManager.saveVehicle(vehicleData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const savedVehicle = await saveVehicleData()
      
      // Update stored vehicles list
      const vehicles = await storageManager.getVehicles()
      setStoredVehicles(vehicles)
      
      if (editingVehicle) {
        setSubmitMessage(`✅ Vehicle "${savedVehicle.year} ${savedVehicle.make} ${savedVehicle.model}" has been updated!`)
        setEditingVehicle(null)
      } else {
        setSubmitMessage(`✅ Vehicle "${savedVehicle.year} ${savedVehicle.make} ${savedVehicle.model}" has been added to your inventory!`)
      }
      
      // Reset form
      setFormData({
        make: '',
        model: '',
        year: '',
        price: '',
        mileage: '',
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        drivetrain: 'FWD',
        vin: '',
        exteriorColor: '',
        interiorColor: '',
        condition: 'Excellent',
        features: [],
        description: ''
      })
      setSelectedFeatures([])
      setUploadedImageUrl('')
      setUploadedImagePath('')
      setEditingVehicle(null)
      
    } catch (error) {
      setSubmitMessage(`❌ Error saving vehicle: ${error.message}`)
    }
    
    setIsSubmitting(false)
  }

  return (
    <Layout>
      <AdminAuth>
        <div className="admin-container">
        <div className="admin-header">
          <h1>🚗 PH Aqui Admin Dashboard</h1>
          <p>Manage your vehicle inventory with ease</p>
          
          {storageStatus && storageStatus.adapters && (
            <div className="storage-status">
              <h3>📡 Storage Status</h3>
              <div className="storage-adapters">
                {storageStatus.adapters.map((adapter, index) => (
                  <div key={index} className={`adapter-status ${adapter.isPrimary ? 'primary' : 'secondary'} ${adapter.status}`}>
                    <div className="adapter-info">
                      <span className="adapter-name">{adapter.name}</span>
                      {adapter.isPrimary && <span className="primary-badge">Primary</span>}
                    </div>
                    <div className="status-info">
                      <span className={`status-indicator ${adapter.status}`}>
                        {adapter.status === 'connected' ? '🟢' : '🔴'}
                      </span>
                      <span className="status-text">{adapter.status}</span>
                    </div>
                    {adapter.error && (
                      <div className="error-message">
                        <small>Error: {adapter.error}</small>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {storageStatus.lastSync && (
                <p className="last-sync">
                  🔄 Last sync: {new Date(storageStatus.lastSync).toLocaleString()}
                </p>
              )}
              {!storageStatus.lastSync && (
                <p className="last-sync">
                  🔄 No sync performed yet
                </p>
              )}
              <p className="sync-status">
                {storageStatus.syncEnabled ? '✅ Auto-sync enabled' : '⚠️ Auto-sync disabled'}
              </p>
            </div>
          )}
        </div>

        <div className="admin-section">
          <h2>📊 Current Inventory ({allVehicles.length} vehicles)</h2>
          {allVehicles.length > 0 ? (
            <div className="vehicle-grid">
              {allVehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-info">
                    <h3>{vehicle.year || 'N/A'} {vehicle.make || 'Unknown'} {vehicle.model || 'Vehicle'}</h3>
                    <p className="vehicle-price">${vehicle.price && !isNaN(vehicle.price) ? parseInt(vehicle.price).toLocaleString() : 'N/A'}</p>
                    <p className="vehicle-details">
                      {vehicle.mileage && !isNaN(vehicle.mileage) ? parseInt(vehicle.mileage).toLocaleString() : 'N/A'} miles • {vehicle.condition || 'Unknown'}
                    </p>
                  </div>
                  <div className="vehicle-actions">
                    {vehicle.source === 'stored' && (
                      <>
                        <button 
                          className="btn-edit"
                          onClick={() => handleEditVehicle(vehicle)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteVehicle(vehicle.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {vehicle.source === 'markdown' && (
                      <span className="vehicle-source">From file</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No vehicles in inventory. Add your first vehicle below!</p>
            </div>
          )}
        </div>

        <div className="admin-section">
          <h2>➕ Add New Vehicle</h2>
        </div>

        {submitMessage && (
          <div className={`message ${submitMessage.includes('✅') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-section">
            <h2>Vehicle Image</h2>
            <ImageUpload
              onImageUploaded={handleImageUploaded}
              currentImage={uploadedImageUrl}
              vehicleId={editingVehicle?.id || `temp-${Date.now()}`}
              label="Featured Vehicle Image"
            />
          </div>

          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="make">Make *</label>
                <input
                  type="text"
                  id="make"
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  placeholder="Toyota, Honda, Nissan..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model *</label>
                <input
                  type="text"
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="Camry, Civic, Altima..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="year">Year *</label>
                <input
                  type="number"
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="2000"
                  max="2024"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price (USD) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="25000"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="mileage">Mileage *</label>
                <input
                  type="number"
                  id="mileage"
                  name="mileage"
                  value={formData.mileage}
                  onChange={handleInputChange}
                  placeholder="15000"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vin">VIN Number *</label>
                <input
                  type="text"
                  id="vin"
                  name="vin"
                  value={formData.vin}
                  onChange={handleInputChange}
                  placeholder="4T1B11HK5NU123456"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Vehicle Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="transmission">Transmission</label>
                <select
                  id="transmission"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleInputChange}
                >
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="CVT">CVT</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fuelType">Fuel Type</label>
                <select
                  id="fuelType"
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleInputChange}
                >
                  <option value="Gasoline">Gasoline</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="drivetrain">Drivetrain</label>
                <select
                  id="drivetrain"
                  name="drivetrain"
                  value={formData.drivetrain}
                  onChange={handleInputChange}
                >
                  <option value="FWD">Front-Wheel Drive (FWD)</option>
                  <option value="RWD">Rear-Wheel Drive (RWD)</option>
                  <option value="AWD">All-Wheel Drive (AWD)</option>
                  <option value="4WD">Four-Wheel Drive (4WD)</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="exteriorColor">Exterior Color *</label>
                <input
                  type="text"
                  id="exteriorColor"
                  name="exteriorColor"
                  value={formData.exteriorColor}
                  onChange={handleInputChange}
                  placeholder="Midnight Black, Silver, White..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="interiorColor">Interior Color *</label>
                <input
                  type="text"
                  id="interiorColor"
                  name="interiorColor"
                  value={formData.interiorColor}
                  onChange={handleInputChange}
                  placeholder="Black, Beige, Gray..."
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                >
                  <option value="Excellent">Excellent</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Features</h2>
            <p>Select all features that apply to this vehicle:</p>
            <div className="features-grid">
              {commonFeatures.map(feature => (
                <label key={feature} className="feature-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature)}
                    onChange={() => handleFeatureToggle(feature)}
                  />
                  <span className="checkmark"></span>
                  {feature}
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h2>Description</h2>
            <div className="form-group">
              <label htmlFor="description">Vehicle Description (Optional)</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the vehicle's condition, history, or any special features..."
                rows={4}
              />
              <small>Leave blank to use auto-generated description</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? 'Creating Vehicle File...' : 'Create Vehicle File'}
            </button>
          </div>
        </form>

        <div className="instructions">
          <h3>🎉 How It Works:</h3>
          <ol>
            <li>Fill out the form above with vehicle details</li>
            <li>Click "Create Vehicle File" to instantly add to inventory</li>
            <li>Vehicle appears immediately in the inventory list</li>
            <li>Use Edit/Delete buttons to manage stored vehicles</li>
            <li>Changes are saved automatically in your browser</li>
          </ol>
          <div className="admin-actions">
            <button 
              type="button" 
              onClick={async () => {
                try {
                  await storageManager.exportVehicles()
                } catch (error) {
                  setSubmitMessage(`❌ Export failed: ${error.message}`)
                }
              }}
              className="export-btn"
            >
              📤 Export Vehicles
            </button>
            <button 
              type="button" 
              onClick={async () => {
                if (window.confirm('Are you sure you want to clear all stored vehicles?')) {
                  try {
                    await storageManager.clearAll()
                    setStoredVehicles([])
                    setSubmitMessage('✅ All vehicles cleared!')
                  } catch (error) {
                    setSubmitMessage(`❌ Clear failed: ${error.message}`)
                  }
                }
              }}
              className="clear-btn"
            >
              🗑️ Clear All
            </button>
          </div>
        </div>
        </div>
      </AdminAuth>
    </Layout>
  )
}

export default AdminPage