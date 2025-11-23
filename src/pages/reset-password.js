import React, { useState } from 'react'
import { sendPasswordReset } from '../utils/authHelper'
import Layout from '../components/Layout'

const ResetPasswordPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sentToEmail, setSentToEmail] = useState('')

  const handleRequestReset = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const email = await sendPasswordReset(usernameOrEmail)
      setSentToEmail(email)
      setSuccess(true)
    } catch (error) {
      setError(error.message || 'Failed to send password reset email')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackToLogin = () => {
    window.location.href = '/admin'
  }

  if (success) {
    return (
      <Layout pageTitle="Password Reset">
        <div className="reset-container">
          <div className="reset-card">
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>Password Reset Email Sent</h2>
              <p>A password reset link has been sent to:</p>
              <div className="email-display">{sentToEmail}</div>
              <p className="notice">
                Check your email inbox and spam folder for the password reset link.
                The link will expire in 1 hour.
              </p>
              <button onClick={handleBackToLogin} className="reset-btn">
                Back to Login
              </button>
            </div>
          </div>

          <style jsx>{getStyles()}</style>
        </div>
      </Layout>
    )
  }

  return (
    <Layout pageTitle="Reset Password">
      <div className="reset-container">
        <div className="reset-card">
          <div className="reset-header">
            <h1>🔑 Reset Password</h1>
            <p>Recover access to your account</p>
          </div>

          <form onSubmit={handleRequestReset} className="reset-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                placeholder="Enter your username or email"
                required
                disabled={isSubmitting}
              />
              <small>Enter either your username or email address</small>
            </div>

            <button
              type="submit"
              className="reset-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Reset Email'}
            </button>

            <div className="auth-links">
              <a href="/admin" className="link-btn">
                Back to Login
              </a>
            </div>
          </form>

          <div className="reset-info-box">
            <h3>ℹ️ Password Reset Process</h3>
            <ol>
              <li>Enter your username or email address</li>
              <li>Check your email for a password reset link</li>
              <li>Click the link and set your new password</li>
              <li>Return to the login page and sign in</li>
            </ol>
            <p><small>Reset links expire after 1 hour for security.</small></p>
          </div>
        </div>

        <style jsx>{getStyles()}</style>
      </div>
    </Layout>
  )
}

const getStyles = () => `
  .reset-container {
    min-height: calc(100vh - 200px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .reset-card {
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    padding: 40px;
    max-width: 500px;
    width: 100%;
  }

  .reset-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .reset-header h1 {
    font-size: 2rem;
    color: #2d3748;
    margin: 0 0 10px 0;
  }

  .reset-header p {
    color: #718096;
    margin: 0;
    font-size: 1.1rem;
  }

  .reset-form {
    margin-bottom: 30px;
  }

  .form-group {
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #2d3748;
    font-size: 0.95rem;
  }

  .form-group input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }

  .form-group input:focus {
    outline: none;
    border-color: #667eea;
  }

  .form-group input:disabled {
    background-color: #f7fafc;
    cursor: not-allowed;
  }

  .form-group small {
    display: block;
    margin-top: 6px;
    color: #718096;
    font-size: 0.85rem;
  }

  .error-message {
    background-color: #fed7d7;
    color: #c53030;
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    border: 1px solid #fc8181;
  }

  .reset-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
  }

  .reset-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
  }

  .reset-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .auth-links {
    text-align: center;
    margin-top: 16px;
  }

  .link-btn {
    color: #667eea;
    font-size: 0.9rem;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .link-btn:hover {
    color: #764ba2;
    text-decoration: underline;
  }

  .reset-info-box {
    background-color: #edf2f7;
    padding: 20px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .reset-info-box h3 {
    font-size: 1rem;
    color: #2d3748;
    margin: 0 0 12px 0;
  }

  .reset-info-box ol {
    margin: 0 0 12px 0;
    padding-left: 20px;
  }

  .reset-info-box li {
    color: #4a5568;
    margin: 8px 0;
    font-size: 0.9rem;
  }

  .reset-info-box p {
    color: #718096;
    margin: 0;
    font-size: 0.85rem;
  }

  .success-state {
    text-align: center;
    padding: 20px;
  }

  .success-icon {
    font-size: 4rem;
    margin-bottom: 20px;
  }

  .success-state h2 {
    font-size: 1.8rem;
    color: #2d3748;
    margin: 0 0 15px 0;
  }

  .success-state p {
    color: #4a5568;
    font-size: 1rem;
    margin: 10px 0;
  }

  .email-display {
    background-color: #f7fafc;
    padding: 12px 16px;
    border-radius: 8px;
    font-weight: 600;
    color: #2d3748;
    margin: 16px 0;
    border: 2px solid #e2e8f0;
  }

  .success-state .notice {
    background-color: #fff5e6;
    border: 1px solid #ffd580;
    border-radius: 8px;
    padding: 16px;
    margin: 20px 0;
    text-align: left;
  }

  @media (max-width: 768px) {
    .reset-card {
      padding: 30px 20px;
    }

    .reset-header h1 {
      font-size: 1.6rem;
    }
  }
`

export default ResetPasswordPage
