// import 'vite/dynamic-import-polyfill'; // for prod mode
import './css/index.css';
// import { dep } from './dep';
// Import Leaflet and necessary typings
import * as L from 'leaflet';

document.addEventListener('DOMContentLoaded', function () {
   navigator.geolocation.getCurrentPosition(function (position) {
    console.log('Get curr Pos');
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const h1 = document.querySelector('h1')
    const position1 = [latitude, longitude];
    console.log(latitude);
    console.log(longitude);
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const marker1 = L.marker(position1).addTo(map);
marker1.bindPopup('browser positon').openPopup();
}, function(error){
    console.log(error);
}, { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 
    });

    }, false);

