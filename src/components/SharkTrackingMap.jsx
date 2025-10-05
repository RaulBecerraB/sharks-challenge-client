'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react';
import { LEAFLET_ASSETS, MAP_ICONS, ICON_CONFIG, MAP_STYLES } from '../assets/icons';

// Fix for default markers in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: LEAFLET_ASSETS.MARKER_ICON_2X,
    iconUrl: LEAFLET_ASSETS.MARKER_ICON,
    shadowUrl: LEAFLET_ASSETS.MARKER_SHADOW,
});

// Crear iconos usando la configuración centralizada
const sharkIcon = new L.Icon({
    iconUrl: MAP_ICONS.SHARK_POINT,
    iconSize: ICON_CONFIG.SIZE,
    iconAnchor: ICON_CONFIG.ANCHOR,
    popupAnchor: ICON_CONFIG.POPUP_ANCHOR,
});

const startIcon = new L.Icon({
    iconUrl: MAP_ICONS.START_POINT,
    iconSize: ICON_CONFIG.SIZE,
    iconAnchor: ICON_CONFIG.ANCHOR,
    popupAnchor: ICON_CONFIG.POPUP_ANCHOR,
});

const endIcon = new L.Icon({
    iconUrl: MAP_ICONS.END_POINT,
    iconSize: ICON_CONFIG.SIZE,
    iconAnchor: ICON_CONFIG.ANCHOR,
    popupAnchor: ICON_CONFIG.POPUP_ANCHOR,
}); const SharkTrackingMap = ({ trackingData = [] }) => {
    const [map, setMap] = useState(null);

    // Ordenar datos por fecha para crear el camino correcto
    const sortedData = [...trackingData].sort((a, b) =>
        new Date(a.trackingDateTime) - new Date(b.trackingDateTime)
    );

    // Crear array de coordenadas para la línea del camino
    const pathCoordinates = sortedData.map(point => [point.latitude, point.longitude]);

    // Calcular el centro del mapa basado en los datos
    const calculateCenter = () => {
        if (sortedData.length === 0) return [-34.4, 21.0]; // Coordenadas por defecto

        const latSum = sortedData.reduce((sum, point) => sum + point.latitude, 0);
        const lngSum = sortedData.reduce((sum, point) => sum + point.longitude, 0);

        return [latSum / sortedData.length, lngSum / sortedData.length];
    };

    // Formatear fecha para mostrar
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Obtener icono según la posición en el tracking
    const getIcon = (index) => {
        if (index === 0) return startIcon;
        if (index === sortedData.length - 1) return endIcon;
        return sharkIcon;
    };

    // Obtener título según la posición
    const getPointTitle = (index) => {
        if (index === 0) return "Punto de Inicio";
        if (index === sortedData.length - 1) return "Punto Final";
        return `Punto ${index + 1}`;
    };

    useEffect(() => {
        if (map && sortedData.length > 0) {
            // Ajustar la vista del mapa para mostrar todos los puntos
            const group = new L.featureGroup(
                sortedData.map(point => L.marker([point.latitude, point.longitude]))
            );
            map.fitBounds(group.getBounds().pad(0.1));
        }
    }, [map, sortedData]);

    if (typeof window === 'undefined') {
        return <div>Cargando mapa...</div>;
    }

    return (
        <div className="w-full h-full">
            <MapContainer
                center={calculateCenter()}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
                ref={setMap}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Línea del camino */}
                {pathCoordinates.length > 1 && (
                    <Polyline
                        positions={pathCoordinates}
                        color={MAP_STYLES.PATH_COLOR}
                        weight={MAP_STYLES.PATH_WEIGHT}
                        opacity={MAP_STYLES.PATH_OPACITY}
                        dashArray={MAP_STYLES.PATH_DASH_ARRAY}
                    />
                )}

                {/* Marcadores para cada punto */}
                {sortedData.map((point, index) => (
                    <Marker
                        key={point.id}
                        position={[point.latitude, point.longitude]}
                        icon={getIcon(index)}
                    >
                        <Popup className="shark-popup">
                            <div className="p-3 min-w-[250px]">
                                <h3 className="font-bold text-lg text-blue-600 mb-2">
                                    {getPointTitle(index)}
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Tiburón:</span>
                                        <span className="text-blue-600 font-bold">{point.sharkName}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">ID:</span>
                                        <span>{point.sharkId}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Punto ID:</span>
                                        <span>{point.id}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Latitud:</span>
                                        <span>{point.latitude.toFixed(5)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Longitud:</span>
                                        <span>{point.longitude.toFixed(5)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Fecha:</span>
                                        <span>{formatDate(point.trackingDateTime)}</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 border-t border-gray-200">
                                    <div className="text-xs text-gray-500">
                                        Posición {index + 1} de {sortedData.length} en el recorrido
                                    </div>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default SharkTrackingMap;
