import React from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"

const ThankYouPage = () => {
  return (
    <Layout pageTitle="Thank You">
      <section style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem"
      }}>
        <div style={{ maxWidth: "600px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
          </div>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "#1a1a2e" }}>
            Thank You!
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#666", marginBottom: "2rem", lineHeight: "1.6" }}>
            Your message has been sent successfully. We'll get back to you within 24 hours.
            If you have any urgent inquiries, please call us at <strong>876 317-5375</strong>.
          </p>
          <Link
            to="/"
            style={{
              display: "inline-block",
              padding: "0.875rem 2rem",
              backgroundColor: "#1a1a2e",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "600",
              transition: "background-color 0.2s"
            }}
          >
            Return to Home
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export default ThankYouPage
