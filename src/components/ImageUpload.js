import React, { useState, useRef } from 'react'
import { storage } from '../utils/firebase'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

const ImageUpload = ({ onImageUploaded, currentImage, vehicleId, label = "Vehicle Image" }) => {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, etc.)')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB')
      return
    }

    setError('')
    setUploading(true)
    setUploadProgress(0)

    try {
      // Create a unique filename
      const timestamp = Date.now()
      const fileExtension = file.name.split('.').pop()
      const fileName = `vehicles/${vehicleId || 'temp'}/featured-${timestamp}.${fileExtension}`
      
      // Create storage reference
      const storageRef = ref(storage, fileName)
      
      // Upload file
      console.log('📤 Uploading image to Firebase Storage...')
      const snapshot = await uploadBytes(storageRef, file)
      
      // Get download URL
      const downloadURL = await getDownloadURL(snapshot.ref)
      console.log('✅ Image uploaded successfully:', downloadURL)
      
      // Call parent callback with the download URL
      onImageUploaded(downloadURL, fileName)
      
      setUploadProgress(100)
    } catch (error) {
      console.error('❌ Error uploading image:', error)
      setError(`Upload failed: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!currentImage) return

    try {
      // If it's a Firebase Storage URL, delete it
      if (currentImage.includes('firebase') && currentImage.includes('vehicles/')) {
        const imageRef = ref(storage, currentImage)
        await deleteObject(imageRef)
        console.log('🗑️ Image deleted from Firebase Storage')
      }
      
      onImageUploaded('', '')
    } catch (error) {
      console.warn('Warning: Could not delete previous image:', error.message)
      // Still remove the reference even if deletion failed
      onImageUploaded('', '')
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      
      <div className="image-upload-area">
        {currentImage ? (
          <div className="current-image-preview">
            <img 
              src={currentImage} 
              alt="Vehicle preview" 
              className="image-preview"
            />
            <div className="image-overlay">
              <button 
                type="button"
                onClick={triggerFileInput}
                className="btn-change-image"
                disabled={uploading}
              >
                Change Image
              </button>
              <button 
                type="button"
                onClick={handleRemoveImage}
                className="btn-remove-image"
                disabled={uploading}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="upload-placeholder" onClick={triggerFileInput}>
            <div className="upload-icon">📷</div>
            <p>Click to upload vehicle image</p>
            <small>JPG, PNG up to 5MB</small>
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />
      </div>

      {uploading && (
        <div className="upload-status">
          <div className="upload-progress">
            <div 
              className="upload-progress-bar"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p>Uploading image...</p>
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

export default ImageUpload