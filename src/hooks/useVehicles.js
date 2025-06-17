import { useState, useEffect } from 'react'
import storageManager from '../utils/storageManager'

export const useVehicles = (markdownVehicles = []) => {
  const [storedVehicles, setStoredVehicles] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Load stored vehicles from storage manager
    const loadStoredVehicles = async () => {
      try {
        const vehicles = await storageManager.getVehicles()
        setStoredVehicles(vehicles)
        setIsLoaded(true)
      } catch (error) {
        console.error('Error loading stored vehicles:', error)
        setStoredVehicles([])
        setIsLoaded(true)
      }
    }

    loadStoredVehicles()

    // Listen for storage changes (in case vehicles are modified in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'phaqui_vehicles') {
        loadStoredVehicles()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Combine markdown and stored vehicles
  const allVehicles = [
    // Markdown vehicles (from .md files)
    ...markdownVehicles.map(vehicle => ({
      id: vehicle.id,
      source: 'markdown',
      ...vehicle.frontmatter
    })),
    // Stored vehicles (from localStorage)
    ...storedVehicles.map(vehicle => ({
      ...vehicle,
      source: 'stored'
    }))
  ]

  // Sort by creation date (newest first)
  const sortedVehicles = allVehicles.sort((a, b) => {
    const dateA = new Date(a.createdAt || a.modifiedTime || 0)
    const dateB = new Date(b.createdAt || b.modifiedTime || 0)
    return dateB - dateA
  })

  const refreshStoredVehicles = async () => {
    try {
      const vehicles = await storageManager.getVehicles()
      setStoredVehicles(vehicles)
    } catch (error) {
      console.error('Error refreshing vehicles:', error)
    }
  }

  return {
    allVehicles: sortedVehicles,
    storedVehicles,
    markdownVehicles,
    isLoaded,
    refreshStoredVehicles
  }
}

export default useVehicles