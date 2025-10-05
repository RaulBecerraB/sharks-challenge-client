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
  `),
  
  // Shark icon for current location (final point)
  SHARK_CURRENT: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 5c-1.5 0-3 1-4 2.5-1.5 1-2.5 2.5-3 4.5-0.5 2 0 4 1 5.5 1 1.5 2.5 2.5 4 3 1 0.3 2 0.3 3 0 1.5-0.5 3-1.5 4-3 1-1.5 1.5-3.5 1-5.5-0.5-2-1.5-3.5-3-4.5-1-1.5-2.5-2.5-4-2.5z" fill="#1976d2" stroke="#ffffff" stroke-width="2"/>
      <path d="M12 11c0.5-0.5 1-1 2-1s1.5 0.5 2 1c0 0.5-0.5 1-1 1s-1-0.5-2-1z" fill="#ffffff"/>
      <circle cx="13" cy="12" r="1" fill="#ffffff"/>
      <path d="M8 15c-1-0.5-2-1-2-2 0-0.5 0.5-1 1-1 1 0 2 1 2 2 0 0.5-0.5 1-1 1z" fill="#1976d2"/>
      <path d="M22 15c1-0.5 2-1 2-2 0-0.5-0.5-1-1-1-1 0-2 1-2 2 0 0.5 0.5 1 1 1z" fill="#1976d2"/>
    </svg>
  `)
};

// Icon configurations
export const ICON_CONFIG = {
  SIZE: [20, 20],
  ANCHOR: [10, 10], // Centrado en el punto
  POPUP_ANCHOR: [0, -10],
  // Configuración específica para el ícono del tiburón (más grande para visibilidad)
  SHARK_SIZE: [60, 60],
  SHARK_ANCHOR: [30, 30],
  SHARK_POPUP_ANCHOR: [0, -30]
};

// Map styling configuration
export const MAP_STYLES = {
  PATH_COLOR: COLORS.PATH,
  PATH_WEIGHT: 3,
  PATH_OPACITY: 0.7,
  PATH_DASH_ARRAY: '5, 10'
};
