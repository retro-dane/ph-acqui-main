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
        {/* Background with subtle gradient */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
        </defs>
        
        <rect width="400" height="250" fill="url(#bgGradient)"/>
        
        {/* Modern Car Silhouette */}
        {/* Main Body - Sharp, angular design */}
        <path
          d="M50 155 L70 140 L90 135 L130 125 L140 120 L260 120 L270 125 L310 135 L330 140 L350 155 L350 185 L50 185 Z"
          fill="url(#carGradient)"
          stroke="#111827"
          strokeWidth="2"
        />
        
        {/* Roof - Sleek coupe-like profile */}
        <path
          d="M90 135 L125 105 L275 105 L310 135"
          fill="url(#roofGradient)"
          stroke="#111827"
          strokeWidth="2"
        />
        
        {/* Windows - Tinted glass effect */}
        <path
          d="M100 135 L130 110 L270 110 L300 135 L280 133 L260 115 L140 115 L120 133 Z"
          fill="#1f2937"
          stroke="#374151"
          strokeWidth="1"
          opacity="0.8"
        />
        
        {/* Window separators */}
        <line x1="180" y1="110" x2="185" y2="135" stroke="#374151" strokeWidth="1.5"/>
        <line x1="220" y1="110" x2="215" y2="135" stroke="#374151" strokeWidth="1.5"/>
        
        {/* Wheels - Performance style */}
        <circle cx="105" cy="185" r="28" fill="#111827" stroke="#000000" strokeWidth="2"/>
        <circle cx="105" cy="185" r="20" fill="#374151" stroke="#1f2937" strokeWidth="1"/>
        <circle cx="105" cy="185" r="12" fill="#6b7280" />
        
        <circle cx="295" cy="185" r="28" fill="#111827" stroke="#000000" strokeWidth="2"/>
        <circle cx="295" cy="185" r="20" fill="#374151" stroke="#1f2937" strokeWidth="1"/>
        <circle cx="295" cy="185" r="12" fill="#6b7280" />
        
        {/* Rim spokes */}
        <g stroke="#9ca3af" strokeWidth="1">
          <line x1="95" y1="185" x2="115" y2="185" />
          <line x1="105" y1="175" x2="105" y2="195" />
          <line x1="98" y1="178" x2="112" y2="192" />
          <line x1="112" y1="178" x2="98" y2="192" />
          
          <line x1="285" y1="185" x2="305" y2="185" />
          <line x1="295" y1="175" x2="295" y2="195" />
          <line x1="288" y1="178" x2="302" y2="192" />
          <line x1="302" y1="178" x2="288" y2="192" />
        </g>
        
        {/* Headlights - Modern LED style */}
        <path
          d="M350 140 L360 145 L360 160 L350 165 Z"
          fill="#f3f4f6"
          stroke="#d1d5db"
          strokeWidth="1"
        />
        <rect x="352" y="147" width="6" height="3" fill="#0ea5e9" rx="1"/>
        <rect x="352" y="152" width="6" height="3" fill="#0ea5e9" rx="1"/>
        <rect x="352" y="157" width="6" height="3" fill="#0ea5e9" rx="1"/>
        
        {/* Grille - Aggressive mesh pattern */}
        <rect x="340" y="140" width="10" height="25" fill="#111827" stroke="#000000" strokeWidth="1"/>
        <g stroke="#374151" strokeWidth="0.5">
          <line x1="342" y1="143" x2="348" y2="143" />
          <line x1="342" y1="147" x2="348" y2="147" />
          <line x1="342" y1="151" x2="348" y2="151" />
          <line x1="342" y1="155" x2="348" y2="155" />
          <line x1="342" y1="159" x2="348" y2="159" />
          <line x1="344" y1="141" x2="344" y2="163" />
          <line x1="346" y1="141" x2="346" y2="163" />
        </g>
        
        {/* Side details */}
        <rect x="200" y="150" width="10" height="2" rx="1" fill="#6b7280"/> {/* Door handle */}
        <line x1="70" y1="165" x2="330" y2="165" stroke="#4b5563" strokeWidth="1"/> {/* Body line */}
        
        {/* Modern text styling */}
        <text
          x="200"
          y="225"
          textAnchor="middle"
          fill="#6b7280"
          fontSize="12"
          fontFamily="Inter, system-ui, -apple-system, sans-serif"
          fontWeight="600"
          letterSpacing="0.5px"
        >
          NO IMAGE AVAILABLE
        </text>
        
        {/* Subtle corner accent */}
        <circle cx="30" cy="30" r="2" fill="#d1d5db" opacity="0.3"/>
        <circle cx="370" cy="30" r="2" fill="#d1d5db" opacity="0.3"/>
        <circle cx="30" cy="220" r="2" fill="#d1d5db" opacity="0.3"/>
        <circle cx="370" cy="220" r="2" fill="#d1d5db" opacity="0.3"/>
      </svg>
    </div>
  )
}

export default CarPlaceholder