import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import MarkerData from "./Marker.json";
import { Icon } from "leaflet";
import fireDb from "../firebase";
import "./MyMap.css";
import "leaflet/dist/leaflet.css";

const filtered = MarkerData.filter((mark) => mark.country === "India");
// let global_mark = {};
// const markerOnClick = (mark) => {
//   console.log("marker functuon called", mark["city"], global_mark);
//   let cityName = mark["city"];
//   console.log("i think this will work", global_mark[cityName]["AQI_P"]);
//   let aqiInnerHtml = global_mark[cityName]["AQI_P"];
//   setAqi(aqiInnerHtml);

//   // document.querySelector("#aqi").innerHTML = aqiInnerHtml;
//   console.log("------------", document.querySelector("#aqi"));
// };

const MyMap = () => {
  let global_mark = {};
  const markerOnClick = (mark) => {
    console.log("marker functuon called", mark["city"], global_mark);
    // let cityName = mark["city"];
    console.log("i think this will work", global_mark[mark["city"]]["AQI_P"]);
    // let aqiInnerHtml = global_mark[mark["city"]]["AQI_P"];
    // setAqi(aqiInnerHtml);

    document.querySelector("#aqi").innerHTML =
      global_mark[mark["city"]]["AQI_P"];
    console.log("------------", document.querySelector("#aqi"));
  };
  const [aqi, setAqi] = useState();
  let aqiArr = [];
  useEffect(() => {
    var AQI_P = fireDb.ref("AQI/");
    AQI_P.on("value", function (snapshot) {
      // console.log("--------------///////", snapshot.val()  );
      var demo = snapshot.val();
      global_mark = demo;
      console.log("demooo", demo);
      // const obj = JSON.parse(demo);
      console.log(Object.keys(demo));
      console.log("yooo", demo["Mumbai"]["AQI_P"]);
      console.log("singleee", demo[Object.keys(demo)[0]]);
      snapshot.forEach((childSnapshot) => {
        var aqi = childSnapshot.val().AQI_P;
        console.log("gg ", aqi);
        console.log("------------", document.querySelector("#aqi"));
        //document.getElementById("aqi").innerHTML = aqi;
      });
    });
  }, []);
  console.log("bbbbbbbbbbbbbb", global_mark);
  return (
    <>
      <MapContainer
        center={[19.66328, 75.300293]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filtered.map((mark) => (
          <Marker
            eventHandlers={{
              click: () => {
                markerOnClick(mark);
              },
            }}
            key={mark.id}
            position={[mark.lat, mark.lng]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup position={[mark.lat, mark.lng]}>
              <div>
                <p>
                  AQI:
                  <strong
                    id="aqi"
                    // onChange={this.handleChange}
                    // value={this.state.aqi}
                  ></strong>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MyMap;
