// import 'vite/dynamic-import-polyfill'; // for prod mode
import './css/index.css';
// import { dep } from './dep';
// Import Leaflet and necessary typings
import * as L from 'leaflet';

let getDistance = function(lat1: number, lon1: number, lat2: number, lon2: number, unit: string) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist*1000;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const lat = parseFloat(document.querySelector('#position')?.getAttribute('data-lat'));
  const lon = parseFloat(document.querySelector('#position')?.getAttribute('data-lon'));
   navigator.geolocation.getCurrentPosition(function (position) {
    console.log('Get curr Pos');
    console.log(lat)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const h1 = document.querySelector('h1')
    const position1 = [latitude, longitude];
    const position2 = [lat, lon];
    console.log(latitude);
    console.log(longitude);
    const distance = getDistance(latitude, longitude, lat, lon, 'K').toString();
    const distanceDOM =  document.querySelector('#distance')
    if(distanceDOM){
      distanceDOM.innerHTML = distance;
    }
  const map = L.map('map').setView([latitude, longitude], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const marker1 = L.marker(position1).addTo(map);
const marker2 = L.marker(position2).addTo(map);
marker1.bindPopup('browser positon').openPopup();
marker2.bindPopup('tag positon').openPopup();
}, function(error){
    console.log(error);
}, { 
        enableHighAccuracy: true, 
        timeout: 15000, 
        maximumAge: 0 
    });

    }, false);

