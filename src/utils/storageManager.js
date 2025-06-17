// Unified storage manager with fallback support and synchronization

import { LocalStorageAdapter, FileAdapter, APIAdapter } from './storageAdapters'
import { FirestoreAdapter } from './firestoreAdapter'

class StorageManager {
  constructor() {
    this.adapters = []
    this.primaryAdapter = null
    this.fallbackAdapter = null
    this.syncEnabled = true
    this.lastSync = null
    
    this.initializeAdapters()
  }

  initializeAdapters() {
    // Always have localStorage as fallback
    this.fallbackAdapter = new LocalStorageAdapter()
    
    // Try to determine the best primary adapter based on environment
    this.setupPrimaryAdapter()
    
    // Setup sync interval
    this.setupSync()
  }

  setupPrimaryAdapter() {
    // Try Firebase Firestore first
    try {
      console.log('Attempting to initialize Firestore adapter')
      this.primaryAdapter = new FirestoreAdapter()
      this.adapters = [this.primaryAdapter, this.fallbackAdapter]
      console.log('Using Firestore as primary storage')
      return
    } catch (error) {
      console.log('Firestore not available, trying other options:', error.message)
    }

    // Check for API configuration in environment variables
    const apiConfig = {
      apiUrl: process.env.GATSBY_VEHICLES_API_URL,
      apiKey: process.env.GATSBY_VEHICLES_API_KEY
    }

    if (apiConfig.apiUrl) {
      console.log('Using API adapter as primary storage')
      this.primaryAdapter = new APIAdapter(apiConfig)
      this.adapters = [this.primaryAdapter, this.fallbackAdapter]
    } else if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      // Development environment - try file adapter
      console.log('Development environment detected, trying file adapter')
      this.primaryAdapter = new FileAdapter()
      this.adapters = [this.primaryAdapter, this.fallbackAdapter]
    } else {
      // Production without API - use localStorage
      console.log('Using localStorage as primary storage')
      this.primaryAdapter = this.fallbackAdapter
      this.adapters = [this.primaryAdapter]
    }
  }

  setupSync() {
    // Sync every 5 minutes if multiple adapters are available
    if (this.adapters.length > 1) {
      setInterval(() => {
        this.syncAdapters()
      }, 5 * 60 * 1000)
    }
  }

  async executeWithFallback(operation, ...args) {
    let lastError = null
    
    for (const adapter of this.adapters) {
      try {
        const result = await adapter[operation](...args)
        
        // If this is not the primary adapter, sync the data
        if (adapter !== this.primaryAdapter && this.syncEnabled) {
          this.syncAdapters().catch(console.error)
        }
        
        return result
      } catch (error) {
        console.warn(`${operation} failed on ${adapter.constructor.name}:`, error)
        lastError = error
        continue
      }
    }
    
    throw lastError || new Error(`All storage adapters failed for operation: ${operation}`)
  }

  async getVehicles() {
    try {
      return await this.executeWithFallback('getVehicles')
    } catch (error) {
      console.error('Failed to get vehicles from all adapters:', error)
      return []
    }
  }

  async saveVehicle(vehicleData) {
    const vehicle = {
      ...vehicleData,
      id: vehicleData.id || this.generateId(vehicleData),
      createdAt: vehicleData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      source: 'stored'
    }

    try {
      const result = await this.executeWithFallback('saveVehicle', vehicle)
      
      // Trigger sync to other adapters
      if (this.adapters.length > 1) {
        this.syncVehicleToOtherAdapters(result).catch(console.error)
      }
      
      return result
    } catch (error) {
      console.error('Failed to save vehicle to all adapters:', error)
      throw error
    }
  }

  async deleteVehicle(id) {
    try {
      const result = await this.executeWithFallback('deleteVehicle', id)
      
      // Sync deletion to other adapters
      if (this.adapters.length > 1) {
        this.syncDeletionToOtherAdapters(id).catch(console.error)
      }
      
      return result
    } catch (error) {
      console.error('Failed to delete vehicle from all adapters:', error)
      return false
    }
  }

  async clearAll() {
    try {
      return await this.executeWithFallback('clearAll')
    } catch (error) {
      console.error('Failed to clear vehicles from all adapters:', error)
      return false
    }
  }

  async exportVehicles() {
    try {
      return await this.executeWithFallback('exportVehicles')
    } catch (error) {
      console.error('Failed to export vehicles:', error)
      throw error
    }
  }

  async importVehicles(jsonData) {
    try {
      return await this.executeWithFallback('importVehicles', jsonData)
    } catch (error) {
      console.error('Failed to import vehicles:', error)
      throw error
    }
  }

  // Synchronization methods
  async syncAdapters() {
    if (this.adapters.length < 2 || !this.syncEnabled) return

    try {
      console.log('Starting adapter synchronization...')
      
      const primaryVehicles = await this.primaryAdapter.getVehicles()
      
      // Sync to other adapters
      for (const adapter of this.adapters) {
        if (adapter === this.primaryAdapter) continue
        
        try {
          const adapterVehicles = await adapter.getVehicles()
          const updates = this.findSyncUpdates(primaryVehicles, adapterVehicles)
          
          if (updates.length > 0) {
            console.log(`Syncing ${updates.length} vehicles to ${adapter.constructor.name}`)
            
            for (const vehicle of updates) {
              await adapter.saveVehicle(vehicle)
            }
          }
        } catch (error) {
          console.warn(`Sync failed for ${adapter.constructor.name}:`, error)
        }
      }
      
      this.lastSync = new Date().toISOString()
      console.log('Adapter synchronization completed')
    } catch (error) {
      console.error('Synchronization failed:', error)
    }
  }

  async syncVehicleToOtherAdapters(vehicle) {
    for (const adapter of this.adapters) {
      if (adapter === this.primaryAdapter) continue
      
      try {
        await adapter.saveVehicle(vehicle)
      } catch (error) {
        console.warn(`Failed to sync vehicle to ${adapter.constructor.name}:`, error)
      }
    }
  }

  async syncDeletionToOtherAdapters(vehicleId) {
    for (const adapter of this.adapters) {
      if (adapter === this.primaryAdapter) continue
      
      try {
        await adapter.deleteVehicle(vehicleId)
      } catch (error) {
        console.warn(`Failed to sync deletion to ${adapter.constructor.name}:`, error)
      }
    }
  }

  findSyncUpdates(primaryVehicles, secondaryVehicles) {
    const secondaryMap = new Map(secondaryVehicles.map(v => [v.id, v]))
    const updates = []
    
    for (const primaryVehicle of primaryVehicles) {
      const secondaryVehicle = secondaryMap.get(primaryVehicle.id)
      
      if (!secondaryVehicle || 
          new Date(primaryVehicle.updatedAt) > new Date(secondaryVehicle.updatedAt)) {
        updates.push(primaryVehicle)
      }
    }
    
    return updates
  }

  // Utility methods
  generateId(vehicleData) {
    const base = `${vehicleData.make}-${vehicleData.model}-${vehicleData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const timestamp = Date.now().toString(36)
    return `${base}-${timestamp}`
  }

  // Status and monitoring
  async getStorageStatus() {
    const adapters = []
    
    for (const adapter of this.adapters) {
      let status = 'connected'
      let error = null
      
      try {
        if (adapter.healthCheck) {
          const healthResult = await adapter.healthCheck()
          status = healthResult.status
          error = healthResult.error
        }
      } catch (e) {
        status = 'disconnected'
        error = e.message
      }
      
      adapters.push({
        name: adapter.constructor.name,
        isPrimary: adapter === this.primaryAdapter,
        status,
        error
      })
    }
    
    return {
      adapters,
      lastSync: this.lastSync,
      syncEnabled: this.syncEnabled
    }
  }

  enableSync() {
    this.syncEnabled = true
  }

  disableSync() {
    this.syncEnabled = false
  }

  // Manual sync trigger
  async forcSync() {
    await this.syncAdapters()
  }
}

// Create singleton instance
const storageManager = new StorageManager()

export default storageManager

// Export the class for testing
export { StorageManager }