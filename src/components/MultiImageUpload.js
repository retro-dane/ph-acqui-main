import React, { useState, useRef } from 'react'
import { storage } from '../utils/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const MultiImageUpload = ({ 
  onImagesUploaded, 
  currentImages = [], 
  vehicleId, 
  label = "Vehicle Images",
  maxImages = 6,
  isThumbnail = false
}) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const files = Array.from(event.target.files)
    if (!files.length) return

    // Check if adding these files would exceed the limit
    if (currentImages.length + files.length > maxImages) {
      setError(`Maximum ${maxImages} images allowed`)
      return
    }

    // Validate all files
    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        setError('Please select only image files (JPG, PNG, etc.)')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be smaller than 5MB')
        return
      }
    }

    setError('')
    setUploading(true)
    
    const imageType = isThumbnail ? 'thumbnail' : 'gallery'
    
    const uploadPromises = files.map(async (file, index) => {
      const fileId = `file-${Date.now()}-${index}`
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }))

      try {
        // Create a unique filename
        const timestamp = Date.now()
        const fileExtension = file.name.split('.').pop()
        const fileName = `vehicles/${vehicleId}/${imageType}-${timestamp}-${index}.${fileExtension}`
        
        // Create storage reference
        const storageRef = ref(storage, fileName)
        
        // Upload file
        console.log(`📤 Uploading ${imageType} image to Firebase Storage...`)
        const snapshot = await uploadBytes(storageRef, file)
        
        // Get download URL
        const downloadURL = await getDownloadURL(snapshot.ref)
        console.log(`✅ ${imageType} image uploaded successfully:`, downloadURL)
        
        setUploadProgress(prev => ({ ...prev, [fileId]: 100 }))
        
        return {
          url: downloadURL,
          path: fileName,
          name: file.name,
          type: imageType
        }
      } catch (error) {
        console.error(`❌ Error uploading ${imageType} image:`, error)
        throw error
      }
    })

    try {
      const uploadedImages = await Promise.all(uploadPromises)
      const newImages = [...currentImages, ...uploadedImages]
      onImagesUploaded(newImages)
      
      // Clear progress
      setTimeout(() => {
        setUploadProgress({})
      }, 1000)
    } catch (error) {
      setError(`Upload failed: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async (index) => {
    const imageToRemove = currentImages[index]
    
    try {
      // Delete from Firebase Storage if it's a Firebase URL
      if (imageToRemove.url && imageToRemove.url.includes('firebase')) {
        const imageRef = ref(storage, imageToRemove.path || imageToRemove.url)
        await deleteObject(imageRef)
        console.log('🗑️ Image deleted from Firebase Storage')
      }
      
      // Remove from current images array
      const newImages = currentImages.filter((_, i) => i !== index)
      onImagesUploaded(newImages)
    } catch (error) {
      console.warn('Warning: Could not delete image:', error.message)
      // Still remove the reference even if deletion failed
      const newImages = currentImages.filter((_, i) => i !== index)
      onImagesUploaded(newImages)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const uploadProgressValues = Object.values(uploadProgress)
  const averageProgress = uploadProgressValues.length > 0 
    ? uploadProgressValues.reduce((a, b) => a + b, 0) / uploadProgressValues.length 
    : 0

  return (
    <div className="multi-image-upload-container">
      <label className="image-upload-label">
        {label} {currentImages.length > 0 && `(${currentImages.length}/${maxImages})`}
      </label>
      
      {/* Current Images Grid */}
      {currentImages.length > 0 && (
        <div className="current-images-grid">
          {currentImages.map((image, index) => (
            <div key={index} className="image-grid-item">
              <img 
                src={image.url} 
                alt={`${label} ${index + 1}`} 
                className="grid-image-preview"
              />
              <div className="image-grid-overlay">
                <button 
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="btn-remove-grid-image"
                  disabled={uploading}
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
              {index === 0 && !isThumbnail && (
                <div className="primary-badge">Main</div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Upload Area */}
      {currentImages.length < maxImages && (
        <div className="image-upload-area" onClick={triggerFileInput}>
          <div className="upload-placeholder">
            <div className="upload-icon">📷</div>
            <p>
              {currentImages.length === 0 
                ? `Click to upload ${label.toLowerCase()}` 
                : `Add more images (${maxImages - currentImages.length} remaining)`
              }
            </p>
            <small>JPG, PNG up to 5MB each{!isThumbnail && `, max ${maxImages}`}</small>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple={!isThumbnail}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {uploading && (
        <div className="upload-status">
          <div className="upload-progress">
            <div 
              className="upload-progress-bar"
              style={{ width: `${averageProgress}%` }}
            ></div>
          </div>
          <p>Uploading {Object.keys(uploadProgress).length} image(s)...</p>
        </div>
      )}

      {error && (
        <div className="upload-error">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

export default MultiImageUpload