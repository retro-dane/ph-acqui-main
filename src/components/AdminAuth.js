import React, { useState, useEffect } from 'react'

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showReset, setShowReset] = useState(false)
  const [resetCode, setResetCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Default password (can be changed via reset)
  const DEFAULT_PASSWORD = 'phaqui2024'
  
  useEffect(() => {
    // Check if user is already authenticated in this session
    const authStatus = sessionStorage.getItem('phaqui_admin_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    
    // Get current password from localStorage (or use default)
    const currentPassword = localStorage.getItem('phaqui_admin_password') || DEFAULT_PASSWORD
    
    if (password === currentPassword) {
      setIsAuthenticated(true)
      sessionStorage.setItem('phaqui_admin_auth', 'true')
      setPassword('')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('phaqui_admin_auth')
  }

  const generateResetCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase()
    sessionStorage.setItem('phaqui_reset_code', code)
    sessionStorage.setItem('phaqui_reset_timestamp', Date.now().toString())
    return code
  }

  const handlePasswordReset = (e) => {
    e.preventDefault()
    setError('')
    
    if (!resetCode) {
      setError('Please enter the reset code.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    const storedCode = sessionStorage.getItem('phaqui_reset_code')
    const timestamp = sessionStorage.getItem('phaqui_reset_timestamp')
    
    // Check if code is valid and not expired (15 minutes)
    if (!storedCode || !timestamp) {
      setError('Reset code not found. Please generate a new one.')
      return
    }

    const codeAge = Date.now() - parseInt(timestamp)
    if (codeAge > 15 * 60 * 1000) { // 15 minutes
      setError('Reset code has expired. Please generate a new one.')
      sessionStorage.removeItem('phaqui_reset_code')
      sessionStorage.removeItem('phaqui_reset_timestamp')
      return
    }

    if (resetCode.toUpperCase() !== storedCode) {
      setError('Invalid reset code.')
      return
    }

    // Update password
    localStorage.setItem('phaqui_admin_password', newPassword)
    
    // Clear reset data
    sessionStorage.removeItem('phaqui_reset_code')
    sessionStorage.removeItem('phaqui_reset_timestamp')
    
    // Clear form
    setResetCode('')
    setNewPassword('')
    setConfirmPassword('')
    setShowReset(false)
    
    alert('Password updated successfully! Please log in with your new password.')
  }

  const handleGenerateResetCode = () => {
    const code = generateResetCode()
    alert(`Your reset code is: ${code}\n\nThis code will expire in 15 minutes.\n\nNote: In a production environment, this would be sent via email.`)
  }

  if (isAuthenticated) {
    return (
      <div>
        <div style={{ 
          position: 'fixed', 
          top: '10px', 
          right: '10px', 
          zIndex: 1000,
          background: '#f8f9fa',
          padding: '10px 15px',
          borderRadius: '6px',
          border: '1px solid #dee2e6'
        }}>
          <span style={{ marginRight: '10px', fontSize: '14px', color: '#6c757d' }}>
            Admin Mode
          </span>
          <button 
            onClick={handleLogout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>🔐 PH Aqui Admin Access</h1>
          <p>Please enter your password to access the admin dashboard</p>
        </div>

        {!showReset ? (
          <form onSubmit={handleLogin} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>

            <button type="submit" className="auth-btn">
              Login to Admin
            </button>

            <div className="auth-links">
              <button 
                type="button" 
                onClick={() => setShowReset(true)}
                className="link-btn"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset} className="auth-form">
            <div className="reset-header">
              <h2>Reset Password</h2>
              <p>Generate a reset code and set a new password</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Step 1: Generate Reset Code</label>
              <button 
                type="button" 
                onClick={handleGenerateResetCode}
                className="reset-btn"
              >
                Generate Reset Code
              </button>
              <small>A code will be displayed in an alert (normally sent via email)</small>
            </div>

            <div className="form-group">
              <label htmlFor="resetCode">Step 2: Enter Reset Code</label>
              <input
                type="text"
                id="resetCode"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Enter 6-character reset code"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">Step 3: New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="auth-btn">
                Update Password
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowReset(false)
                  setError('')
                  setResetCode('')
                  setNewPassword('')
                  setConfirmPassword('')
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="auth-info">
          <h3>ℹ️ Default Login</h3>
          <p><strong>Password:</strong> phaqui2024</p>
          <p><small>Change this password after first login for security</small></p>
        </div>
      </div>
    </div>
  )
}

export default AdminAuth