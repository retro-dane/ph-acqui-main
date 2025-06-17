const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require('path')
const fs = require('fs').promises

// Create API endpoints for vehicle management
exports.onCreateDevServer = ({ app }) => {
  const vehiclesFilePath = path.join(__dirname, 'public', 'phaqui-vehicles.json')

  // Helper function to read vehicles file
  const readVehiclesFile = async () => {
    try {
      const data = await fs.readFile(vehiclesFilePath, 'utf8')
      return JSON.parse(data)
    } catch (error) {
      if (error.code === 'ENOENT') {
        // File doesn't exist, return empty array
        return []
      }
      throw error
    }
  }

  // Helper function to write vehicles file
  const writeVehiclesFile = async (vehicles) => {
    await fs.writeFile(vehiclesFilePath, JSON.stringify(vehicles, null, 2))
  }

  // Helper function to generate ID
  const generateId = (vehicleData) => {
    const base = `${vehicleData.make}-${vehicleData.model}-${vehicleData.year}`
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
    
    const timestamp = Date.now().toString(36)
    return `${base}-${timestamp}`
  }

  // GET /api/vehicles - Get all vehicles
  app.get('/api/vehicles', async (req, res) => {
    try {
      const vehicles = await readVehiclesFile()
      res.json(vehicles)
    } catch (error) {
      console.error('Error reading vehicles:', error)
      res.status(500).json({ error: 'Failed to read vehicles' })
    }
  })

  // POST /api/vehicles - Create or update a vehicle
  app.post('/api/vehicles', async (req, res) => {
    try {
      const vehicleData = req.body
      const vehicles = await readVehiclesFile()
      
      const vehicleId = vehicleData.id || generateId(vehicleData)
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

      await writeVehiclesFile(vehicles)
      res.json(vehicle)
    } catch (error) {
      console.error('Error saving vehicle:', error)
      res.status(500).json({ error: 'Failed to save vehicle' })
    }
  })

  // DELETE /api/vehicles/:id - Delete a specific vehicle
  app.delete('/api/vehicles/:id', async (req, res) => {
    try {
      const { id } = req.params
      const vehicles = await readVehiclesFile()
      const filteredVehicles = vehicles.filter(v => v.id !== id)
      
      if (filteredVehicles.length === vehicles.length) {
        return res.status(404).json({ error: 'Vehicle not found' })
      }

      await writeVehiclesFile(filteredVehicles)
      res.json({ success: true, id })
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      res.status(500).json({ error: 'Failed to delete vehicle' })
    }
  })

  // DELETE /api/vehicles/clear - Clear all vehicles
  app.delete('/api/vehicles/clear', async (req, res) => {
    try {
      await writeVehiclesFile([])
      res.json({ success: true, message: 'All vehicles cleared' })
    } catch (error) {
      console.error('Error clearing vehicles:', error)
      res.status(500).json({ error: 'Failed to clear vehicles' })
    }
  })

  // POST /api/vehicles/import - Import vehicles from JSON
  app.post('/api/vehicles/import', async (req, res) => {
    try {
      const importedVehicles = req.body
      
      if (!Array.isArray(importedVehicles)) {
        return res.status(400).json({ error: 'Invalid data format. Expected array of vehicles.' })
      }

      // Add metadata to imported vehicles
      const processedVehicles = importedVehicles.map(vehicle => ({
        ...vehicle,
        id: vehicle.id || generateId(vehicle),
        createdAt: vehicle.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        source: 'stored'
      }))

      await writeVehiclesFile(processedVehicles)
      res.json({ success: true, count: processedVehicles.length })
    } catch (error) {
      console.error('Error importing vehicles:', error)
      res.status(500).json({ error: 'Failed to import vehicles' })
    }
  })

  console.log('🚗 Vehicle API endpoints created:')
  console.log('   GET    /api/vehicles')
  console.log('   POST   /api/vehicles')
  console.log('   DELETE /api/vehicles/:id')
  console.log('   DELETE /api/vehicles/clear')
  console.log('   POST   /api/vehicles/import')
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: `/inventory${value}`,
    })
  }
}