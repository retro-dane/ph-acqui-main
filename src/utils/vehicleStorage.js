// Vehicle storage utility for managing inventory in localStorage

const VEHICLES_KEY = 'phaqui_vehicles'

export const VehicleStorage = {
  // Get all vehicles from localStorage
  getVehicles: () => {
    try {
      const vehicles = localStorage.getItem(VEHICLES_KEY)
      return vehicles ? JSON.parse(vehicles) : []
    } catch (error) {
      console.error('Error loading vehicles:', error)
      return []
    }
  },

  // Save a new vehicle or update existing one
  saveVehicle: (vehicleData) => {
    try {
      const vehicles = VehicleStorage.getVehicles()
      const vehicleId = vehicleData.id || generateVehicleId(vehicleData)
      
      const vehicle = {
        ...vehicleData,
        id: vehicleId,
        createdAt: vehicleData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      // Check if vehicle already exists (for updates)
      const existingIndex = vehicles.findIndex(v => v.id === vehicleId)
      
      if (existingIndex !== -1) {
        vehicles[existingIndex] = vehicle
      } else {
        vehicles.push(vehicle)
      }

      localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles))
      return vehicle
    } catch (error) {
      console.error('Error saving vehicle:', error)
      throw error
    }
  },

  // Get a single vehicle by ID
  getVehicle: (id) => {
    const vehicles = VehicleStorage.getVehicles()
    return vehicles.find(v => v.id === id)
  },

  // Delete a vehicle by ID
  deleteVehicle: (id) => {
    try {
      const vehicles = VehicleStorage.getVehicles()
      const filteredVehicles = vehicles.filter(v => v.id !== id)
      localStorage.setItem(VEHICLES_KEY, JSON.stringify(filteredVehicles))
      return true
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      return false
    }
  },

  // Clear all vehicles (for testing/reset)
  clearAll: () => {
    try {
      localStorage.removeItem(VEHICLES_KEY)
      return true
    } catch (error) {
      console.error('Error clearing vehicles:', error)
      return false
    }
  },

  // Export vehicles as JSON (for backup)
  exportVehicles: () => {
    const vehicles = VehicleStorage.getVehicles()
    const dataStr = JSON.stringify(vehicles, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `phaqui-vehicles-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  },

  // Import vehicles from JSON file
  importVehicles: (jsonData) => {
    try {
      const vehicles = JSON.parse(jsonData)
      if (Array.isArray(vehicles)) {
        localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles))
        return vehicles.length
      } else {
        throw new Error('Invalid JSON format')
      }
    } catch (error) {
      console.error('Error importing vehicles:', error)
      throw error
    }
  }
}

// Generate a unique ID for a vehicle
const generateVehicleId = (vehicleData) => {
  const base = `${vehicleData.make}-${vehicleData.model}-${vehicleData.year}`
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  
  const timestamp = Date.now().toString(36)
  return `${base}-${timestamp}`
}

// Convert stored vehicle to markdown format (for compatibility)
export const vehicleToMarkdown = (vehicle) => {
  const featuresYaml = vehicle.features?.map(f => `  - "${f}"`).join('\n') || ''
  
  return `---
make: "${vehicle.make}"
model: "${vehicle.model}"
year: ${vehicle.year}
price: ${vehicle.price}
mileage: ${vehicle.mileage}
transmission: "${vehicle.transmission}"
fuelType: "${vehicle.fuelType}"
drivetrain: "${vehicle.drivetrain}"
vin: "${vehicle.vin}"
exteriorColor: "${vehicle.exteriorColor}"
interiorColor: "${vehicle.interiorColor}"
condition: "${vehicle.condition}"
features:
${featuresYaml}
featuredImage: "${vehicle.featuredImage || '../../images/hero-car.png'}"
galleryImages:
${vehicle.galleryImages?.map(img => `  - "${img}"`).join('\n') || '  - "../../images/vehicles/icon.png"'}
---

## Vehicle Overview

${vehicle.description || `The ${vehicle.year} ${vehicle.make} ${vehicle.model} is a reliable and well-maintained vehicle perfect for Jamaica's roads. With only ${vehicle.mileage} miles, this ${vehicle.condition.toLowerCase()} condition vehicle offers excellent value.`}

## Key Features

This vehicle comes equipped with:
${vehicle.features?.map(f => `- ${f}`).join('\n') || ''}

## Specifications

- **Year:** ${vehicle.year}
- **Make:** ${vehicle.make}
- **Model:** ${vehicle.model}
- **Mileage:** ${vehicle.mileage} miles
- **Transmission:** ${vehicle.transmission}
- **Fuel Type:** ${vehicle.fuelType}
- **Drivetrain:** ${vehicle.drivetrain}
- **Exterior Color:** ${vehicle.exteriorColor}
- **Interior Color:** ${vehicle.interiorColor}
- **Condition:** ${vehicle.condition}

## Contact Information

Interested in this vehicle? Contact PH Aqui today to schedule a viewing or get more information.

Price: $${parseInt(vehicle.price).toLocaleString()}
`
}

export default VehicleStorage