import React from 'react';
import { motion } from 'framer-motion';

/**
 * Aesthetic Rose flower SVG
 */
export function RoseFlower({ size = 120, className = '' }) {
  return (
    <div style={{ width: size, height: size }} className={`inline-block select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="drop-shadow-md overflow-visible">
        <defs>
          <radialGradient id="roseCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#880E4F" />
            <stop offset="60%" stopColor="#C2185B" />
            <stop offset="100%" stopColor="#E91E63" />
          </radialGradient>
          <linearGradient id="rosePetalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF80AB" />
            <stop offset="60%" stopColor="#F06292" />
            <stop offset="100%" stopColor="#E91E63" />
          </linearGradient>
          <linearGradient id="rosePetalGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF4081" />
            <stop offset="100%" stopColor="#C2185B" />
          </linearGradient>
          <linearGradient id="roseLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A8D5BA" />
            <stop offset="100%" stopColor="#5B8C6C" />
          </linearGradient>
        </defs>

        {/* Leaves */}
        <path d="M 60 140 C 30 160 40 185 70 170 C 90 160 80 145 60 140 Z" fill="url(#roseLeafGrad)" opacity="0.9" />
        <path d="M 140 140 C 170 160 160 185 130 170 C 110 160 120 145 140 140 Z" fill="url(#roseLeafGrad)" opacity="0.9" />

        {/* Outer petals */}
        <g transform="translate(100, 100)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={`outer-${i}`}
              d="M 0 -20 C -45 -50 -55 -85 0 -85 C 55 -85 45 -50 0 -20 Z"
              fill="url(#rosePetalGrad1)"
              transform={`rotate(${angle})`}
              opacity="0.95"
            />
          ))}
        </g>

        {/* Mid petals */}
        <g transform="translate(100, 100)">
          {[30, 90, 150, 210, 270, 330].map((angle, i) => (
            <path
              key={`mid-${i}`}
              d="M 0 -15 C -35 -40 -40 -70 0 -70 C 40 -70 35 -40 0 -15 Z"
              fill="url(#rosePetalGrad2)"
              transform={`rotate(${angle})`}
              opacity="0.9"
            />
          ))}
        </g>

        {/* Inner spiral petals */}
        <g transform="translate(100, 100)">
          {[15, 75, 135, 195, 255, 315].map((angle, i) => (
            <path
              key={`inner-${i}`}
              d="M 0 -10 C -22 -25 -25 -50 0 -50 C 25 -50 22 -25 0 -10 Z"
              fill="#FF4081"
              transform={`rotate(${angle})`}
              opacity="0.85"
            />
          ))}
        </g>

        {/* Center swirl */}
        <circle cx="100" cy="100" r="22" fill="url(#roseCenter)" />
        <path d="M 92 95 Q 100 88 108 95 Q 112 105 102 108 Q 94 105 98 99" fill="none" stroke="#FF80AB" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      </svg>
    </div>
  );
}

/**
 * Cherry Blossom (Sakura) SVG
 */
export function CherryBlossom({ size = 120, className = '' }) {
  return (
    <div style={{ width: size, height: size }} className={`inline-block select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="sakuraPetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFE4EC" />
            <stop offset="80%" stopColor="#FF9BBB" />
            <stop offset="100%" stopColor="#F06292" />
          </linearGradient>
          <radialGradient id="sakuraCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C2185B" />
            <stop offset="60%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#FF80AB" />
          </radialGradient>
        </defs>

        {/* 5 Petals with notched tips */}
        <g transform="translate(100, 100)">
          {[0, 72, 144, 216, 288].map((angle, i) => (
            <path
              key={`petal-${i}`}
              d="M 0 0 C -28 -30 -38 -65 -12 -80 C -6 -76 -2 -72 0 -70 C 2 -72 6 -76 12 -80 C 38 -65 28 -30 0 0 Z"
              fill="url(#sakuraPetal)"
              transform={`rotate(${angle})`}
              opacity="0.96"
            />
          ))}
        </g>

        {/* Center pistil */}
        <circle cx="100" cy="100" r="14" fill="url(#sakuraCenter)" />

        {/* Stamens */}
        <g stroke="#C2185B" strokeWidth="1.2">
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x2 = 100 + Math.cos(rad) * 26;
            const y2 = 100 + Math.sin(rad) * 26;
            return (
              <g key={`stamen-${i}`}>
                <line x1="100" y1="100" x2={x2} y2={y2} />
                <circle cx={x2} cy={y2} r="2" fill="#FFD54F" />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

/**
 * Pink Daisy / Gerbera SVG
 */
export function PinkDaisy({ size = 120, className = '' }) {
  const petals = 20;
  return (
    <div style={{ width: size, height: size }} className={`inline-block select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="daisyPetal" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFCCD5" />
            <stop offset="100%" stopColor="#FF758F" />
          </linearGradient>
          <radialGradient id="daisyCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5D2E46" />
            <stop offset="50%" stopColor="#8E4E6E" />
            <stop offset="85%" stopColor="#FFB3C6" />
            <stop offset="100%" stopColor="#FF758F" />
          </radialGradient>
        </defs>

        <g transform="translate(100, 100)">
          {Array.from({ length: petals }).map((_, i) => {
            const angle = (360 / petals) * i;
            return (
              <path
                key={`p-${i}`}
                d="M 0 -12 C -8 -40 -7 -75 0 -85 C 7 -75 8 -40 0 -12 Z"
                fill="url(#daisyPetal)"
                transform={`rotate(${angle})`}
                opacity="0.95"
              />
            );
          })}
        </g>

        <circle cx="100" cy="100" r="28" fill="url(#daisyCenter)" />
        <circle cx="100" cy="100" r="18" fill="#4A1E35" opacity="0.6" />
      </svg>
    </div>
  );
}

/**
 * Tulip SVG
 */
export function Tulip({ size = 120, className = '' }) {
  return (
    <div style={{ width: size, height: size }} className={`inline-block select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="drop-shadow-md overflow-visible">
        <defs>
          <linearGradient id="tulipPetalL" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF85A2" />
            <stop offset="100%" stopColor="#E01E5A" />
          </linearGradient>
          <linearGradient id="tulipPetalR" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA6C1" />
            <stop offset="100%" stopColor="#C9184A" />
          </linearGradient>
          <linearGradient id="tulipCenter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFB3C6" />
            <stop offset="100%" stopColor="#800F2F" />
          </linearGradient>
        </defs>

        {/* Stem */}
        <path d="M 100 130 Q 98 170 102 195" stroke="#7BAE7F" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M 100 160 Q 125 150 135 130 Q 115 145 100 160" fill="#7BAE7F" />

        {/* Center petal back */}
        <path d="M 100 50 C 85 70 85 110 100 130 C 115 110 115 70 100 50 Z" fill="url(#tulipCenter)" />

        {/* Left petal */}
        <path d="M 100 130 C 60 110 50 65 78 55 C 92 65 98 95 100 130 Z" fill="url(#tulipPetalL)" opacity="0.95" />

        {/* Right petal */}
        <path d="M 100 130 C 140 110 150 65 122 55 C 108 65 102 95 100 130 Z" fill="url(#tulipPetalR)" opacity="0.95" />
      </svg>
    </div>
  );
}

/**
 * Aesthetic Sunflower (with warm pink-toned center)
 */
export function Sunflower({ size = 120, className = '' }) {
  const petalsCount = 18;
  const innerPetalsCount = 14;

  return (
    <div style={{ width: size, height: size }} className={`inline-block select-none pointer-events-none ${className}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="drop-shadow-md overflow-visible">
        <defs>
          <radialGradient id="sunCenter" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3D1C2E" />
            <stop offset="50%" stopColor="#5D2E46" />
            <stop offset="85%" stopColor="#8E4E6E" />
            <stop offset="100%" stopColor="#C2185B" />
          </radialGradient>
          <linearGradient id="sunPetalOut" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE066" />
            <stop offset="50%" stopColor="#F9C22E" />
            <stop offset="100%" stopColor="#E5A00D" />
          </linearGradient>
          <linearGradient id="sunPetalIn" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF099" />
            <stop offset="50%" stopColor="#FBC835" />
            <stop offset="100%" stopColor="#DE9507" />
          </linearGradient>
        </defs>

        <g transform="translate(100, 100)">
          {Array.from({ length: petalsCount }).map((_, i) => (
            <path
              key={`outer-${i}`}
              d="M 0 -18 C -14 -45 -11 -78 0 -92 C 11 -78 14 -45 0 -18 Z"
              fill="url(#sunPetalOut)"
              transform={`rotate(${(360 / petalsCount) * i})`}
              opacity="0.96"
            />
          ))}
        </g>

        <g transform="translate(100, 100)">
          {Array.from({ length: innerPetalsCount }).map((_, i) => (
            <path
              key={`inner-${i}`}
              d="M 0 -14 C -11 -38 -9 -68 0 -80 C 9 -68 11 -38 0 -14 Z"
              fill="url(#sunPetalIn)"
              transform={`rotate(${(360 / innerPetalsCount) * i + 10}) scale(0.92)`}
              opacity="0.92"
            />
          ))}
        </g>

        <circle cx="100" cy="100" r="34" fill="url(#sunCenter)" />
        <circle cx="100" cy="100" r="24" fill="#3D1C2E" opacity="0.4" />
      </svg>
    </div>
  );
}

/**
 * Universal Flower renderer by type
 */
export default function Flower({ type = 'sunflower', size = 120, className = '', sway = false, rotation = 0, delay = 0 }) {
  const swayAnimation = sway ? {
    rotate: [rotation - 4, rotation + 4, rotation - 4],
    transition: {
      duration: 4 + (rotation % 3),
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }
  } : {};

  const renderFlower = () => {
    switch (type) {
      case 'rose':
        return <RoseFlower size={size} />;
      case 'cherry':
        return <CherryBlossom size={size} />;
      case 'daisy':
        return <PinkDaisy size={size} />;
      case 'tulip':
        return <Tulip size={size} />;
      case 'sunflower':
      default:
        return <Sunflower size={size} />;
    }
  };

  return (
    <motion.div
      className={`inline-block select-none pointer-events-none ${className}`}
      animate={sway ? swayAnimation : { rotate: rotation }}
      initial={{ rotate: rotation }}
    >
      {renderFlower()}
    </motion.div>
  );
}
