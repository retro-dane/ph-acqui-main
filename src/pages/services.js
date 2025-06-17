import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import "../styles/services.css"
import heroCarImage from "../images/hero-car.png"

const ServicesPage = () => {
  const mainServices = [
    {
      id: 1,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 17h10l4-7H11l-1.5-3h-5l2 4z"/>
          <circle cx="8.5" cy="19.5" r="1.5"/>
          <circle cx="17.5" cy="19.5" r="1.5"/>
        </svg>
      ),
      title: "Premium Vehicle Sales",
      description: "Discover our curated collection of luxury and premium vehicles from the world's most prestigious manufacturers.",
      features: [
        "Certified pre-owned vehicles",
        "New luxury vehicle sales",
        "Competitive trade-in evaluations",
        "Extended warranty options",
        "Comprehensive vehicle history reports"
      ],
      highlight: "Over 500+ Premium Vehicles"
    },
    {
      id: 2,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
      title: "Flexible Financing",
      description: "Tailored financing solutions designed to make your dream vehicle affordable with competitive rates and flexible terms.",
      features: [
        "0.9% APR financing available",
        "Lease-to-own programs",
        "Bad credit specialists",
        "Same-day approval process",
        "Personalized payment plans"
      ],
      highlight: "Financing from 0.9% APR"
    },
    {
      id: 3,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      ),
      title: "Expert Maintenance",
      description: "State-of-the-art service center with factory-trained technicians ensuring your vehicle performs at its peak.",
      features: [
        "Manufacturer warranty service",
        "Advanced diagnostic equipment",
        "Genuine OEM parts",
        "Express service options",
        "Detailed service reporting"
      ],
      highlight: "Factory-Certified Technicians"
    },
    {
      id: 4,
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Comprehensive Protection",
      description: "Complete peace of mind with our comprehensive protection plans and insurance services tailored to your needs.",
      features: [
        "Extended warranty coverage",
        "Gap insurance protection",
        "24/7 roadside assistance",
        "Theft and damage protection",
        "Maintenance plan packages"
      ],
      highlight: "24/7 Support Available"
    }
  ]

  const specialtyServices = [
    {
      title: "Vehicle Detailing",
      description: "Professional detailing services",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      )
    },
    {
      title: "Vehicle Customization",
      description: "Personalize your vehicle",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 20h9"/>
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
        </svg>
      )
    },
    {
      title: "Vehicle Inspection",
      description: "Comprehensive safety checks",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
      )
    },
    {
      title: "Trade-In Evaluation",
      description: "Fair market value assessments",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="m15 14 5-5-5-5"/>
          <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/>
        </svg>
      )
    },
    {
      title: "Delivery Service",
      description: "Convenient vehicle delivery",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/>
        </svg>
      )
    },
    {
      title: "Insurance Services",
      description: "Comprehensive coverage options",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"/>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
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
            <div className="hero-badge">Comprehensive Solutions</div>
            <h1>
              Premium Automotive
              <span className="hero-highlight"> Services</span>
            </h1>
            <p>
              From sales to service, financing to protection – discover our complete suite of 
              premium automotive solutions designed to exceed your expectations at every touchpoint.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Premium Vehicles</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">98%</span>
                <span className="stat-label">Satisfaction Rate</span>
              </div>
            </div>
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
            <p>Comprehensive automotive solutions tailored to your needs</p>
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
            <h2>Specialty Services</h2>
            <p>Additional services to enhance your automotive experience</p>
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
            <h2>Our Service Process</h2>
            <p>A seamless experience from start to finish</p>
          </div>
          <div className="process-grid">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Consultation</h3>
              <p>We listen to your needs and preferences to understand exactly what you're looking for.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Selection</h3>
              <p>Browse our curated inventory or let our experts help you find the perfect vehicle.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Financing</h3>
              <p>Get pre-approved with competitive rates and flexible terms that work for your budget.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Delivery</h3>
              <p>Complete your purchase and drive away in your new vehicle with full confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Premium Service?</h2>
            <p>
              Schedule a consultation with our automotive experts and discover how we can 
              exceed your expectations at every step of your journey.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">Schedule Consultation</button>
              <button className="cta-secondary">Browse Inventory</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ServicesPage