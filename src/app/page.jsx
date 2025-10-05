'use client';

import dynamic from 'next/dynamic';
import sharkTrackingData from '../data/shark-tracking-data.json';

// Importar el componente del mapa de forma dinámica para evitar problemas de SSR
const SharkTrackingMap = dynamic(
  () => import('../components/SharkTrackingMap'),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Cargando mapa...</div>
  }
);

export default function Home() {
  return (
    <div className="h-screen w-screen p-4">
      <div className="h-full w-full">
        <SharkTrackingMap trackingData={sharkTrackingData} />
      </div>
    </div>
  );
}
