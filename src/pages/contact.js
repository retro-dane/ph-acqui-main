// src/pages/contact.js
import React, { useState } from "react"
import Layout from "../components/Layout"
import { navigate } from "gatsby"
import "../styles/contact.css"
import heroCarImage from "../images/hero-car.png"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        navigate("/thank-you")
      } else {
        setSubmitError("Failed to send message. Please try again or contact us directly.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Failed to send message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: "Call Us",
      primary: "876 317-5375",
      secondary: "Sales & Service",
      action: "tel:5551234567"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: "Email Us",
      primary: "phacquimain@gmail.com",
      secondary: "Quick Response Guaranteed",
      action: "mailto:phacquimain@gmail.com"
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "Visit Us",
      primary: "19 A South Road ",
      secondary: "Kingston 10",
      links: [
        { label: "Apple Maps", url: "https://maps.apple.com/place?coordinate=18.000584,-76.796965&name=South%20Road&map=h" },
        { label: "Google Maps", url: "https://maps.app.goo.gl/yxFCad5mJCMqHwpK7" }
      ]
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      title: "Business Hours",
      primary: "Mon-Fri: 8AM-5PM",
      secondary: "Sat-Sun: Closed",
      action: "#"
    }
  ]

  const services = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M7 17h10l4-7H11l-1.5-3h-5l2 4z"/>
          <circle cx="8.5" cy="19.5" r="1.5"/>
          <circle cx="17.5" cy="19.5" r="1.5"/>
        </svg>
      ),
      title: "Vehicle Sales",
      description: "Certified pre-owned vehicles"
    },

    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
        </svg>
      ),
      title: "Service & Repair",
      description: "Expert maintenance"
    },
    //{
    //  icon: (
    //    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    //      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    //    </svg>
    //  ),
    //  title: "Warranties",
    //  description: "Comprehensive protection"
    //}
  ]

  return (
    <Layout pageTitle="Contact Us">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <div className="hero-text">
            <div className="hero-badge">Get in Touch</div>
            <h1>
              Ready to Find Your
              <span className="hero-highlight"> Perfect Vehicle?</span>
            </h1>
            <p>
              Our automotive experts are here to help you every step of the way. From vehicle 
              selection to financing and service, we're committed to providing exceptional support.
            </p>
          </div>
          <div className="hero-image">
            <img src={heroCarImage} alt="Contact PH Aqui dealership" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="section-header">
            <h2>How Can We Help You?</h2>
            <p>Choose the best way to reach our team</p>
          </div>
          <div className="methods-grid">
            {contactMethods.map((method, index) => (
              method.links ? (
                <div key={index} className="method-card">
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <h3>{method.title}</h3>
                  <p className="method-primary">{method.primary}</p>
                  <p className="method-secondary">{method.secondary}</p>
                  <div className="method-links">
                    {method.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        className="method-link-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={index}
                  href={method.action}
                  className="method-card"
                  {...(method.action.startsWith('tel:') || method.action.startsWith('mailto:') ? {} : { onClick: (e) => e.preventDefault() })}
                >
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <h3>{method.title}</h3>
                  <p className="method-primary">{method.primary}</p>
                  <p className="method-secondary">{method.secondary}</p>
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            {/* Contact Form */}
            <div className="contact-form-container">
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>Fill out the form below and we'll get back to you within 24 hours</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows="6"
                  />
                </div>
                
                {submitError && (
                  <div className="form-error" style={{ color: "#dc3545", marginBottom: "1rem", padding: "0.75rem", backgroundColor: "#f8d7da", borderRadius: "4px" }}>
                    {submitError}
                  </div>
                )}

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="contact-info-sidebar">
              <div className="info-card">
                <h3>Why Choose PH Aqui?</h3>
                <div className="services-list">
                  {services.map((service, index) => (
                    <div key={index} className="service-item">
                      <div className="service-icon">
                        {service.icon}
                      </div>
                      <div className="service-content">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h3>Quick Response Promise</h3>
                <p>
                  We guarantee a response to your inquiry within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
                <div className="response-features">
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    <span>24-hour response time</span>
                  </div>
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    <span>Expert automotive advice</span>
                  </div>
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                    <span>Personalized solutions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ContactPage