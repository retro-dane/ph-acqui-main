import React from "react"
import Layout from "../components/Layout"
import "../styles/about.css"
import heroCarImage from "../images/hero-car.png"

const AboutPage = () => {
  const teamMembers = [
   {/* {
      id: 1,
      name: "Michael Rodriguez",
      position: "Founder & CEO",
      bio: "With over 20 years in the automotive industry, Michael built PH Aqui from the ground up with a vision of premium customer service and transparent pricing.",
      expertise: "Business Strategy, Customer Relations"
    },
    */}
  ]

  const values = [
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
        </svg>
      ),
      title: "Quality Assurance",
      description: "Every vehicle undergoes our comprehensive 150-point inspection process to ensure the highest standards."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
          <path d="m2 17 10 5 10-5"/>
          <path d="m2 12 10 5 10-5"/>
        </svg>
      ),
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. We believe in honest, upfront pricing that you can trust."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="m22 21-3-3m1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
        </svg>
      ),
      title: "Customer First",
      description: "Your satisfaction is our priority. We're committed to exceeding expectations at every step."
    },
    {
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
      title: "Trust & Integrity",
      description: "Built on years of honest business practices and a commitment to doing what's right."
    }
  ]

  return (
    <Layout pageTitle="About Us">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="hero-text">
            <div className="hero-badge">Our Story</div>
            <h1>
              Creating a Balance
              <span className="hero-highlight"> for Life</span>
            </h1>
            <p>
              A small business with years of experience importing vehicles of all sizes — delivering quality and honest service you can trust.
            </p>
          </div>
          <div className="hero-image">
            <img src={heroCarImage} alt="Premium vehicles at PH Aqui" className="hero-img" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-card">
              <h2>Our Mission</h2>
              <p>
                As a dedicated small business with years of experience importing vehicles of all sizes,
                our mission is to help you find the perfect vehicle that fits your lifestyle and budget.
                We believe in creating a balance for life — matching quality vehicles with honest service.
              </p>
            </div>
            <div className="mission-card">
              <h2>Our Vision</h2>
              <p>
                To be your trusted partner in vehicle imports, offering personalized service and
                a diverse selection that larger dealers simply can't match. We're committed to
                building lasting relationships, one satisfied customer at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Disabled for now, enable later

      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Expert Team</h2>
            <p>Dedicated professionals committed to your automotive success</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="team-member">
                <div className="team-member-image">
                  <div className="member-avatar">
                    <span>{member.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <div className="team-member-info">
                  <h3>{member.name}</h3>
                  <p className="position">{member.position}</p>
                  <p className="bio">{member.bio}</p>
                  <div className="expertise">
                    <strong>Expertise:</strong> {member.expertise}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Achievements */}
      <section className="achievements">
        <div className="container">
          <div className="section-header">
            <h2>Our Achievements</h2>
            <p>Recognition that reflects our commitment to excellence</p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="m22 21-3-3m1-4a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
                </svg>
              </div>
              <h3>300+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                </svg>
              </div>
              <h3>95%</h3>
              <p>Customer Satisfaction</p>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="m15 14 5-5-5-5"/>
                  <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/>
                </svg>
              </div>
              <h3>20+</h3>
              <p>Years of industry knowledge</p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  )
}

export default AboutPage