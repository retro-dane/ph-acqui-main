#!/usr/bin/env node

/**
 * PH Aqui Vehicle Creator Launcher
 * Launches the inventory management system
 */

const { execSync } = require('child_process');
const path = require('path');

console.log('🚗 Launching PH Aqui Vehicle Creator...\n');

try {
  // Run the create-vehicle script from the inventory-management folder
  execSync('node inventory-management/create-vehicle.js', { 
    stdio: 'inherit',
    cwd: __dirname 
  });
} catch (error) {
  console.error('❌ Error running vehicle creator:', error.message);
  console.log('\n📁 Make sure you run this from the project root directory.');
  console.log('📖 Check inventory-management/README.md for help.');
}