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
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSharkType, setSelectedSharkType] = useState('shark');
  const [selectedSharkId, setSelectedSharkId] = useState(3);

  // Configuración de tipos de tiburones disponibles
  const sharkTypes = {
    shark: {
      name: 'Tiburón Bruce',
      id: 3,
      predictionEndpoint: endpoints.tracking
    },
    whiteShark: {
      name: 'Tiburón Blanco',
      id: 3,
      predictionEndpoint: endpoints.whiteShark
    },
    lemonShark: {
      name: 'Tiburón Limón',
      id: 4,
      predictionEndpoint: endpoints.lemonShark
    }
  };

  // Función para validar que los últimos 5 puntos coincidan
  const validatePredictionData = (tracking, prediction) => {
    if (!tracking || !prediction || !prediction.usedPositions) {
      return false;
    }

    // Obtener los últimos 5 puntos del tracking ordenados cronológicamente
    const sortedTracking = [...tracking].sort((a, b) =>
      new Date(a.trackingDateTime) - new Date(b.trackingDateTime)
    );
    const lastFiveTracking = sortedTracking.slice(-5);

    // Validar que tengamos exactamente 5 puntos en ambos arrays
    if (lastFiveTracking.length !== 5 || prediction.usedPositions.length !== 5) {
      console.warn('Expected 5 points for validation');
      return false;
    }

    // Comparar cada punto (con tolerancia para diferencias de precisión)
    const tolerance = 0.001;
    for (let i = 0; i < 5; i++) {
      const trackingPoint = lastFiveTracking[i];
      const usedPoint = prediction.usedPositions[i];

      const latDiff = Math.abs(trackingPoint.latitude - usedPoint.latitude);
      const lngDiff = Math.abs(trackingPoint.longitude - usedPoint.longitude);

      if (latDiff > tolerance || lngDiff > tolerance) {
        console.warn(`Point ${i} validation failed:`, {
          tracking: { lat: trackingPoint.latitude, lng: trackingPoint.longitude },
          used: { lat: usedPoint.latitude, lng: usedPoint.longitude },
          differences: { lat: latDiff, lng: lngDiff }
        });
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    const fetchSharkData = async () => {
      try {
        setLoading(true);
        setError(null);
        setPredictionData(null);

        const currentShark = sharkTypes[selectedSharkType];
        const sharkId = currentShark.id;

        // Hacer solicitud para el tracking histórico (siempre usa el mismo endpoint)
        const trackingResponse = await fetch(endpoints.tracking.getBySharkId(sharkId));
        if (!trackingResponse.ok) {
          if (trackingResponse.status === 404) {
            throw new Error(`El tiburón con ID ${sharkId} no fue encontrado. Puede que el endpoint no esté disponible.`);
          }
          throw new Error(`Error HTTP en tracking: ${trackingResponse.status} - ${trackingResponse.statusText}`);
        }
        const trackingData = await trackingResponse.json();
        setTrackingData(trackingData);

        // Hacer solicitud para las predicciones (20 iteraciones)
        // Usamos el endpoint de predicción específico para cada tipo de tiburón
        const predictionResponse = await fetch(currentShark.predictionEndpoint.getPrediction(sharkId, 20));
        if (!predictionResponse.ok) {
          if (predictionResponse.status === 404) {
            throw new Error(`Las predicciones para el tiburón ${currentShark.name} con ID ${sharkId} no están disponibles.`);
          }
          throw new Error(`Error HTTP en predicciones: ${predictionResponse.status} - ${predictionResponse.statusText}`);
        }
        const predictionData = await predictionResponse.json();

        // Validar que los datos de predicción sean consistentes
        const isValid = validatePredictionData(trackingData, predictionData);
        if (isValid) {
          setPredictionData(predictionData);
        } else {
          console.error('❌ Prediction validation failed - data inconsistency detected');
        }

      } catch (err) {
        console.error('Error fetching shark data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSharkData();
  }, [selectedSharkType]);

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
        {/* Selector de tipo de tiburón */}
        <div className="mb-4 bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3">🦈 Seleccionar Tiburón</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(sharkTypes).map(([key, shark]) => (
              <button
                key={key}
                onClick={() => setSelectedSharkType(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${selectedSharkType === key
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
              >
                {shark.name} (ID: {shark.id})
              </button>
            ))}
          </div>

          {/* Información del tiburón seleccionado */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Tiburón seleccionado:</span> {sharkTypes[selectedSharkType].name}
            </p>
            <p className="text-sm text-blue-600">
              Mostrando {trackingData.length} puntos de seguimiento
              {predictionData && ` y ${predictionData.predictedPositions?.length || 0} predicciones`}
            </p>
          </div>
        </div>

        {/* Mapa */}
        <div className="h-[calc(100%-200px)]">
          <SharkTrackingMap
            trackingData={trackingData}
            predictionData={predictionData}
          />
        </div>
      </div>
    </div>
  );
}