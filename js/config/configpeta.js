import Map from 'https://cdn.skypack.dev/ol/Map.js';
import View from 'https://cdn.skypack.dev/ol/View.js';
import TileLayer from 'https://cdn.skypack.dev/ol/layer/Tile.js';
import XYZ from 'https://cdn.skypack.dev/ol/source/XYZ.js';
import OSM from 'https://cdn.skypack.dev/ol/source/OSM.js';
import {fromLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import Overlay from 'https://cdn.skypack.dev/ol/Overlay.js';
import {container} from 'https://jscroot.github.io/element/croot.js';
import { URLGeoJson } from '../template/template.js';

const attributions = '<a href="https://petapedia.github.io/" target="_blank">&copy; PetaPedia Indonesia</a> ';

const place = [107.13563336552649,-6.8165156551551505];

export let idmarker = {id:1};

const basemap = new TileLayer({
  source: new OSM({attributions: attributions,}),
});

const defaultstartmap = new View({
  center: fromLonLat(place),
  zoom: 15,
});

export const overlay = new Overlay({
    element: container('popup'),
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

export const popupinfo = new Overlay({
    element: container('popupinfo'),
    autoPan: {
      animation: {
        duration: 250,
      },
    },
});

export let map = new Map({
  overlays: [overlay,popupinfo],
  target: 'map',
  layers: [
    basemap
  ],
  view: defaultstartmap,
});

// const pointSource = new ol.source.Vector({
//     url: '../../json/point.json',
//     format: new ol.format.GeoJSON()
// });

// const pointLayer = new ol.layer.Vector({
//     source: pointSource,
//     style: new ol.style.Style({
//         image: new ol.style.Circle({
//             radius: 5,
//             fill: new ol.style.Fill({
//                 color: 'blue'
//             })
//         })
//     })
// });

// map.addLayer(pointLayer);

// const getCoordinates = (source) => {
//     const features = source.getFeatures();
//     if (features.length > 0) {
//       const coordinates = features[0].getGeometry().getCoordinates();
//       return coordinates;
//     } else {
//       return null; // Handle the case where there are no features
//     }
//   };

//   pointSource.once('change', () => {
//     const pointCoords = getCoordinates(pointSource);
//     if (pointCoords) {
//       document.getElementById('featureName').textContent = 'Point';
//       document.getElementById('featureType').textContent = 'Point';
//       document.getElementById('featureCoords').textContent = pointCoords.toString();
//     } else {
//       // Handle the case when there are no features
//       console.log('No features found.');
//     }
//   });