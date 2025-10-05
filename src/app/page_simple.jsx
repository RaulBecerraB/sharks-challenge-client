'use client';

import dynamic from 'next/dynamic';

// Importar el componente del mapa de forma dinámica para evitar problemas de SSR
const SharkTrackingMap = dynamic(
    () => import('../components/SharkTrackingMap'),
    {
        ssr: false,
        loading: () => <div className="flex items-center justify-center h-screen">Cargando mapa...</div>
    }
);

// Datos de ejemplo del tracking del tiburón
const sharkTrackingData = [
    {
        "id": 98,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.16615,
        "longitude": 22.24365,
        "trackingDateTime": "2013-08-16T10:57:28"
    },
    {
        "id": 97,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.21241,
        "longitude": 22.2579,
        "trackingDateTime": "2013-08-16T11:44:29"
    },
    {
        "id": 96,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.21432,
        "longitude": 22.25141,
        "trackingDateTime": "2013-08-16T11:45:21"
    },
    {
        "id": 95,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.24022,
        "longitude": 22.2462,
        "trackingDateTime": "2013-08-16T12:33:29"
    },
    {
        "id": 94,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.43018,
        "longitude": 21.60368,
        "trackingDateTime": "2013-08-25T00:26:31"
    },
    {
        "id": 93,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.47644,
        "longitude": 21.5909,
        "trackingDateTime": "2013-08-25T02:24:41"
    },
    {
        "id": 92,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.48439,
        "longitude": 21.42315,
        "trackingDateTime": "2013-08-25T04:02:58"
    },
    {
        "id": 91,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.50537,
        "longitude": 21.36702,
        "trackingDateTime": "2013-08-25T04:55:26"
    },
    {
        "id": 90,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.52007,
        "longitude": 21.33642,
        "trackingDateTime": "2013-08-25T05:43:37"
    },
    {
        "id": 89,
        "sharkId": 3,
        "sharkName": "Bruce",
        "latitude": -34.51975,
        "longitude": 21.29639,
        "trackingDateTime": "2013-08-25T06:06:55"
    }
];

export default function Home() {
    return (
        <div className="h-screen w-screen p-4">
            <div className="h-full w-full">
                <SharkTrackingMap trackingData={sharkTrackingData} />
            </div>
        </div>
    );
}
