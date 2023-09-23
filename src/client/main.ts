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
const setInitialPosition = () => {
  const lat = parseFloat(document.querySelector('#position')?.getAttribute('data-lat'));
  const lon = parseFloat(document.querySelector('#position')?.getAttribute('data-lon'));
  const map = L.map('map'); 
  map.setView([lat, lon], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
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
  return map;
}
const getGeolocation = (map: any) => {
  const statusDOM = document.querySelector('#status');
  const currentDate = new Date();
  const germanDateFormatOptions: any = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const germanFormattedDate = currentDate.toLocaleDateString('de-DE', germanDateFormatOptions);
  console.log(statusDOM)
  if(statusDOM){
    statusDOM.innerHTML = germanFormattedDate;
  }

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
    const distance = getDistance(latitude, longitude, lat, lon, 'K');
    const distanceDOM =  document.querySelector('#distance');
    const body = document.querySelector('body')
    if(distanceDOM){
      distanceDOM.innerHTML = `${distance}`;
      if(body){
        if(distance > 5){

          body.style.backgroundColor = 'red';
        } else {
          body.style.backgroundColor = 'lightgreen';
        }
      }
    }
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

}

document.addEventListener('DOMContentLoaded', function () {
  const map = setInitialPosition();

    const reloadButton = document.getElementById('reloadButton');
    const stopButton = document.getElementById('stopButton');
    let intervalId: any;
    if(stopButton) {
      clearInterval(intervalId);
    }
    if(reloadButton) {
      reloadButton.addEventListener('click', () => {
        let executionCount = 0;
        const maxExecutions = 15;

        intervalId = setInterval(function() {
          getGeolocation(map)
          executionCount++;

          if (executionCount >= maxExecutions) {
            clearInterval(intervalId); // Stop the interval
          }
        }, 2000);
        console.log('weiter');
        if(stopButton){

          stopButton.addEventListener('click', () => {
            console.log('stop button clicked')
            clearInterval(intervalId); 
          });
        }
      });
    }


    }, false);

