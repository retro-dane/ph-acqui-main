import React from 'react'

const CarPlaceholder = ({ className = '', alt = 'Vehicle placeholder' }) => {
  return (
    <div className={`car-placeholder ${className}`}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="400" height="250" fill="#f8f9fa"/>
        
        {/* Car Body */}
        <path
          d="M60 150 L80 130 L120 130 L140 120 L260 120 L280 130 L320 130 L340 150 L340 180 L60 180 Z"
          fill="#667eea"
          stroke="#4c63d2"
          strokeWidth="2"
        />
        
        {/* Car Roof */}
        <path
          d="M100 130 L120 110 L280 110 L300 130"
          fill="#5a67d8"
          stroke="#4c63d2"
          strokeWidth="2"
        />
        
        {/* Windows */}
        <path
          d="M110 130 L125 115 L275 115 L290 130 L110 130"
          fill="#e2e8f0"
          stroke="#cbd5e0"
          strokeWidth="1"
        />
        
        {/* Front Window */}
        <line x1="170" y1="115" x2="170" y2="130" stroke="#cbd5e0" strokeWidth="1"/>
        <line x1="230" y1="115" x2="230" y2="130" stroke="#cbd5e0" strokeWidth="1"/>
        
        {/* Wheels */}
        <circle cx="110" cy="180" r="25" fill="#2d3748" stroke="#1a202c" strokeWidth="2"/>
        <circle cx="110" cy="180" r="15" fill="#4a5568" stroke="#2d3748" strokeWidth="1"/>
        <circle cx="290" cy="180" r="25" fill="#2d3748" stroke="#1a202c" strokeWidth="2"/>
        <circle cx="290" cy="180" r="15" fill="#4a5568" stroke="#2d3748" strokeWidth="1"/>
        
        {/* Headlights */}
        <ellipse cx="340" cy="140" rx="8" ry="12" fill="#ffd700" stroke="#f6d55c" strokeWidth="1"/>
        
        {/* Grille */}
        <rect x="330" y="135" width="10" height="15" fill="#2d3748" stroke="#1a202c" strokeWidth="1"/>
        <line x1="332" y1="138" x2="338" y2="138" stroke="#4a5568" strokeWidth="1"/>
        <line x1="332" y1="142" x2="338" y2="142" stroke="#4a5568" strokeWidth="1"/>
        <line x1="332" y1="146" x2="338" y2="146" stroke="#4a5568" strokeWidth="1"/>
        
        {/* Door Handle */}
        <rect x="200" y="145" width="8" height="3" rx="1" fill="#4a5568"/>
        
        {/* No Image Text */}
        <text
          x="200"
          y="220"
          textAnchor="middle"
          fill="#6b7280"
          fontSize="14"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="500"
        >
          No Image Available
        </text>
      </svg>
    </div>
  )
}

export default CarPlaceholder