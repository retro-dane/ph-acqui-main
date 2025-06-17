// Storage adapters for different backend solutions

// Base adapter interface
class StorageAdapter {
  async getVehicles() {
    throw new Error('getVehicles must be implemented')
  }

  async saveVehicle(vehicleData) {
    throw new Error('saveVehicle must be implemented')
  }

  async deleteVehicle(id) {
    throw new Error('deleteVehicle must be implemented')
  }

  async clearAll() {
    throw new Error('clearAll must be implemented')
  }

  async exportVehicles() {
    throw new Error('exportVehicles must be implemented')
  }

  async importVehicles(data) {
    throw new Error('importVehicles must be implemented')
  }
}

// localStorage adapter (fallback/offline)
export class LocalStorageAdapter extends StorageAdapter {
  constructor() {
    super()
    this.key = 'phaqui_vehicles'
  }

  async getVehicles() {
    try {
      const vehicles = localStorage.getItem(this.key)
      return vehicles ? JSON.parse(vehicles) : []
    } catch (error) {
      console.error('Error loading vehicles from localStorage:', error)
      return []
    }
  }

  async saveVehicle(vehicleData) {
    try {
      const vehicles = await this.getVehicles()
      const vehicleId = vehicleData.id || this.generateId(vehicleData)
      
      const vehicle = {
        ...vehicleData,
        id: vehicleId,
        createdAt: vehicleData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'stored'
      }

      const existingIndex = vehicles.findIndex(v => v.id === vehicleId)
      
      if (existingIndex !== -1) {
        vehicles[existingIndex] = vehicle
      } else {
        vehicles.push(vehicle)
      }

      localStorage.setItem(this.key, JSON.stringify(vehicles))
      return vehicle
    } catch (error) {
      console.error('Error saving vehicle to localStorage:', error)
      throw error
    }
  }

  async deleteVehicle(id) {
    try {
      const vehicles = await this.getVehicles()
      const filteredVehicles = vehicles.filter(v => v.id !== id)
      localStorage.setItem(this.key, JSON.stringify(filteredVehicles))
      return true
    } catch (error) {
      console.error('Error deleting vehicle from localStorage:', error)
      return false
    }
  }

  async clearAll() {
    try {
      localStorage.removeItem(this.key)
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  async exportVehicles() {
    const vehicles = await this.getVehicles()
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
  }

  async importVehicles(jsonData) {
    try {
      const vehicles = JSON.parse(jsonData)
      if (Array.isArray(vehicles)) {
        localStorage.setItem(this.key, JSON.stringify(vehicles))
        return vehicles.length
      } else {
        throw new Error('Invalid JSON format')
      }
    } catch (error) {
      console.error('Error importing vehicles to localStorage:', error)
      throw error
    }
  }

  generateId(vehicleData) {
    const base = `${vehicleData.make}-${vehicleData.model}-${vehicleData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const timestamp = Date.now().toString(36)
    return `${base}-${timestamp}`
  }
}

// File-based adapter for development (saves to public folder)
export class FileAdapter extends StorageAdapter {
  constructor() {
    super()
    this.filename = 'phaqui-vehicles.json'
    this.apiBase = '/api/vehicles' // We'll create this API
  }

  async getVehicles() {
    try {
      const response = await fetch(`${this.apiBase}`)
      if (response.ok) {
        return await response.json()
      } else {
        console.warn('File storage not available, falling back to localStorage')
        return []
      }
    } catch (error) {
      console.warn('File storage error, falling back to localStorage:', error)
      return []
    }
  }

  async saveVehicle(vehicleData) {
    try {
      const response = await fetch(`${this.apiBase}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehicleData)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Failed to save vehicle to file storage')
      }
    } catch (error) {
      console.error('Error saving to file storage:', error)
      throw error
    }
  }

  async deleteVehicle(id) {
    try {
      const response = await fetch(`${this.apiBase}/${id}`, {
        method: 'DELETE'
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting from file storage:', error)
      return false
    }
  }

  async clearAll() {
    try {
      const response = await fetch(`${this.apiBase}/clear`, {
        method: 'DELETE'
      })
      return response.ok
    } catch (error) {
      console.error('Error clearing file storage:', error)
      return false
    }
  }

  async exportVehicles() {
    const vehicles = await this.getVehicles()
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
  }

  async importVehicles(jsonData) {
    try {
      const response = await fetch(`${this.apiBase}/import`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonData
      })

      if (response.ok) {
        const result = await response.json()
        return result.count
      } else {
        throw new Error('Failed to import vehicles to file storage')
      }
    } catch (error) {
      console.error('Error importing to file storage:', error)
      throw error
    }
  }
}

// External API adapter (for databases like Firebase, Supabase, etc.)
export class APIAdapter extends StorageAdapter {
  constructor(config) {
    super()
    this.apiUrl = config.apiUrl
    this.apiKey = config.apiKey
    this.headers = {
      'Content-Type': 'application/json',
      ...(config.apiKey && { 'Authorization': `Bearer ${config.apiKey}` })
    }
  }

  async getVehicles() {
    try {
      const response = await fetch(`${this.apiUrl}/vehicles`, {
        headers: this.headers
      })
      
      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error fetching from API:', error)
      throw error
    }
  }

  async saveVehicle(vehicleData) {
    try {
      const method = vehicleData.id ? 'PUT' : 'POST'
      const url = vehicleData.id 
        ? `${this.apiUrl}/vehicles/${vehicleData.id}`
        : `${this.apiUrl}/vehicles`

      const response = await fetch(url, {
        method,
        headers: this.headers,
        body: JSON.stringify(vehicleData)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error saving to API:', error)
      throw error
    }
  }

  async deleteVehicle(id) {
    try {
      const response = await fetch(`${this.apiUrl}/vehicles/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      return response.ok
    } catch (error) {
      console.error('Error deleting from API:', error)
      return false
    }
  }

  async clearAll() {
    try {
      const response = await fetch(`${this.apiUrl}/vehicles`, {
        method: 'DELETE',
        headers: this.headers
      })
      return response.ok
    } catch (error) {
      console.error('Error clearing API:', error)
      return false
    }
  }

  async exportVehicles() {
    const vehicles = await this.getVehicles()
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
  }

  async importVehicles(jsonData) {
    try {
      const response = await fetch(`${this.apiUrl}/vehicles/import`, {
        method: 'POST',
        headers: this.headers,
        body: jsonData
      })

      if (response.ok) {
        const result = await response.json()
        return result.count || result.length
      } else {
        throw new Error(`API error: ${response.status}`)
      }
    } catch (error) {
      console.error('Error importing to API:', error)
      throw error
    }
  }
}

export default StorageAdapter