// src/pages/index.js
import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { StaticImage } from "gatsby-plugin-image"
import "../styles/index.css"
import heroCarImage from "../images/hero-car.png"

const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">Premium Car Dealership</div>
            <h1>
              <span className="hero-highlight">Find Your</span>
              <br />
              Perfect Car Today
            </h1>
            <p className="subtitle">
              Discover premium vehicles with transparent pricing, expert service, and financing options tailored just for you.
            </p>
            <div className="hero-buttons">
              <Link to="/inventory" className="btn-primary">Browse Inventory</Link>
              <Link to="/contact" className="btn-secondary">Schedule Test Drive</Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="image-overlay"></div>
            <img
              src={heroCarImage}
              alt="Premium luxury cars"
              className="hero-img"
            />
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">Customer Rating</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>Experience the difference with our premium car buying service</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
              </div>
              <h3>Quality Guaranteed</h3>
              <p>Every vehicle undergoes rigorous inspection to ensure premium quality and reliability</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="m2 17 10 5 10-5"/>
                  <path d="m2 12 10 5 10-5"/>
                </svg>
              </div>
              <h3>Transparent Pricing</h3>
              <p>No hidden fees, no surprises. Get honest, competitive pricing on every vehicle</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
              </div>
              <h3>Fast & Easy Process</h3>
              <p>Streamlined paperwork and financing options to get you driving in no time</p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                </svg>
              </div>
              <h3>Expert Support</h3>
              <p>Our experienced team provides personalized assistance throughout your journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Find Your Dream Car?</h2>
            <p>
              Join thousands of satisfied customers who found their perfect vehicle with us. 
              Browse our extensive inventory or get pre-approved for financing today.
            </p>
            <div className="cta-buttons">
              <Link to="/inventory" className="btn-primary">View Inventory</Link>
              <Link to="/contact" className="btn-outline">Get Pre-Approved</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="who-we-are">
        <div className="container">
          <div className="section-header">
            <h2>Who We Are</h2>
            <p>Learn about our commitment to excellence and customer satisfaction</p>
          </div>
          <div className="about-grid">
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                </svg>
              </div>
              <h3>Customer-Focused Excellence</h3>
              <p>We put our customers at the heart of everything we do, ensuring every interaction exceeds expectations and builds lasting relationships.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3>Trusted Reputation</h3>
              <p>Built on years of integrity and reliability, we've earned the trust of thousands of satisfied customers across the community.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m0-7v7m0-7V9a2 2 0 0 1 2-2h3"/>
                  <path d="M12 7V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3"/>
                  <path d="M16 11h3a2 2 0 0 1 2 2v3c0 1.1-.9 2-2 2h-3"/>
                </svg>
              </div>
              <h3>Innovation & Technology</h3>
              <p>We leverage cutting-edge technology and innovative solutions to streamline your car buying experience and provide superior service.</p>
            </div>
            <div className="about-card">
              <div className="about-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                </svg>
              </div>
              <h3>Performance Driven</h3>
              <p>Our commitment to excellence drives us to continuously improve our services and deliver outstanding results for every customer.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p>Read real experiences from satisfied customers who found their perfect vehicle with us</p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="currentColor"/>
                  </svg>
                </div>
                <p>"Exceptional service from start to finish! The team was knowledgeable, patient, and helped me find the perfect car within my budget. The entire process was smooth and transparent."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>SM</span>
                </div>
                <div className="author-info">
                  <h4>Sarah Mitchell</h4>
                  <p>Purchased: 2023 Honda Accord</p>
                  <div className="rating">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="currentColor"/>
                  </svg>
                </div>
                <p>"Outstanding experience! They took care of all the paperwork and financing details. I felt confident in my purchase and would definitely recommend them to friends and family."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>MJ</span>
                </div>
                <div className="author-info">
                  <h4>Michael Johnson</h4>
                  <p>Purchased: 2024 Toyota Camry</p>
                  <div className="rating">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="currentColor"/>
                  </svg>
                </div>
                <p>"Professional, honest, and reliable. They went above and beyond to ensure I got the best deal possible. The quality of service exceeded my expectations completely."</p>
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  <span>ER</span>
                </div>
                <div className="author-info">
                  <h4>Emily Rodriguez</h4>
                  <p>Purchased: 2023 Nissan Altima</p>
                  <div className="rating">
                    <span>★★★★★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="featured-cars">
        <div className="container">
          <div className="section-header">
            <h2>Featured Cars</h2>
            <p>Discover our handpicked selection of premium vehicles</p>
          </div>
          <div className="cars-container">
            <div className="cars-scroll">
              <div className="car-card">
                <div className="car-image">
                  <img src={heroCarImage} alt="2024 Honda Accord" />
                  <div className="car-badge">Featured</div>
                </div>
                <div className="car-info">
                  <h3>2024 Honda Accord</h3>
                  <p className="car-year">2024 • Sedan • Automatic</p>
                  <div className="car-features">
                    <span>Apple CarPlay</span>
                    <span>Backup Camera</span>
                    <span>Bluetooth</span>
                  </div>
                  <div className="car-price">
                    <span className="price">$28,995</span>
                    <span className="monthly">$459/mo</span>
                  </div>
                  <button className="car-cta">View Details</button>
                </div>
              </div>

              <div className="car-card">
                <div className="car-image">
                  <img src={heroCarImage} alt="2023 Toyota Camry" />
                  <div className="car-badge">Popular</div>
                </div>
                <div className="car-info">
                  <h3>2023 Toyota Camry</h3>
                  <p className="car-year">2023 • Sedan • CVT</p>
                  <div className="car-features">
                    <span>Lane Assist</span>
                    <span>Adaptive Cruise</span>
                    <span>Heated Seats</span>
                  </div>
                  <div className="car-price">
                    <span className="price">$26,500</span>
                    <span className="monthly">$425/mo</span>
                  </div>
                  <button className="car-cta">View Details</button>
                </div>
              </div>

              <div className="car-card">
                <div className="car-image">
                  <img src={heroCarImage} alt="2024 Nissan Altima" />
                  <div className="car-badge">New</div>
                </div>
                <div className="car-info">
                  <h3>2024 Nissan Altima</h3>
                  <p className="car-year">2024 • Sedan • CVT</p>
                  <div className="car-features">
                    <span>ProPILOT</span>
                    <span>Wireless Charging</span>
                    <span>Remote Start</span>
                  </div>
                  <div className="car-price">
                    <span className="price">$27,200</span>
                    <span className="monthly">$439/mo</span>
                  </div>
                  <button className="car-cta">View Details</button>
                </div>
              </div>

              <div className="car-card">
                <div className="car-image">
                  <img src={heroCarImage} alt="2023 Hyundai Elantra" />
                  <div className="car-badge">Best Value</div>
                </div>
                <div className="car-info">
                  <h3>2023 Hyundai Elantra</h3>
                  <p className="car-year">2023 • Sedan • Automatic</p>
                  <div className="car-features">
                    <span>SmartSense</span>
                    <span>Wireless CarPlay</span>
                    <span>LED Headlights</span>
                  </div>
                  <div className="car-price">
                    <span className="price">$24,800</span>
                    <span className="monthly">$399/mo</span>
                  </div>
                  <button className="car-cta">View Details</button>
                </div>
              </div>

              <div className="car-card">
                <div className="car-image">
                  <img src={heroCarImage} alt="2024 Mazda6" />
                  <div className="car-badge">Luxury</div>
                </div>
                <div className="car-info">
                  <h3>2024 Mazda6</h3>
                  <p className="car-year">2024 • Sedan • Automatic</p>
                  <div className="car-features">
                    <span>Premium Audio</span>
                    <span>Leather Interior</span>
                    <span>Sunroof</span>
                  </div>
                  <div className="car-price">
                    <span className="price">$31,500</span>
                    <span className="monthly">$509/mo</span>
                  </div>
                  <button className="car-cta">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage