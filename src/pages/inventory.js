import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import CarCard from "../components/CarCard/carCard"
import { useVehicles } from "../hooks/useVehicles"
import "../styles/inventory.css"
import heroCarImage from "../images/hero-car.png"

const InventoryPage = ({ data }) => {
  // Get vehicles from both markdown files and localStorage
  const { allVehicles, isLoaded } = useVehicles(data.allMarkdownRemark.nodes)
  
  // Define helper function first
  const checkPriceRange = (price, range) => {
    const [min, max] = range.split("-").map(Number)
    return price >= min && price <= max
  }

  // Map vehicles to the expected format
  const allCars = allVehicles.map(vehicle => ({
    ...vehicle,
    slug: vehicle.slug || `/inventory/${vehicle.id}`,
  }))

  const [filters, setFilters] = useState({
    make: "",
    priceRange: "",
    year: ""
  })

  const filteredCars = allCars.filter(car => {
    const { make, priceRange, year } = filters
    return (
      (make === "" || car.make === make) &&
      (priceRange === "" || checkPriceRange(car.price, priceRange)) &&
      (year === "" || car.year >= year)
    )
  })

  const uniqueMakes = [...new Set(allCars.map(car => car.make))]

  return (
    <Layout pageTitle="Inventory">
      {/* Hero Section */}
      <section className="inventory-hero">
        <div className="inventory-hero-content">
          <div className="hero-text">
            <div className="hero-badge">Premium Collection</div>
            <h1>
              Discover Your
              <span className="hero-highlight"> Perfect Vehicle</span>
            </h1>
            <p>
              Browse our carefully curated selection of premium vehicles. From luxury sedans to 
              high-performance SUVs, find the perfect vehicle that matches your lifestyle and budget.
            </p>
          </div>
          <div className="hero-image">
            <img src={heroCarImage} alt="Premium vehicle inventory" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Inventory Section */}
      <section className="inventory-section">
        <div className="container">
          <div className="inventory-layout">
            {/* Filters Sidebar */}
            <div className="filters-sidebar">
              <div className="filters-header">
                <h3>Refine Your Search</h3>
                <button 
                  className="reset-filters"
                  onClick={() => setFilters({ make: "", priceRange: "", year: "" })}
                >
                  Clear All
                </button>
              </div>
              
              <div className="filter-group">
                <label htmlFor="make-filter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M7 17h10l4-7H11l-1.5-3h-5l2 4z"/>
                    <circle cx="8.5" cy="19.5" r="1.5"/>
                    <circle cx="17.5" cy="19.5" r="1.5"/>
                  </svg>
                  Make & Model
                </label>
                <select 
                  id="make-filter"
                  value={filters.make}
                  onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                >
                  <option value="">All Makes</option>
                  {uniqueMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="price-filter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Price Range
                </label>
                <select 
                  id="price-filter"
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                >
                  <option value="">All Prices</option>
                  <option value="0-25000">Under $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000-75000">$50,000 - $75,000</option>
                  <option value="75000-100000">$75,000 - $100,000</option>
                  <option value="100000-999999">$100,000+</option>
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="year-filter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  Minimum Year
                </label>
                <select 
                  id="year-filter"
                  value={filters.year}
                  onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                >
                  <option value="">Any Year</option>
                  <option value="2024">2024 or newer</option>
                  <option value="2022">2022 or newer</option>
                  <option value="2020">2020 or newer</option>
                  <option value="2018">2018 or newer</option>
                  <option value="2015">2015 or newer</option>
                </select>
              </div>

              <div className="filter-summary">
                <div className="results-count">
                  <span className="count-number">{filteredCars.length}</span>
                  <span className="count-label">vehicles found</span>
                </div>
              </div>
            </div>

            {/* Inventory Grid */}
            <div className="inventory-content">
              <div className="inventory-header">
                <h2>Available Vehicles</h2>
                <div className="view-options">
                  <button className="view-btn active">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="3" width="7" height="7"/>
                      <rect x="14" y="3" width="7" height="7"/>
                      <rect x="14" y="14" width="7" height="7"/>
                      <rect x="3" y="14" width="7" height="7"/>
                    </svg>
                  </button>
                  <button className="view-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <line x1="8" y1="6" x2="21" y2="6"/>
                      <line x1="8" y1="12" x2="21" y2="12"/>
                      <line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/>
                      <line x1="3" y1="12" x2="3.01" y2="12"/>
                      <line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="inventory-grid">
                {!isLoaded ? (
                  <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading vehicles...</p>
                  </div>
                ) : filteredCars.length > 0 ? (
                  filteredCars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))
                ) : (
                  <div className="no-results">
                    <div className="no-results-icon">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="M21 21l-4.35-4.35"/>
                        <line x1="9" y1="9" x2="13" y2="13"/>
                        <line x1="13" y1="9" x2="9" y2="13"/>
                      </svg>
                    </div>
                    <h3>No vehicles found</h3>
                    <p>Try adjusting your filters to see more results</p>
                    <button 
                      className="reset-filters-btn"
                      onClick={() => setFilters({ make: "", priceRange: "", year: "" })}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          make
          model
          year
          price
          featuredImage {
            publicURL
          }
        }
        fields {
          slug
        }
      }
    }
  }
`

export default InventoryPage