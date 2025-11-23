import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import AdminAuth from '../components/AdminAuth'
import MultiImageUpload from '../components/MultiImageUpload'
import storageManager from '../utils/storageManager'
import { signOutUser, onAuthStateChange } from '../utils/authHelper'
import heroCarImage from '../images/hero-car.png'
import '../styles/admin.css'

const AdminPage = () => {
  // All vehicles now come from Firebase only
  const [storedVehicles, setStoredVehicles] = useState([])
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
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
  const [thumbnailImages, setThumbnailImages] = useState([])
  const [galleryImages, setGalleryImages] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((userData) => {
      setCurrentUser(userData)
    })
    return () => unsubscribe()
  }, [])

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

  // All vehicles now come from Firebase only
  const allVehicles = storedVehicles.map(v => ({
    ...v,
    source: 'stored'
  }))

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
    'Leather Seats',
    'Heated steering'
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

  const handleLogout = async () => {
    try {
      await signOutUser()
      window.location.href = '/admin'
    } catch (error) {
      console.error('Logout failed:', error)
    }
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
    setThumbnailImages(vehicle.thumbnailImages || [])
    setGalleryImages(vehicle.galleryImages || [])
    setSubmitMessage('')
    setIsFormVisible(true) // Open the form when editing
  }


  const handleThumbnailImagesUploaded = (images) => {
    setThumbnailImages(images)
  }

  const handleGalleryImagesUploaded = (images) => {
    setGalleryImages(images)
  }

  const saveVehicleData = async () => {
    const vehicleData = {
      ...formData,
      // Ensure numeric fields are stored as numbers
      year: formData.year ? parseInt(formData.year) : null,
      price: formData.price ? parseInt(formData.price) : null,
      mileage: formData.mileage ? parseInt(formData.mileage) : null,
      features: selectedFeatures,
      featuredImage: uploadedImageUrl || (thumbnailImages.length > 0 ? thumbnailImages[0].url : heroCarImage),
      imagePath: uploadedImagePath || '',
      thumbnailImages: thumbnailImages,
      galleryImages: galleryImages
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
      setThumbnailImages([])
      setGalleryImages([])
      setEditingVehicle(null)
      setIsFormVisible(false) // Close form after successful submission
      
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
          <h1>🚗 Vehicle Inventory Management</h1>
          <p>Add and manage vehicles in your showroom</p>
          <div className="quick-stats">
            <div className="stat-card">
              <div className="stat-number">{allVehicles.length}</div>
              <div className="stat-label">Total Vehicles</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{storedVehicles.length}</div>
              <div className="stat-label">In Database</div>
            </div>
            <div className="stat-card status-card">
              <div className="status-indicator">
                {storageStatus?.adapters?.some(a => a.status === 'connected') ? (
                  <>
                    <span className="status-dot connected">●</span>
                    <span className="status-text">Connected</span>
                  </>
                ) : (
                  <>
                    <span className="status-dot disconnected">●</span>
                    <span className="status-text">Disconnected</span>
                  </>
                )}
              </div>
              <div className="stat-label">Cloud Storage</div>
            </div>
            <div className="stat-card user-card">
              <div className="user-info">
                <span className="user-icon">👤</span>
                <span className="user-name">{currentUser?.displayName || currentUser?.username || 'Admin'}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="admin-section">
          <h2>📊 Current Inventory ({allVehicles.length} vehicles)</h2>
          {allVehicles.length > 0 ? (
            <div className="vehicle-grid">
              {allVehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-info">
                    <h3>{vehicle.year || 'N/A'} {vehicle.make || 'Unknown'} {vehicle.model || 'Vehicle'}</h3>
                    <p className="vehicle-price">J${vehicle.price && !isNaN(vehicle.price) ? parseInt(vehicle.price).toLocaleString() : 'N/A'}</p>
                    <p className="vehicle-details">
                      {vehicle.mileage && !isNaN(vehicle.mileage) ? parseInt(vehicle.mileage).toLocaleString() : 'N/A'} miles • {vehicle.condition || 'Unknown'}
                    </p>
                  </div>
                  <div className="vehicle-actions">
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
          <h2 
            className="collapsible-header"
            onClick={() => setIsFormVisible(!isFormVisible)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsFormVisible(!isFormVisible);
              }
            }}
            tabIndex={0}
            role="button"
            aria-expanded={isFormVisible}
          >
            {editingVehicle ? '✏️ Edit Vehicle' : 
             `${isFormVisible ? '➖' : '➕'} Add New Vehicle`}
          </h2>
          {editingVehicle && (
            <p className="edit-notice">
              Editing: {editingVehicle.year} {editingVehicle.make} {editingVehicle.model}
              <button 
                type="button" 
                onClick={() => {
                  setEditingVehicle(null)
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
                  setThumbnailImages([])
                  setGalleryImages([])
                  setSubmitMessage('')
                  setIsFormVisible(false)
                }}
                className="cancel-edit-btn"
              >
                Cancel Edit
              </button>
            </p>
          )}
        </div>

        {isFormVisible && (
          <>
            {submitMessage && (
              <div className={`message ${submitMessage.includes('✅') ? 'success' : 'error'}`}>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="vehicle-form">
          <div className="form-section">
            <h2>Vehicle Images</h2>
            
            <MultiImageUpload
              onImagesUploaded={handleThumbnailImagesUploaded}
              currentImages={thumbnailImages}
              vehicleId={editingVehicle?.id || `temp-${Date.now()}`}
              label="Main Thumbnail Image"
              maxImages={1}
              isThumbnail={true}
            />
            
            <MultiImageUpload
              onImagesUploaded={handleGalleryImagesUploaded}
              currentImages={galleryImages}
              vehicleId={editingVehicle?.id || `temp-${Date.now()}`}
              label="Additional Gallery Images"
              maxImages={6}
              isThumbnail={false}
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
                <label htmlFor="price">Price (JMD) *</label>
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
                <label htmlFor="mileage">Mileage (km) *</label>
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
                <label htmlFor="vin">VIN/Chassis Number *</label>
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
              {isSubmitting 
                ? (editingVehicle ? 'Updating Vehicle...' : 'Uploading Vehicle File...') 
                : (editingVehicle ? 'Update Vehicle' : 'Create Vehicle ')
              }
            </button>
          </div>
        </form>

            <div className="instructions">
          <h3>🎉 How It Works:</h3>
          <ol>
            <li>Upload vehicle images - they're stored securely in Firebase Storage</li>
            <li>Fill out the form with vehicle details (make, model, year, etc.)</li>
            <li>Click "Create Vehicle File" to save to Firebase</li>
            <li>Vehicle and images sync to cloud database (Firestore)</li>
            <li>Vehicle appears on inventory page with uploaded images</li>
            <li>Use Edit/Delete buttons to manage vehicles</li>
            <li>All changes sync across devices automatically</li>
          </ol>
        </div>
        </>
        )}
        </div>
      </AdminAuth>
    </Layout>
  )
}

export default AdminPage