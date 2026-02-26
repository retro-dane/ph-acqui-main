import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import "../styles/services.css"
import heroCarImage from "../images/hero-car.png"

const ServicesPage = () => {
  const mainServices = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      ),
      title: "Vehicle Sourcing",
      description: "We help you find the perfect vehicle from trusted international markets. Cars, trucks, buses — we source vehicles of all sizes to meet your needs.",
      features: [
        "Access to international markets",
        "Vehicles of all sizes available",
        "Quality verification before purchase",
        "Transparent pricing guidance",
        "Personalized vehicle matching"
      ],
      highlight: "All Vehicle Types & Sizes"
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
      title: "Fee Advisory",
      description: "Navigate Jamaica's import fees and duties with confidence. We provide clear guidance on all costs so there are no surprises.",
      features: [
        "Import duty calculations",
        "GCT and SCT breakdowns",
        "Environmental levy guidance",
        "Total landed cost estimates",
        "Budget planning assistance"
      ],
      highlight: "No Hidden Costs"
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: "After-Purchase Maintenance",
      description: "Your journey doesn't end at purchase. We provide ongoing maintenance services to keep your imported vehicle running smoothly.",
      features: [
        "Regular servicing",
        "Parts sourcing assistance",
        "Mechanical repairs",
        "Trusted mechanic network"
      ],
      highlight: "Ongoing Support"
    },
    {
      id: 4,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      ),
      title: "Import Documentation",
      description: "We handle all the paperwork so you don't have to. From import licenses to registration, we make the process seamless.",
      features: [
        "Import license acquisition",
        "Vehicle registration assistance",
        "Licensing paperwork",
        "Fitness certificate coordination",
        "Customs clearance support"
      ],
      highlight: "Hassle-Free Paperwork"
    }
  ]

  const specialtyServices = [
    {
      title: "Port Pickup",
      description: "Collection from Kingston ports",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="1" y="3" width="15" height="13"/>
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    },
    {
      title: "Vehicle Inspection",
      description: "Pre-purchase quality checks",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
      )
    },
    {
      title: "Shipping Coordination",
      description: "International logistics support",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      )
    },
    {
      title: "Island Delivery",
      description: "Delivery across Jamaica",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      )
    },
    {
      title: "Parts Sourcing",
      description: "Hard-to-find replacement parts",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      )
    },
    {
      title: "Consultation",
      description: "Free import advice",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    }
  ]

  return (
    <Layout pageTitle="Our Services">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-content">
          <div className="hero-text">
            <div className="hero-badge">Jamaica's Trusted Importer</div>
            <h1>
              Vehicle Import
              <span className="hero-highlight"> Services</span>
            </h1>
            <p>
              From sourcing to registration — we handle every step of your vehicle import journey.
            </p>
          </div>
          <div className="hero-image">
            <img src={heroCarImage} alt="Premium automotive services" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Services</h2>
            <p>Everything you need for a smooth vehicle import experience</p>
          </div>
          <div className="services-grid">
            {mainServices.map(service => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  {service.icon}
                </div>
                <div className="service-content">
                  <div className="service-highlight">{service.highlight}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-features">
                    <ul>
                      {service.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="service-cta">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialty Services */}
      <section className="specialty-services">
        <div className="container">
          <div className="section-header">
            <h2>Additional Services</h2>
            <p>Extra support to make your import journey easier</p>
          </div>
          <div className="specialty-grid">
            {specialtyServices.map((service, index) => (
              <div key={index} className="specialty-card">
                <div className="specialty-icon">
                  {service.icon}
                </div>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Your vehicle import journey made simple</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>Tell us what you're looking for — vehicle type, budget, and preferences. We'll guide you through your options.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Sourcing</h3>
              <p>We search international markets to find quality vehicles that match your requirements and budget.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Import & Paperwork</h3>
              <p>We handle shipping, customs clearance, import licenses, and all documentation on your behalf.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Registration & Delivery</h3>
              <p>We complete vehicle registration, licensing, and fitness certification — then deliver your vehicle ready to drive.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Import Your Next Vehicle?</h2>
            <p>
              Get in touch for a free consultation. We'll help you understand the process,
              estimate costs, and find the perfect vehicle for your needs.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="cta-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ServicesPage