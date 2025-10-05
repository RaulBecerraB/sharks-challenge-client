'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import endpoints from '../services/ApiConfig';

// Importar el componente del mapa de forma dinámica para evitar problemas de SSR
const SharkTrackingMap = dynamic(
  () => import('../components/SharkTrackingMap'),
  {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-screen">Cargando mapa...</div>
  }
);

export default function Home() {
  const [trackingData, setTrackingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSharkTracking = async () => {
      try {
        setLoading(true);
        // Hacer solicitud para el tiburón con ID 3 (Bruce)
        const response = await fetch(endpoints.tracking.getBySharkId(3));

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        setTrackingData(data);
      } catch (err) {
        console.error('Error fetching shark tracking data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharkTracking();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Cargando datos del tiburón...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-bold">Error al cargar los datos</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen p-4">
      <div className="h-full w-full">
        <SharkTrackingMap trackingData={trackingData} />
      </div>
    </div>
  );
}
