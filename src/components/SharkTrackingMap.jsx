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
});

const sharkCurrentIcon = new L.Icon({
    iconUrl: '/tiburon.png',
    iconSize: ICON_CONFIG.SHARK_SIZE,
    iconAnchor: ICON_CONFIG.SHARK_ANCHOR,
    popupAnchor: ICON_CONFIG.SHARK_POPUP_ANCHOR,
    className: 'shark-current-icon',
});

const predictionIcon = new L.Icon({
    iconUrl: MAP_ICONS.SHARK_POINT,
    iconSize: [15, 15],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7],
    className: 'prediction-point',
});

const SharkTrackingMap = ({ trackingData = [], predictionData = null }) => {
    const [map, setMap] = useState(null);

    // HARDCODED DATA FOR BRUCE - WHITE SHARK
    const bruceTrackingData = [
        {
            "id": 1,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.132,
            "longitude": 22.123,
            "trackingDateTime": "2012-03-09T15:35:31",
            "chlorA": 3.9315093
        },
        {
            "id": 2,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.16,
            "longitude": 22.18,
            "trackingDateTime": "2012-03-09T21:30:24",
            "chlorA": 3.9315093
        },
        {
            "id": 3,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.158,
            "longitude": 22.182,
            "trackingDateTime": "2012-03-09T21:42:45",
            "chlorA": 3.9315093
        },
        {
            "id": 4,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.165,
            "longitude": 22.179,
            "trackingDateTime": "2012-03-10T01:53:02",
            "chlorA": 3.9315093
        },
        {
            "id": 5,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.15,
            "longitude": 22.142,
            "trackingDateTime": "2012-03-10T09:57:39",
            "chlorA": 3.9315093
        },
        {
            "id": 6,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.117,
            "longitude": 22.126,
            "trackingDateTime": "2012-03-10T10:07:55",
            "chlorA": 3.9315093
        },
        {
            "id": 7,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.079,
            "longitude": 22.269,
            "trackingDateTime": "2012-03-11T09:57:37",
            "chlorA": 3.9315093
        },
        {
            "id": 8,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.134,
            "longitude": 22.191,
            "trackingDateTime": "2012-03-12T14:52:00",
            "chlorA": 3.9315093
        },
        {
            "id": 9,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.169,
            "longitude": 22.155,
            "trackingDateTime": "2012-03-12T22:43:29",
            "chlorA": 3.9315093
        },
        {
            "id": 10,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.249,
            "longitude": 22.008,
            "trackingDateTime": "2012-03-12T23:54:39",
            "chlorA": 3.9315093
        },
        {
            "id": 11,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.384,
            "longitude": 21.897,
            "trackingDateTime": "2012-03-13T09:17:56",
            "chlorA": 3.9315093
        },
        {
            "id": 12,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.291,
            "longitude": 21.942,
            "trackingDateTime": "2012-03-13T09:36:26",
            "chlorA": 3.9315093
        },
        {
            "id": 13,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.404,
            "longitude": 21.756,
            "trackingDateTime": "2012-03-13T10:28:32",
            "chlorA": 3.9315093
        },
        {
            "id": 14,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.416,
            "longitude": 21.701,
            "trackingDateTime": "2012-03-13T11:05:28",
            "chlorA": 3.9315093
        },
        {
            "id": 15,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.411,
            "longitude": 21.723,
            "trackingDateTime": "2012-03-13T11:10:14",
            "chlorA": 3.9315093
        },
        {
            "id": 16,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.493,
            "longitude": 21.596,
            "trackingDateTime": "2012-03-13T12:42:38",
            "chlorA": 3.9315093
        },
        {
            "id": 17,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.555,
            "longitude": 21.485,
            "trackingDateTime": "2012-03-13T14:18:38",
            "chlorA": 3.9315093
        },
        {
            "id": 18,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.427,
            "longitude": 21.574,
            "trackingDateTime": "2012-03-13T15:47:07",
            "chlorA": 3.9315093
        },
        {
            "id": 19,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.386,
            "longitude": 21.548,
            "trackingDateTime": "2012-03-13T16:24:31",
            "chlorA": 3.9315093
        },
        {
            "id": 20,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.516,
            "longitude": 20.788,
            "trackingDateTime": "2012-03-14T09:01:29",
            "chlorA": 3.9315093
        },
        {
            "id": 21,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.58,
            "longitude": 20.419,
            "trackingDateTime": "2012-03-15T14:20:11",
            "chlorA": 3.9315093
        },
        {
            "id": 22,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.58,
            "longitude": 20.423,
            "trackingDateTime": "2012-03-15T16:36:10",
            "chlorA": 3.9315093
        },
        {
            "id": 23,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.6,
            "longitude": 20.426,
            "trackingDateTime": "2012-03-16T08:56:34",
            "chlorA": 3.9315093
        },
        {
            "id": 24,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.625,
            "longitude": 20.459,
            "trackingDateTime": "2012-03-16T09:30:24",
            "chlorA": 3.9315093
        },
        {
            "id": 25,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.593,
            "longitude": 20.445,
            "trackingDateTime": "2012-03-16T09:50:17",
            "chlorA": 3.9315093
        },
        {
            "id": 26,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.6,
            "longitude": 20.436,
            "trackingDateTime": "2012-03-16T11:17:05",
            "chlorA": 3.9315093
        },
        {
            "id": 27,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.601,
            "longitude": 20.427,
            "trackingDateTime": "2012-03-16T14:10:02",
            "chlorA": 3.9315093
        },
        {
            "id": 28,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.614,
            "longitude": 20.528,
            "trackingDateTime": "2012-03-16T15:46:10",
            "chlorA": 3.9315093
        },
        {
            "id": 29,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.615,
            "longitude": 20.55,
            "trackingDateTime": "2012-03-16T17:32:21",
            "chlorA": 3.9315093
        },
        {
            "id": 30,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.583,
            "longitude": 20.457,
            "trackingDateTime": "2012-03-17T09:26:06",
            "chlorA": 3.9315093
        },
        {
            "id": 31,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.587,
            "longitude": 20.472,
            "trackingDateTime": "2012-03-17T10:21:18",
            "chlorA": 3.9315093
        },
        {
            "id": 32,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.578,
            "longitude": 20.507,
            "trackingDateTime": "2012-03-17T10:51:33",
            "chlorA": 3.9315093
        },
        {
            "id": 33,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.585,
            "longitude": 20.483,
            "trackingDateTime": "2012-03-17T11:04:14",
            "chlorA": 3.9315093
        },
        {
            "id": 34,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.578,
            "longitude": 20.453,
            "trackingDateTime": "2012-03-17T12:34:47",
            "chlorA": 3.9315093
        },
        {
            "id": 35,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.579,
            "longitude": 20.448,
            "trackingDateTime": "2012-03-17T13:39:54",
            "chlorA": 3.9315093
        },
        {
            "id": 36,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.581,
            "longitude": 20.437,
            "trackingDateTime": "2012-03-17T13:58:22",
            "chlorA": 3.9315093
        },
        {
            "id": 37,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.585,
            "longitude": 20.515,
            "trackingDateTime": "2012-03-18T10:13:29",
            "chlorA": 3.9315093
        },
        {
            "id": 38,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.601,
            "longitude": 20.472,
            "trackingDateTime": "2012-03-18T10:34:16",
            "chlorA": 3.9315093
        },
        {
            "id": 39,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.606,
            "longitude": 20.48,
            "trackingDateTime": "2012-03-18T10:41:02",
            "chlorA": 3.9315093
        },
        {
            "id": 40,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.608,
            "longitude": 20.481,
            "trackingDateTime": "2012-03-18T11:53:25",
            "chlorA": 3.9315093
        },
        {
            "id": 41,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.623,
            "longitude": 20.489,
            "trackingDateTime": "2012-03-18T12:07:44",
            "chlorA": 3.9315093
        },
        {
            "id": 42,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.631,
            "longitude": 20.494,
            "trackingDateTime": "2012-03-18T13:30:13",
            "chlorA": 3.9315093
        },
        {
            "id": 43,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.632,
            "longitude": 20.481,
            "trackingDateTime": "2012-03-18T13:49:14",
            "chlorA": 3.9315093
        },
        {
            "id": 44,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.607,
            "longitude": 20.477,
            "trackingDateTime": "2012-03-18T15:10:28",
            "chlorA": 3.9315093
        },
        {
            "id": 45,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.604,
            "longitude": 20.476,
            "trackingDateTime": "2012-03-18T15:26:16",
            "chlorA": 3.9315093
        },
        {
            "id": 46,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.573,
            "longitude": 20.48,
            "trackingDateTime": "2012-03-18T17:08:20",
            "chlorA": 3.9315093
        },
        {
            "id": 47,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.573,
            "longitude": 20.481,
            "trackingDateTime": "2012-03-18T17:09:17",
            "chlorA": 3.9315093
        },
        {
            "id": 48,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.589,
            "longitude": 20.412,
            "trackingDateTime": "2012-03-19T11:55:09",
            "chlorA": 3.9315093
        },
        {
            "id": 49,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.61,
            "longitude": 20.459,
            "trackingDateTime": "2012-03-20T11:28:06",
            "chlorA": 3.9315093
        },
        {
            "id": 50,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.604,
            "longitude": 20.488,
            "trackingDateTime": "2012-03-20T11:33:53",
            "chlorA": 3.9315093
        },
        {
            "id": 51,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.583,
            "longitude": 20.468,
            "trackingDateTime": "2012-03-20T13:08:57",
            "chlorA": 3.9315093
        },
        {
            "id": 52,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.589,
            "longitude": 20.471,
            "trackingDateTime": "2012-03-20T13:09:24",
            "chlorA": 3.9315093
        },
        {
            "id": 53,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.595,
            "longitude": 20.471,
            "trackingDateTime": "2012-03-20T17:57:28",
            "chlorA": 3.9315093
        },
        {
            "id": 54,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.595,
            "longitude": 20.46,
            "trackingDateTime": "2012-03-21T09:35:33",
            "chlorA": 3.9315093
        },
        {
            "id": 55,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.599,
            "longitude": 20.443,
            "trackingDateTime": "2012-03-21T09:36:03",
            "chlorA": 3.9315093
        },
        {
            "id": 56,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.62,
            "longitude": 20.44,
            "trackingDateTime": "2012-03-22T16:25:40",
            "chlorA": 3.9315093
        },
        {
            "id": 57,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.611,
            "longitude": 20.456,
            "trackingDateTime": "2012-03-22T17:11:57",
            "chlorA": 3.9315093
        },
        {
            "id": 58,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.564,
            "longitude": 20.453,
            "trackingDateTime": "2012-03-23T08:50:19",
            "chlorA": 3.9315093
        },
        {
            "id": 59,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.582,
            "longitude": 20.446,
            "trackingDateTime": "2012-03-23T09:07:00",
            "chlorA": 3.9315093
        },
        {
            "id": 60,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.604,
            "longitude": 20.45,
            "trackingDateTime": "2012-03-23T10:23:19",
            "chlorA": 3.9315093
        },
        {
            "id": 61,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.59,
            "longitude": 20.457,
            "trackingDateTime": "2012-03-23T10:50:59",
            "chlorA": 3.9315093
        },
        {
            "id": 62,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.571,
            "longitude": 20.466,
            "trackingDateTime": "2012-03-23T12:07:53",
            "chlorA": 3.9315093
        },
        {
            "id": 63,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.573,
            "longitude": 20.454,
            "trackingDateTime": "2012-03-23T14:20:15",
            "chlorA": 3.9315093
        },
        {
            "id": 64,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.575,
            "longitude": 20.461,
            "trackingDateTime": "2012-03-23T16:01:37",
            "chlorA": 3.9315093
        },
        {
            "id": 65,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.586,
            "longitude": 20.464,
            "trackingDateTime": "2012-03-23T16:16:27",
            "chlorA": 3.9315093
        },
        {
            "id": 66,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.584,
            "longitude": 20.464,
            "trackingDateTime": "2012-03-23T16:49:03",
            "chlorA": 3.9315093
        },
        {
            "id": 67,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.586,
            "longitude": 20.459,
            "trackingDateTime": "2012-03-23T18:22:21",
            "chlorA": 3.9315093
        },
        {
            "id": 68,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.616,
            "longitude": 20.436,
            "trackingDateTime": "2012-03-23T23:22:35",
            "chlorA": 3.9315093
        },
        {
            "id": 69,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.614,
            "longitude": 20.42,
            "trackingDateTime": "2012-03-24T02:47:10",
            "chlorA": 3.9315093
        },
        {
            "id": 70,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.615,
            "longitude": 20.4,
            "trackingDateTime": "2012-03-24T09:04:46",
            "chlorA": 3.9315093
        },
        {
            "id": 71,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.613,
            "longitude": 20.414,
            "trackingDateTime": "2012-03-24T10:01:48",
            "chlorA": 3.9315093
        },
        {
            "id": 72,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.572,
            "longitude": 20.409,
            "trackingDateTime": "2012-03-24T17:47:50",
            "chlorA": 3.9315093
        },
        {
            "id": 73,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.596,
            "longitude": 20.42,
            "trackingDateTime": "2012-03-25T09:35:38",
            "chlorA": 3.9315093
        },
        {
            "id": 74,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.57,
            "longitude": 20.428,
            "trackingDateTime": "2012-03-26T02:40:54",
            "chlorA": 3.9315093
        },
        {
            "id": 75,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.593,
            "longitude": 20.413,
            "trackingDateTime": "2012-03-26T09:13:45",
            "chlorA": 3.9315093
        },
        {
            "id": 76,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.591,
            "longitude": 20.409,
            "trackingDateTime": "2012-03-26T15:26:15",
            "chlorA": 3.9315093
        },
        {
            "id": 77,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.589,
            "longitude": 20.43,
            "trackingDateTime": "2012-03-27T08:50:35",
            "chlorA": 3.9315093
        },
        {
            "id": 78,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.598,
            "longitude": 20.452,
            "trackingDateTime": "2012-03-27T10:06:19",
            "chlorA": 3.9315093
        },
        {
            "id": 79,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.608,
            "longitude": 20.437,
            "trackingDateTime": "2012-03-27T10:30:59",
            "chlorA": 3.9315093
        },
        {
            "id": 80,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.61,
            "longitude": 20.454,
            "trackingDateTime": "2012-03-27T10:48:17",
            "chlorA": 3.9315093
        },
        {
            "id": 81,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.617,
            "longitude": 20.449,
            "trackingDateTime": "2012-03-27T12:22:43",
            "chlorA": 3.9315093
        },
        {
            "id": 82,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.628,
            "longitude": 20.45,
            "trackingDateTime": "2012-03-27T13:32:55",
            "chlorA": 3.9315093
        },
        {
            "id": 83,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.63,
            "longitude": 20.451,
            "trackingDateTime": "2012-03-27T13:53:03",
            "chlorA": 3.9315093
        },
        {
            "id": 84,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.616,
            "longitude": 20.44,
            "trackingDateTime": "2012-03-27T15:14:39",
            "chlorA": 3.9315093
        },
        {
            "id": 85,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.59,
            "longitude": 20.417,
            "trackingDateTime": "2012-03-27T17:15:37",
            "chlorA": 3.9315093
        },
        {
            "id": 86,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.596,
            "longitude": 20.369,
            "trackingDateTime": "2012-03-28T09:55:03",
            "chlorA": 3.9315093
        },
        {
            "id": 87,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.599,
            "longitude": 20.408,
            "trackingDateTime": "2012-03-28T10:08:43",
            "chlorA": 3.9315093
        },
        {
            "id": 88,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.585,
            "longitude": 20.412,
            "trackingDateTime": "2012-03-28T10:25:04",
            "chlorA": 3.9315093
        },
        {
            "id": 89,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.649,
            "longitude": 20.33,
            "trackingDateTime": "2012-03-29T09:58:46",
            "chlorA": 3.9315093
        },
        {
            "id": 90,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.653,
            "longitude": 20.316,
            "trackingDateTime": "2012-03-29T13:19:09",
            "chlorA": 3.9315093
        },
        {
            "id": 91,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.66,
            "longitude": 20.264,
            "trackingDateTime": "2012-03-29T13:22:03",
            "chlorA": 3.9315093
        },
        {
            "id": 92,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.697,
            "longitude": 20.266,
            "trackingDateTime": "2012-03-29T21:22:17",
            "chlorA": 3.9315093
        },
        {
            "id": 93,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.683,
            "longitude": 20.268,
            "trackingDateTime": "2012-03-30T12:57:13",
            "chlorA": 3.9315093
        },
        {
            "id": 94,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.723,
            "longitude": 20.251,
            "trackingDateTime": "2012-03-30T14:47:06",
            "chlorA": 3.9315093
        },
        {
            "id": 95,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.761,
            "longitude": 20.078,
            "trackingDateTime": "2012-04-01T04:43:46",
            "chlorA": 3.9315093
        },
        {
            "id": 96,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.749,
            "longitude": 20.106,
            "trackingDateTime": "2012-04-01T04:53:49",
            "chlorA": 3.9315093
        },
        {
            "id": 97,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.747,
            "longitude": 20.099,
            "trackingDateTime": "2012-04-04T02:29:53",
            "chlorA": 3.9315093
        },
        {
            "id": 98,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.749,
            "longitude": 20.135,
            "trackingDateTime": "2012-04-04T04:09:38",
            "chlorA": 3.9315093
        },
        {
            "id": 99,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.75,
            "longitude": 20.118,
            "trackingDateTime": "2012-04-04T04:17:01",
            "chlorA": 3.9315093
        },
        {
            "id": 100,
            "sharkId": 3,
            "sharkName": "Bruce",
            "latitude": -34.749,
            "longitude": 20.206,
            "trackingDateTime": "2012-04-04T20:54:59",
            "chlorA": 3.9315093
        }
    ];

    const brucePredictionData = {
        "sharkId": 3,
        "sharkName": "Bruce",
        "predictedPositions": [
            {
                "latitude": -34.64950180053711,
                "longitude": 20.279523849487305,
                "chlorA": 3.929511785507202,
                "iteration": 1,
                "predictedFor": "2025-10-05T16:54:20.1425862Z"
            },
            {
                "latitude": -34.63731002807617,
                "longitude": 20.316312789916992,
                "chlorA": 3.929704427719116,
                "iteration": 2,
                "predictedFor": "2025-10-05T17:54:20.2583559Z"
            },
            {
                "latitude": -34.625099182128906,
                "longitude": 20.356956481933594,
                "chlorA": 3.9300620555877686,
                "iteration": 3,
                "predictedFor": "2025-10-05T18:54:20.3711273Z"
            },
            {
                "latitude": -34.61365509033203,
                "longitude": 20.397279739379883,
                "chlorA": 3.9303219318389893,
                "iteration": 4,
                "predictedFor": "2025-10-05T19:54:20.4894995Z"
            },
            {
                "latitude": -34.60254669189453,
                "longitude": 20.437114715576172,
                "chlorA": 3.9305405616760254,
                "iteration": 5,
                "predictedFor": "2025-10-05T20:54:20.5902946Z"
            },
            {
                "latitude": -34.59162521362305,
                "longitude": 20.4764404296875,
                "chlorA": 3.9307281970977783,
                "iteration": 6,
                "predictedFor": "2025-10-05T21:54:20.6897893Z"
            },
            {
                "latitude": -34.581607818603516,
                "longitude": 20.513948440551758,
                "chlorA": 3.9308021068573,
                "iteration": 7,
                "predictedFor": "2025-10-05T22:54:20.7887102Z"
            },
            {
                "latitude": -34.57200241088867,
                "longitude": 20.55019187927246,
                "chlorA": 3.930877447128296,
                "iteration": 8,
                "predictedFor": "2025-10-05T23:54:20.9052837Z"
            },
            {
                "latitude": -34.56279373168945,
                "longitude": 20.585031509399414,
                "chlorA": 3.930959701538086,
                "iteration": 9,
                "predictedFor": "2025-10-06T00:54:21.019408Z"
            },
            {
                "latitude": -34.5540657043457,
                "longitude": 20.618465423583984,
                "chlorA": 3.931021213531494,
                "iteration": 10,
                "predictedFor": "2025-10-06T01:54:21.1906738Z"
            },
            {
                "latitude": -34.545684814453125,
                "longitude": 20.650625228881836,
                "chlorA": 3.9310741424560547,
                "iteration": 11,
                "predictedFor": "2025-10-06T02:54:21.3250703Z"
            },
            {
                "latitude": -34.53765869140625,
                "longitude": 20.681623458862305,
                "chlorA": 3.9311342239379883,
                "iteration": 12,
                "predictedFor": "2025-10-06T03:54:21.4389552Z"
            },
            {
                "latitude": -34.529964447021484,
                "longitude": 20.71147346496582,
                "chlorA": 3.9311866760253906,
                "iteration": 13,
                "predictedFor": "2025-10-06T04:54:21.5441226Z"
            },
            {
                "latitude": -34.52254104614258,
                "longitude": 20.740253448486328,
                "chlorA": 3.931232452392578,
                "iteration": 14,
                "predictedFor": "2025-10-06T05:54:21.6345944Z"
            },
            {
                "latitude": -34.5153694152832,
                "longitude": 20.768047332763672,
                "chlorA": 3.931272506713867,
                "iteration": 15,
                "predictedFor": "2025-10-06T06:54:21.7216595Z"
            },
            {
                "latitude": -34.50845718383789,
                "longitude": 20.79486083984375,
                "chlorA": 3.9313039779663086,
                "iteration": 16,
                "predictedFor": "2025-10-06T07:54:21.8090955Z"
            }
        ],
        "usedPositions": [
            {
                "latitude": -34.749,
                "longitude": 20.106,
                "chlor_A": 3.9315093
            },
            {
                "latitude": -34.747,
                "longitude": 20.099,
                "chlor_A": 3.9315093
            },
            {
                "latitude": -34.749,
                "longitude": 20.135,
                "chlor_A": 3.9315093
            },
            {
                "latitude": -34.75,
                "longitude": 20.118,
                "chlor_A": 3.9315093
            },
            {
                "latitude": -34.749,
                "longitude": 20.206,
                "chlor_A": 3.9315093
            }
        ]
    };

    // Use hardcoded data
    const actualTrackingData = bruceTrackingData;
    const actualPredictionData = brucePredictionData;

    // Ordenar datos por fecha para crear el camino correcto
    const sortedData = [...actualTrackingData].sort((a, b) =>
        new Date(a.trackingDateTime) - new Date(b.trackingDateTime)
    );

    // Crear array de coordenadas para la línea del camino histórico
    const pathCoordinates = sortedData.map(point => [
        Number(point.latitude),
        Number(point.longitude)
    ]);

    // PASO 3: Coordenadas para el mapa
    console.log('� PASO 3 - Coordenadas finales para renderizado:', {
        pathCoordinatesCount: pathCoordinates.length,
        firstFiveCoords: pathCoordinates.slice(0, 5).map((coord, i) => ({
            index: i,
            lat: coord[0],
            lng: coord[1],
            originalId: sortedData[i]?.id,
            originalDate: sortedData[i]?.trackingDateTime
        })),
        lastFiveCoords: pathCoordinates.slice(-5).map((coord, i) => ({
            index: pathCoordinates.length - 5 + i,
            lat: coord[0],
            lng: coord[1],
            originalId: sortedData[sortedData.length - 5 + i]?.id,
            originalDate: sortedData[sortedData.length - 5 + i]?.trackingDateTime
        }))
    });

    // Crear array de coordenadas para las predicciones si existen
    const predictionCoordinates = actualPredictionData?.predictedPositions?.map(point =>
        [Number(point.latitude), Number(point.longitude)]
    ) || [];

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
        const point = sortedData[index];

        if (index === 0) return startIcon; // Primer punto cronológico = inicio
        if (index === sortedData.length - 1) {
            return sharkCurrentIcon; // Último punto = ubicación actual del tiburón
        }
        return sharkIcon;
    };

    // Obtener título según la posición
    const getPointTitle = (index) => {
        if (index === 0) return "Punto de Inicio";
        if (index === sortedData.length - 1) return "Ubicación Actual";
        return `Punto ${index + 1}`;
    };

    useEffect(() => {
        if (map && sortedData.length > 0) {
            // Ajustar la vista del mapa para mostrar todos los puntos
            const group = new L.featureGroup(
                sortedData.map(point => L.marker([Number(point.latitude), Number(point.longitude)]))
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
                {sortedData.map((point, index) => {
                    return (
                        <Marker
                            key={point.id}
                            position={[Number(point.latitude), Number(point.longitude)]}
                            icon={getIcon(index)}
                            zIndexOffset={index === sortedData.length - 1 ? 10000 : 0}
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
                    );
                })}

                {/* Línea de predicciones */}
                {predictionCoordinates.length > 0 && pathCoordinates.length > 0 && (
                    <Polyline
                        positions={[...pathCoordinates.slice(-1), ...predictionCoordinates]}
                        color="#ff6b35"
                        weight={3}
                        opacity={0.8}
                        dashArray="10, 5"
                    />
                )}

                {/* Marcadores para predicciones */}
                {actualPredictionData?.predictedPositions?.map((prediction, index) => (
                    <Marker
                        key={`prediction-${index}`}
                        position={[Number(prediction.latitude), Number(prediction.longitude)]}
                        icon={predictionIcon}
                        zIndexOffset={5000}
                    >
                        <Popup className="shark-popup">
                            <div className="p-3 min-w-[250px]">
                                <h3 className="font-bold text-lg text-orange-600 mb-2">
                                    Predicción #{prediction.iteration}
                                </h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="font-medium">Tiburón:</span>
                                        <span className="text-orange-600 font-bold">{actualPredictionData.sharkName}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Latitud:</span>
                                        <span>{prediction.latitude.toFixed(5)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Longitud:</span>
                                        <span>{prediction.longitude.toFixed(5)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Cloro A:</span>
                                        <span>{prediction.chlorA.toFixed(4)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="font-medium">Predicho para:</span>
                                        <span>{formatDate(prediction.predictedFor)}</span>
                                    </div>
                                </div>

                                <div className="mt-3 pt-2 border-t border-orange-200">
                                    <div className="text-xs text-orange-500">
                                        Predicción basada en IA - Iteración {prediction.iteration} de {actualPredictionData.predictedPositions.length}
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
