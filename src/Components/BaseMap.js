import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicG1hbWFuMjAiLCJhIjoiY2ttYXhma2x2MXRsajJxb2M5cmN0em11cSJ9.Nu4NV4JptOOIdvzu8dGV1w';

const BaseMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-118.2064);
    const [lat, setLat] = useState(34.0222);
    const [zoom, setZoom] = useState(9.5);
   
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('load', () => {
            map.current.addSource('cdph-healthcare-facilities', {
                type: 'geojson',
                data: 'https://pmaman.github.io/Reactuts/src/data/cdph-healthcare-facilities.geojson'
            });
             
            map.current.addLayer({
                'id': 'health-facilities',
                'type': 'circle',
                'source': 'cdph-healthcare-facilities',
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            });
        });


        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
        
    });

  return (
    <div>
        <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default BaseMap;