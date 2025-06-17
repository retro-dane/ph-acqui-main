#!/usr/bin/env node

/**
 * PH Aqui Vehicle Creator Script
 * Quick helper to create new vehicle inventory files
 * 
 * Usage: node create-vehicle.js
 * Then follow the prompts to create a new vehicle listing
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

const popularMakes = ['Toyota', 'Honda', 'Nissan', 'Mazda', 'Subaru', 'Hyundai', 'Kia'];
const popularModels = {
  Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Prius'],
  Honda: ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
  Nissan: ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Murano'],
  Mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'CX-30'],
  Subaru: ['Outback', 'Forester', 'Impreza', 'Legacy', 'Ascent'],
  Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Accent'],
  Kia: ['Forte', 'Optima', 'Sorento', 'Sportage', 'Soul']
};

const popularFeatures = [
  'Air Conditioning',
  'Apple CarPlay/Android Auto',
  'Backup Camera',
  'Bluetooth Connectivity',
  'Cruise Control',
  'Power Windows',
  'Power Steering',
  'Central Locking',
  'Alloy Wheels',
  'Sunroof',
  'Heated Seats',
  'Lane Departure Warning',
  'Blind Spot Monitoring',
  'Adaptive Cruise Control',
  'Anti-lock Brakes (ABS)',
  'Electronic Stability Control',
  'Multiple Airbags',
  'Tire Pressure Monitoring'
];

async function createVehicle() {
  console.log('🚗 PH Aqui Vehicle Creator');
  console.log('===========================\n');

  // Collect basic info
  const make = await ask('Vehicle Make (e.g., Toyota): ');
  const model = await ask('Vehicle Model (e.g., Camry): ');
  const year = await ask('Year: ');
  const price = await ask('Price (USD, no commas): ');
  const mileage = await ask('Mileage: ');
  
  // Collect details
  console.log('\nVehicle Details:');
  const transmission = await ask('Transmission (Automatic/Manual/CVT): ') || 'Automatic';
  const fuelType = await ask('Fuel Type (Gasoline/Hybrid/Electric): ') || 'Gasoline';
  const drivetrain = await ask('Drivetrain (FWD/RWD/AWD): ') || 'FWD';
  const exteriorColor = await ask('Exterior Color: ');
  const interiorColor = await ask('Interior Color: ');
  const condition = await ask('Condition (Excellent/Good/Fair): ') || 'Excellent';
  const vin = await ask('VIN Number: ');

  // Features selection
  console.log('\nSelect Features (enter numbers separated by commas, or press Enter to skip):');
  popularFeatures.forEach((feature, index) => {
    console.log(`${index + 1}. ${feature}`);
  });
  
  const featureInput = await ask('\nSelected features (e.g., 1,2,3): ');
  const selectedFeatures = featureInput
    .split(',')
    .map(num => parseInt(num.trim()) - 1)
    .filter(index => index >= 0 && index < popularFeatures.length)
    .map(index => popularFeatures[index]);

  // Vehicle description
  const overview = await ask('\nVehicle Overview (brief description): ') || 
    `The ${year} ${make} ${model} combines reliability with modern features.`;

  // Create the markdown content
  const filename = `${make.toLowerCase()}-${model.toLowerCase()}-${year}.md`;
  const filepath = path.join(__dirname, '..', 'src', 'content', 'inventory', filename);

  const content = `---
make: "${make}"
model: "${model}"
year: ${year}
price: ${price}
mileage: ${mileage}
transmission: "${transmission}"
fuelType: "${fuelType}"
drivetrain: "${drivetrain}"
vin: "${vin}"
exteriorColor: "${exteriorColor}"
interiorColor: "${interiorColor}"
features:${selectedFeatures.length > 0 ? '\n  - "' + selectedFeatures.join('"\n  - "') + '"' : '\n  - "Air Conditioning"'}
condition: "${condition}"
featuredImage: "./hero-car.png"
galleryImages:
  - "../../images/vehicles/icon.png"
  - "../../images/vehicles/icon.png"
  - "../../images/vehicles/icon.png"
---

## Vehicle Overview

${overview}

This well-maintained ${year} ${make} ${model} includes:

- Only ${mileage.toLocaleString()} miles
- Single owner vehicle
- Complete service records
- No accident history

## Detailed Specifications

- **Engine:** [Engine information]
- **MPG:** [City] city / [Highway] highway
- **Seating:** [Number] passengers
- **Warranty:** [Warranty information]

## Features & Equipment

${selectedFeatures.length > 0 ? selectedFeatures.map(feature => `- ${feature}`).join('\n') : '- Air Conditioning\n- Power Steering\n- Power Windows'}

## Financing Available

- Competitive interest rates
- Flexible payment terms
- Trade-ins welcome
- Quick approval process

*Contact PH Aqui today to schedule a test drive or learn more about this exceptional vehicle.*`;

  // Write the file
  try {
    // Ensure directory exists
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filepath, content);
    
    console.log('\n✅ Vehicle created successfully!');
    console.log(`📁 File: ${filename}`);
    console.log(`📍 Location: ${filepath}`);
    console.log('\n📸 Next steps:');
    console.log('1. Add vehicle photos to /src/images/vehicles/');
    console.log('2. Update the featuredImage path in the file');
    console.log('3. Restart your development server');
    console.log('4. Check the inventory page at http://localhost:8000/inventory');
    
  } catch (error) {
    console.error('❌ Error creating file:', error.message);
  }

  rl.close();
}

// Run the script
createVehicle().catch(console.error);