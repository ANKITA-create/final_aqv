import React, { useState, useEffect } from "react";
//import Weather from '../components/Weather';
import fireDb from "../firebase";

// import firebase from 'firebase';
const initialFieldValues = {
  city: "",
};
var global_data = {};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value;
    console.log(city);
    this.getData(city);
    document.getElementById("myForm").reset();
  };
  getData = (cityName) => {
    console.log("getData functuon called", global_data[cityName]);
    console.log(document.querySelector(".aqi"));
    var aqi = global_data[cityName]["AQI_P"];
    var co = global_data[cityName]["CO"];
    var nh3 = global_data[cityName]["NH3"];
    var no2 = global_data[cityName]["NO2"];
    var o3 = global_data[cityName]["O3"];
    var pm = global_data[cityName]["PM"];
    var so2 = global_data[cityName]["SO2"];

    document.querySelector(".aqi").innerHTML = aqi;
    document.querySelector(".co").innerHTML = co;
    document.querySelector(".nh3").innerHTML = nh3;
    document.querySelector(".no2").innerHTML = no2;
    document.querySelector(".o3").innerHTML = o3;
    document.querySelector(".pm").innerHTML = pm;
    document.querySelector(".so2").innerHTML = so2;

  };

  componentDidMount() {
    var AQI_P = fireDb.ref("AQI/");
    AQI_P.on("value", function (snapshot) {
      // console.log("--------------///////", snapshot.val()  );
      var demo = snapshot.val();
      console.log("dy", demo);
      global_data = demo;
      console.log("check",global_data);
      var newObject = {};

      Object.keys(demo).forEach(function (key) {
        newObject = demo[key];
        console.log(newObject);
      });
      var dhund = "Mumbai";
      //console.log("mama",value);

      //console.log("pls aaja",dhund);
      for (var i = 0; i < newObject.length; i++) {
        if (dhund === newObject[i]) {
          console.log("dfsu", newObject[i]);
        }
      }
    });
    console.log("test",global_data);
  }

  render() {
    return (
      <>
        <div>
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-md-4">
                <div class="card text-white text-center border-0">
                  <img
                    src="https://source.unsplash.com/600x900/?nature"
                    class="card-img"
                    alt="..."
                  />
                  <div class="card-img-overlay">
                    <form
                      id="myForm"
                      autoComplete="off"
                      onSubmit={this.handleSubmit}
                    >
                      <div class="input-group mb-4 w-75 mx-auto">
                        <input
                          type="search"
                          name="city"
                          class="form-control"
                          placeholder="Search City"
                          aria-label="Search City"
                          aria-describedby="basic-addon2"
                        />
                        <button
                          type="submit"
                          class="input-group-text"
                          id="basic-addon2"
                        >
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </form>
                    <div className="bg-dark bg-opacity-50 py-3">
                      
                      <p>AQI:<p className="fw-bolder mb-0 aqi"></p></p>
                      <p>CO:<p className="fw-bolder mb-0 co"></p></p>
                      <p>NH3:<p className="fw-bolder mb-0 nh3"></p></p>
                      <p>NO2:<p className="fw-bolder mb-0 no2"></p></p>
                      <p>O3:<p className="fw-bolder mb-0 o3"></p></p>
                      <p>PM:<p className="fw-bolder mb-0 pm"></p></p>
                      <p>SO2:<p className="fw-bolder mb-0 so2"></p></p>


                      

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Weather;