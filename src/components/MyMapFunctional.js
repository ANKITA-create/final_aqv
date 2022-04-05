import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import MarkerData from './Marker.json'
import {Icon} from 'leaflet'
import fireDb from '../firebase'
import './MyMap.css';
import "leaflet/dist/leaflet.css";
const filtered = MarkerData.filter(mark=>mark.country==="India")
const MyMapFunctional = () => {
  const [aqi, setAqi] = useState();
  let aqiArr = []
  useEffect(() => {
    var AQI_P = fireDb.ref('AQI/');
    AQI_P.on('value', function(snapshot) {

    // console.log("--------------///////", snapshot.val()	);
    var demo = snapshot.val();
    console.log(demo);
    snapshot.forEach((childSnapshot) => {
    var aqi = childSnapshot.val().AQI_P;
    console.log("gg ",aqi);
    setAqi(aqi)
    console.log("------------",document.querySelector("#aqi"));
    //document.getElementById("aqi").innerHTML = aqi;
    
    })
    // });
  });
  }, []);

    return(
    		<h2 id="#aqi">jiii {aqi}</h2>
    	);
};


export default MyMapFunctional;