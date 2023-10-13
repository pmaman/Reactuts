import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoicG1hbWFuMjAiLCJhIjoiY2ttYXhma2x2MXRsajJxb2M5cmN0em11cSJ9.Nu4NV4JptOOIdvzu8dGV1w';

const BaseMap = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(30.1177);
    const [lat, setLat] = useState(11.0462);
    const [zoom, setZoom] = useState(2.61);
   
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

     map.on('load', () => {
        map.addSource('los-angeles-CDHP', {
            type:'geojson',
            data: https://geohub.lacity.org/datasets/lacounty::cdph-healthcare-facilities/explore?location=34.055069%2C-118.247850%2C10.36
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