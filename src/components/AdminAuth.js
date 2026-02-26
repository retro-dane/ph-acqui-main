import React, { useState, useEffect } from 'react'
import { signInWithUsername, signOutUser, onAuthStateChange } from '../utils/authHelper'

const AdminAuth = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((userData) => {
      setUser(userData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await signInWithUsername(username, password)
      // onAuthStateChange will update the user state
      setUsername('')
      setPassword('')
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOutUser()
      setUser(null)
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show admin content if authenticated
  if (user) {
    return <>{children}</>
  }

  // Show login form
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🔐 PH Aqui Admin Access</h1>
          <p>Sign in with your username and password</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username or Email</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username or email"
              required
              autoComplete="username"
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="auth-links">
            <a href="/reset-password" className="link-btn">
              Forgot Password?
            </a>
          </div>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <a href="/setup" className="signup-btn">
          Create New Account
        </a>

        <div className="auth-info">
          <h3>ℹ️ First Time Here?</h3>
          <p>Click "Create New Account" if you have an invite code from your administrator.</p>
        </div>
      </div>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
        }

        .auth-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 450px;
          width: 100%;
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-header h1 {
          font-size: 1.8rem;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .auth-header p {
          color: #718096;
          margin: 0;
          font-size: 1rem;
        }

        .auth-form {
          margin-bottom: 30px;
        }

        .form-group {
          margin-bottom: 20px;
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

        .error-message {
          background-color: #fed7d7;
          color: #c53030;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          font-size: 0.9rem;
          border: 1px solid #fc8181;
        }

        .auth-btn {
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

        .auth-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
        }

        .auth-btn:disabled {
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
        }

        .link-btn:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        .auth-divider {
          text-align: center;
          margin: 24px 0;
          position: relative;
        }

        .auth-divider::before,
        .auth-divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background-color: #e2e8f0;
        }

        .auth-divider::before {
          left: 0;
        }

        .auth-divider::after {
          right: 0;
        }

        .auth-divider span {
          background-color: white;
          padding: 0 12px;
          color: #a0aec0;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .signup-btn {
          display: block;
          width: 100%;
          padding: 14px;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          text-decoration: none;
          margin-bottom: 24px;
        }

        .signup-btn:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
        }

        .auth-info {
          background-color: #edf2f7;
          padding: 20px;
          border-radius: 8px;
          border-left: 4px solid #667eea;
        }

        .auth-info h3 {
          font-size: 1rem;
          color: #2d3748;
          margin: 0 0 10px 0;
        }

        .auth-info p {
          color: #4a5568;
          margin: 5px 0;
          font-size: 0.9rem;
        }

        .auth-info small {
          color: #718096;
        }

        .loading-state {
          text-align: center;
          padding: 40px 20px;
        }

        .loading-spinner {
          border: 4px solid #e2e8f0;
          border-top: 4px solid #667eea;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-state p {
          color: #4a5568;
          font-size: 1rem;
        }
      `}</style>
    </div>
  )
}

export default AdminAuth
