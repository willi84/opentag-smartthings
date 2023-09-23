// import 'vite/dynamic-import-polyfill'; // for prod mode
import './css/index.css';
import { getCurrentDate } from './time';
// Import Leaflet and necessary typings
import * as L from 'leaflet';

// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/database";

const map = L.map('map');

import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set, get } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCqnOeRF4qIxZWTJ6QZzXmGsFnrlnJmwIs",
  authDomain: "ms-hack-95f25.firebaseapp.com",
  databaseURL: "https://ms-hack-95f25-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ms-hack-95f25",
  storageBucket: "ms-hack-95f25.appspot.com",
  messagingSenderId: "462086530577",
  appId: "1:462086530577:web:7961a31254de9b37ecb3b0"
 };

// firebase.initializeApp(firebaseConfig);

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
  const pos = document.querySelector('#position')
  const posLat = pos?.getAttribute('data-lat');
  const posLon = pos?.getAttribute('data-lon')
  // const map = L.map('map'); 
  if(posLat && posLat !== '' && posLon && posLon !== ''){
    const lat = parseFloat(posLat);
    const lon = parseFloat(posLon);
    map.setView([lat, lon], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    navigator.geolocation.getCurrentPosition(function (position) {
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
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const updatePosition = () => {
  
  // Obtain the current geolocation
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log(latitude);
      console.log(longitude);
      const currentPositionRef = ref(db, '/');

      const newPosition = {
        latitude: latitude,
        longitude: longitude,
        lastUpdated: getCurrentDate()
      };

      // Update the position in the database
      set(currentPositionRef, newPosition)
        .then(() => {
          console.log('Position updated successfully.');
        })
        .catch(error => {
          console.error('Failed to update position:', error);
        });
     
    });
  } else {
    console.error('Geolocation is not supported by your browser.');
  }
}
var greenIcon = L.icon({
  iconUrl: '/api/nerd.png',
  // shadowUrl: '/api/nerd.png',

  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
const updateRealTime = (data: any, curretMarker: any) => {
  if(!curretMarker){
    // curretMarker.setLatLng([data.latitude, data.longitude]);
    map.setView([data.latitude, data.longitude], 18);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  }

    // const map = L.map('map'); 
    const position3 = [data.latitude, data.longitude];
    const marker3 = L.marker(position3, {icon: greenIcon}).addTo(map);
    marker3.bindPopup(`realtime positon\n${data.lastUpdated}\n${data.latitude}|${data.longitude}`).openPopup();
    const maxZoom = map.getMaxZoom();

console.log(`Maximum supported zoom level: ${maxZoom}`);
    const lastUpdated = document.querySelector('#last_update');
    if(lastUpdated){
  
      lastUpdated.innerHTML = data.lastUpdated;
    }
        
    return marker3;

}
document.addEventListener('DOMContentLoaded', function () {
   const map = setInitialPosition();

   const hasMap = document.getElementById('map');
    const trackButton = document.getElementById('track');
    const reloadButton = document.getElementById('reloadButton');
    const stopButton = document.getElementById('stopButton');
    const update_position = document.getElementById('update_position');
    let intervalId: any;
    let intervalId2: any;
    let intervalId3: any;
    if(trackButton){
      trackButton.addEventListener('click', () => {
        let executionCount = 0;
        const maxExecutions = 15;
        let curretMarker: any;
        const intervalId3 = setInterval(function() {
          executionCount++;
          // hier
          const currentPositionRef = ref(db, '/');
          console.log('update');
          get(currentPositionRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              const data = snapshot.val();
              curretMarker = updateRealTime(data, curretMarker);
              console.log('Data:', data);
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error('Failed to update position:', error);
          });

          if (executionCount >= maxExecutions) {
            console.log('update_position cliked')
            clearInterval(intervalId3); // Stop the interval
          }
        }, 2000);
        
      });
    }
    if(hasMap && reloadButton){

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
    }
    console.log('update_position')
    if(update_position){
      update_position.addEventListener('click', () => {
        let executionCount = 0;
        const maxExecutions = 15;
  
        intervalId2 = setInterval(function() {
          executionCount++;
          updatePosition();

          if (executionCount >= maxExecutions) {
            console.log('update_position cliked')
            clearInterval(intervalId2); // Stop the interval
          }
        }, 2000);
      });
    }

    }, false);


   