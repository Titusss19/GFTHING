export const photoFilters = [
  {
    id: 'normal',
    name: 'Normal',
    cssFilter: 'none',
    canvasFilter: 'none',
    tagline: 'Natural'
  },
  {
    id: 'sunflower',
    name: 'Warm Sunflower',
    cssFilter: 'sepia(0.25) saturate(1.45) brightness(1.08) hue-rotate(-8deg)',
    canvasFilter: 'sepia(0.25) saturate(1.45) brightness(1.08) hue-rotate(-8deg)',
    tagline: 'Golden Hour'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    cssFilter: 'sepia(0.65) contrast(0.92) brightness(0.96)',
    canvasFilter: 'sepia(0.65) contrast(0.92) brightness(0.96)',
    tagline: 'Retro Film'
  },
  {
    id: 'bw',
    name: 'Black & White',
    cssFilter: 'grayscale(1) contrast(1.15) brightness(0.95)',
    canvasFilter: 'grayscale(1) contrast(1.15) brightness(0.95)',
    tagline: 'Monochrome'
  },
  {
    id: 'dreamy',
    name: 'Dreamy',
    cssFilter: 'brightness(1.12) saturate(1.2) contrast(0.92)',
    canvasFilter: 'brightness(1.12) saturate(1.2) contrast(0.92)',
    tagline: 'Soft Glow'
  },
  {
    id: 'rose',
    name: 'Rose',
    cssFilter: 'hue-rotate(325deg) saturate(1.3) brightness(1.05) contrast(0.98)',
    canvasFilter: 'hue-rotate(325deg) saturate(1.3) brightness(1.05) contrast(0.98)',
    tagline: 'Blush'
  }
];

export const photoFrames = [
  { id: 'none', name: 'None', icon: '✨' },
  { id: 'sunflowers', name: 'Sunflower Border', icon: '🌻' },
  { id: 'hearts', name: 'Floating Hearts', icon: '💖' },
  { id: 'sparkles', name: 'Sparkles', icon: '⭐' },
];
