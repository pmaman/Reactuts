import React from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MainNav from './Components/MainNav.js';
import BaseMap from './Components/BaseMap.js';
mapboxgl.accessToken = 'pk.eyJ1IjoicG1hbWFuMjAiLCJhIjoiY2ttYXhma2x2MXRsajJxb2M5cmN0em11cSJ9.Nu4NV4JptOOIdvzu8dGV1w';

function App() {
  return (
    <div className="App">
      <MainNav />
      <BaseMap />
    </div>
  );
}
export default App;