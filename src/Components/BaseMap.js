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
            map.current.addSource('Liquefaction_zones', {
                type: 'geojson',
                data: 'https://pmaman.github.io/Reactuts/src/data/Liquefaction_zones.geojson'
            });

            map.current.addLayer({
                'id': 'liquefaction-zones-fill',
                type: 'fill', 
                source: 'Liquefaction_zones',
                'paint':{
                    'fill-color': '#28b3d5',
                    'fill-opacity': 0.5
                }
            }, 'building-number-label');

            map.current.addLayer({
                'id': 'liquefaction-zones-line',
                type: 'line', 
                source: 'Liquefaction_zones',
                'paint':{
                    'line-color': '#ffffff'
                }
            }, 'building-number-label');

            map.current.addSource('opportunity-zones-ca', {
                type: 'geojson',
                data: 'https://pmaman.github.io/Reactuts/src/data/Opportunity_Zones_CA.geojson'
            });

            map.current.addLayer({
                'id': 'opportunity-zones-fill',
                type: 'fill', 
                source: 'opportunity-zones-ca',
                'paint':{
                    'fill-color': '#000000',
                    'fill-opacity': 0.5
                }
            }, 'building-number-label');

            map.current.addLayer({
                'id': 'opportunity-zones-line',
                type: 'line', 
                source: 'opportunity-zones-ca',
                'paint':{
                    'line-color': '#ffffff'
                }
            }, 'building-number-label');

            map.current.addSource('lacmta-brt', {
                type: 'geojson',
                data: 'https://pmaman.github.io/Reactuts/src/data/metro-bus-lines-lacmta.geojson'
            });

            map.current.addLayer({
                'id': 'lacmta-brt',
                type: 'LineString', 
                source: 'lacmta-brt',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint':{
                    'line-color': 'black',
                    'line-weight' : 10
                }
            }, 'building-number-label');

            map.current.addSource('cdph-healthcare-facilities', {
                type: 'geojson',
                data: 'https://pmaman.github.io/Reactuts/src/data/cdph-healthcare-facilities.geojson'
            });
             
            map.current.addLayer({
                'id': 'health-facilities-circle',
                'type': 'circle',
                'source': 'cdph-healthcare-facilities',
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
            } , 'building-number-label');

            // by the below console.log you can view all the mapbox layers loaded, find the last layer that you want to insert a new one before and add it as a second argyument in addLayer() ... in this case trying to add my layers below the map labels
            //const steez = map.current.getStyle();
            //console.log(steez);
        });


        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });

        map.current.on('click', (e) => {
            //console.log('clicked', e.point)
            const feat = map.current.queryRenderedFeatures(e.point, {
                layers: ['opportunity-zones-fill']
            });
            console.log(feat)
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