// Firestore adapter for vehicle storage
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export class FirestoreAdapter {
  constructor() {
    this.collectionName = 'vehicles'
    this.collection = collection(db, this.collectionName)
  }

  async getVehicles() {
    try {
      const q = query(this.collection, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const vehicles = []
      querySnapshot.forEach((doc) => {
        vehicles.push({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore timestamps to ISO strings
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
          updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt
        })
      })
      
      return vehicles
    } catch (error) {
      console.error('Error fetching vehicles from Firestore:', error)
      throw error
    }
  }

  async saveVehicle(vehicleData) {
    try {
      const now = serverTimestamp()
      
      const vehicle = {
        ...vehicleData,
        updatedAt: now,
        source: 'stored'
      }

      if (vehicleData.id) {
        // Update existing vehicle
        const docRef = doc(db, this.collectionName, vehicleData.id)
        await updateDoc(docRef, vehicle)
        
        // Get the updated document to return with proper timestamps
        const updatedDoc = await getDoc(docRef)
        return {
          id: updatedDoc.id,
          ...updatedDoc.data(),
          createdAt: updatedDoc.data().createdAt?.toDate?.()?.toISOString() || updatedDoc.data().createdAt,
          updatedAt: updatedDoc.data().updatedAt?.toDate?.()?.toISOString() || updatedDoc.data().updatedAt
        }
      } else {
        // Create new vehicle with custom ID
        const vehicleId = this.generateId(vehicleData)
        vehicle.id = vehicleId
        vehicle.createdAt = now
        
        const docRef = doc(db, this.collectionName, vehicleId)
        await setDoc(docRef, vehicle)
        
        // Get the created document to return with proper timestamps
        const createdDoc = await getDoc(docRef)
        return {
          id: createdDoc.id,
          ...createdDoc.data(),
          createdAt: createdDoc.data().createdAt?.toDate?.()?.toISOString() || createdDoc.data().createdAt,
          updatedAt: createdDoc.data().updatedAt?.toDate?.()?.toISOString() || createdDoc.data().updatedAt
        }
      }
    } catch (error) {
      console.error('Error saving vehicle to Firestore:', error)
      throw error
    }
  }

  async deleteVehicle(id) {
    try {
      const docRef = doc(db, this.collectionName, id)
      await deleteDoc(docRef)
      return true
    } catch (error) {
      console.error('Error deleting vehicle from Firestore:', error)
      return false
    }
  }

  async clearAll() {
    try {
      const querySnapshot = await getDocs(this.collection)
      const deletePromises = []
      
      querySnapshot.forEach((doc) => {
        deletePromises.push(deleteDoc(doc.ref))
      })
      
      await Promise.all(deletePromises)
      return true
    } catch (error) {
      console.error('Error clearing vehicles from Firestore:', error)
      return false
    }
  }

  async exportVehicles() {
    try {
      const vehicles = await this.getVehicles()
      const dataStr = JSON.stringify(vehicles, null, 2)
      const blob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `phaqui-vehicles-firestore-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting vehicles from Firestore:', error)
      throw error
    }
  }

  async importVehicles(jsonData) {
    try {
      const vehicles = JSON.parse(jsonData)
      
      if (!Array.isArray(vehicles)) {
        throw new Error('Invalid JSON format. Expected array of vehicles.')
      }

      const importPromises = vehicles.map(vehicle => {
        const vehicleData = {
          ...vehicle,
          id: vehicle.id || this.generateId(vehicle),
          createdAt: vehicle.createdAt || serverTimestamp(),
          updatedAt: serverTimestamp(),
          source: 'stored'
        }
        
        const docRef = doc(db, this.collectionName, vehicleData.id)
        return setDoc(docRef, vehicleData)
      })

      await Promise.all(importPromises)
      return vehicles.length
    } catch (error) {
      console.error('Error importing vehicles to Firestore:', error)
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

  // Health check method
  async healthCheck() {
    try {
      // Try to read from the collection to verify connection
      const q = query(this.collection, orderBy('createdAt', 'desc'))
      await getDocs(q)
      return { status: 'connected', service: 'Firestore' }
    } catch (error) {
      console.error('Firestore health check failed:', error)
      return { status: 'disconnected', service: 'Firestore', error: error.message }
    }
  }
}

export default FirestoreAdapter