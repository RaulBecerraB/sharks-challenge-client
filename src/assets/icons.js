// Centralized assets and icons configuration

export const LEAFLET_ASSETS = {
  // Leaflet default marker assets from CDN
  MARKER_ICON: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  MARKER_ICON_2X: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  MARKER_SHADOW: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
};

// Color theme configuration
export const COLORS = {
  PRIMARY: '#1976d2',
  SUCCESS: '#4caf50', 
  ERROR: '#f44336',
  PATH: '#3b82f6'
};

// SVG icons as base64 encoded data URLs
export const MAP_ICONS = {
  // Shark tracking point icon (blue circle)
  SHARK_POINT: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="6" fill="${COLORS.PRIMARY}" stroke="#ffffff" stroke-width="1"/>
    </svg>
  `),
  
  // Start point icon (green circle)
  START_POINT: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="6" fill="${COLORS.SUCCESS}" stroke="#ffffff" stroke-width="1"/>
    </svg>
  `),
  
  // End point icon (red circle)
  END_POINT: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="6" fill="${COLORS.ERROR}" stroke="#ffffff" stroke-width="1"/>
    </svg>
  `)
};

// Icon configurations
export const ICON_CONFIG = {
  SIZE: [20, 20],
  ANCHOR: [10, 10], // Centrado en el punto
  POPUP_ANCHOR: [0, -10]
};

// Map styling configuration
export const MAP_STYLES = {
  PATH_COLOR: COLORS.PATH,
  PATH_WEIGHT: 3,
  PATH_OPACITY: 0.7,
  PATH_DASH_ARRAY: '5, 10'
};
