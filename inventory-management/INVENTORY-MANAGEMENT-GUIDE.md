# 🚗 PH Aqui Inventory Management Guide

## Quick Start for Adding New Vehicles

### Step 1: Prepare Vehicle Information
Gather the following details for each vehicle:
- Make, Model, Year
- Price and Mileage
- VIN Number
- Colors (Exterior/Interior)
- Key Features
- Vehicle Photos

### Step 2: Create Vehicle File

1. **Copy the template**: Use `inventory-template.md` as your starting point
2. **Name the file**: Use format `make-model-year.md` (e.g., `honda-civic-2023.md`)
3. **Save location**: Place in `/src/content/inventory/` folder

### Step 3: Fill Out Vehicle Details

#### Required Fields:
```yaml
make: "Honda"           # Brand name
model: "Civic"          # Vehicle model
year: 2023              # Model year
price: 25900            # Price in USD (no commas)
mileage: 12000          # Current mileage
transmission: "CVT"     # Automatic, Manual, CVT
fuelType: "Gasoline"    # Gasoline, Hybrid, Electric
drivetrain: "FWD"       # FWD, RWD, AWD
vin: "19XFC2F59NE123456" # Vehicle VIN number
exteriorColor: "Silver" # Paint color
interiorColor: "Black"  # Interior color
condition: "Excellent"  # Excellent, Good, Fair
```

#### Features List:
```yaml
features:
  - "Apple CarPlay/Android Auto"
  - "Backup Camera"
  - "Bluetooth Connectivity"
  - "Cruise Control"
  - "Power Windows"
  - "Air Conditioning"
```

### Step 4: Add Vehicle Photos

#### Photo Requirements:
- **Main photo**: `hero-car.png` (featured image)
- **Gallery photos**: 3-6 additional images
- **Format**: PNG or JPG
- **Size**: Minimum 800x600px
- **Quality**: High resolution, well-lit

#### Photo Organization:
1. Create folder: `/src/images/vehicles/[make-model-year]/`
2. Name photos: `main.png`, `interior.png`, `side.png`, etc.
3. Update image paths in markdown file

### Step 5: Popular Jamaica Vehicle Templates

## Toyota Camry (Most Popular)
```yaml
make: "Toyota"
model: "Camry"
year: 2023
price: 28900
transmission: "Automatic"
fuelType: "Gasoline"
drivetrain: "FWD"
features:
  - "Toyota Safety Sense 2.0"
  - "Apple CarPlay/Android Auto"
  - "Blind Spot Monitoring"
  - "Lane Departure Warning"
  - "Adaptive Cruise Control"
```

## Honda CR-V (Popular SUV)
```yaml
make: "Honda"
model: "CR-V"
year: 2023
price: 32900
transmission: "CVT"
fuelType: "Gasoline"
drivetrain: "AWD"
features:
  - "Honda Sensing Suite"
  - "Power Tailgate"
  - "Sunroof"
  - "Heated Seats"
  - "All-Weather Floor Mats"
```

## Nissan Altima (Value Option)
```yaml
make: "Nissan"
model: "Altima"
year: 2023
price: 26900
transmission: "CVT"
fuelType: "Gasoline"
drivetrain: "FWD"
features:
  - "Nissan Safety Shield 360"
  - "Remote Engine Start"
  - "Intelligent Key"
  - "Dual-Zone Climate Control"
  - "8-inch Touchscreen"
```

### Step 6: Common Features for Jamaica Market

#### Essential Features (Most Requested):
- "Air Conditioning" (Critical for Jamaica!)
- "Power Steering"
- "Power Windows"
- "Central Locking"
- "Radio/CD Player"
- "Bluetooth Connectivity"

#### Popular Upgrades:
- "Apple CarPlay/Android Auto"
- "Backup Camera"
- "Cruise Control"
- "Sunroof"
- "Alloy Wheels"
- "Fog Lights"

#### Safety Features:
- "Anti-lock Brakes (ABS)"
- "Electronic Stability Control"
- "Multiple Airbags"
- "Tire Pressure Monitoring"
- "Daytime Running Lights"

### Step 7: Pricing Guidelines for Jamaica

#### Price Ranges by Category:
- **Compact Cars**: $18,000 - $25,000
- **Mid-size Sedans**: $25,000 - $35,000
- **Compact SUVs**: $28,000 - $40,000
- **Full-size SUVs**: $35,000 - $50,000+

#### Popular Models & Expected Prices:
- **Toyota Camry**: $26,000 - $32,000
- **Honda Civic**: $22,000 - $28,000
- **Nissan Altima**: $24,000 - $30,000
- **Honda CR-V**: $30,000 - $38,000
- **Toyota RAV4**: $32,000 - $40,000

### Step 8: Quick Publishing

1. **Save the file** in `/src/content/inventory/`
2. **Restart the website** (the system will auto-detect new vehicles)
3. **Check the inventory page** at `http://localhost:8000/inventory`

### Step 9: Removing Vehicles

When a vehicle is sold:
1. **Delete the markdown file** from `/src/content/inventory/`
2. **Remove vehicle photos** from `/src/images/vehicles/`
3. **Restart the website** to update

### Tips for Success:

#### Photography Tips:
- Take photos during golden hour (early morning/late afternoon)
- Clean the vehicle thoroughly before photos
- Include: Front 3/4 view, side profile, rear, interior, engine bay
- Highlight any damage honestly

#### Writing Descriptions:
- Be honest about condition
- Highlight Jamaica-relevant features (AC, fuel efficiency)
- Mention service history
- Include warranty information

#### Popular Search Terms in Jamaica:
- "Low mileage"
- "Excellent condition"
- "Service records available"
- "No accident history"
- "Fuel efficient"
- "Reliable transportation"

### Need Help?

If you encounter issues:
1. Check that file format matches the template exactly
2. Ensure all required fields are filled
3. Verify image paths are correct
4. Restart the development server

### Monthly Maintenance:

- Review and update prices based on market conditions
- Remove sold vehicles promptly
- Add new arrivals within 24 hours
- Update featured vehicles seasonally
- Check that all images are loading properly

---

**Contact Technical Support**: If you need help with this system, keep this guide handy and note any specific error messages you encounter.