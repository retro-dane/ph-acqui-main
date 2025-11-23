import React, { useState } from 'react'
import { createUser } from '../utils/authHelper'
import Layout from '../components/Layout'

const SetupPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    // Validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters')
      setIsSubmitting(false)
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      setIsSubmitting(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsSubmitting(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setIsSubmitting(false)
      return
    }

    try {
      await createUser(username, email, password, displayName)
      setSuccess(true)
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setDisplayName('')
    } catch (error) {
      setError(error.message || 'Failed to create user')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout pageTitle="Setup Admin Account">
      <div className="setup-container">
        <div className="setup-card">
          <div className="setup-header">
            <h1>🔧 Create Admin Account</h1>
            <p>Set up your first administrator account</p>
          </div>

          {success ? (
            <div className="success-state">
              <div className="success-icon">✅</div>
              <h2>Account Created Successfully!</h2>
              <p>You can now log in to the admin panel with your credentials.</p>
              <a href="/admin" className="setup-btn">
                Go to Admin Panel
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="setup-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., admin"
                  required
                  disabled={isSubmitting}
                />
                <small>This will be used to log in (lowercase, no spaces)</small>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., admin@example.com"
                  required
                  disabled={isSubmitting}
                />
                <small>Required for password recovery and notifications</small>
              </div>

              <div className="form-group">
                <label htmlFor="displayName">Display Name</label>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g., John Doe"
                  disabled={isSubmitting}
                />
                <small>Optional - How your name will appear in the system</small>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a secure password"
                  required
                  disabled={isSubmitting}
                />
                <small>Minimum 6 characters</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="setup-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Admin Account'}
              </button>
            </form>
          )}

          <div className="setup-info">
            <h3>📝 Important Notes:</h3>
            <ul>
              <li>This is a one-time setup page for creating admin accounts</li>
              <li>Keep your credentials secure</li>
              <li>You can create multiple admin accounts using this page</li>
              <li>Each account will have full administrative access</li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .setup-container {
            min-height: calc(100vh - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
          }

          .setup-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 40px;
            max-width: 550px;
            width: 100%;
          }

          .setup-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .setup-header h1 {
            font-size: 2rem;
            color: #2d3748;
            margin: 0 0 10px 0;
          }

          .setup-header p {
            color: #718096;
            margin: 0;
            font-size: 1.1rem;
          }

          .setup-form {
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

          .setup-btn {
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
            text-align: center;
            display: block;
            text-decoration: none;
          }

          .setup-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
          }

          .setup-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .setup-info {
            background-color: #edf2f7;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }

          .setup-info h3 {
            font-size: 1rem;
            color: #2d3748;
            margin: 0 0 12px 0;
          }

          .setup-info ul {
            margin: 0;
            padding-left: 20px;
          }

          .setup-info li {
            color: #4a5568;
            margin: 8px 0;
            font-size: 0.9rem;
          }

          .success-state {
            text-align: center;
            padding: 40px 20px;
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
            color: #718096;
            font-size: 1.1rem;
            margin: 0 0 30px 0;
          }

          @media (max-width: 768px) {
            .setup-card {
              padding: 30px 20px;
            }

            .setup-header h1 {
              font-size: 1.6rem;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}

export default SetupPage
