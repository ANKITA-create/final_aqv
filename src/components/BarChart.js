import React, { useEffect, useState } from "react";
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2'

import fireDb from "../firebase"; 
ChartJS.register(...registerables);
var global_data = {};
var chartReference = {};

var city =["Bangalore","Chennai","Delhi","Kolkata","Mumbai"];
var plot_data =[];
const BarChart = () => {
  
  
  const [plot, setPlot] = useState();
  const handleSubmit = (e) => {
    //plot_data.length=0;
    e.preventDefault();
    const para = e.target.para.value;
    console.log(para);
    getData(para);
    document.getElementById("myForm").reset();
        //plot_data.update();
  }
  const getData = (parameters) => {
    //console.log("getData functuon called", global_data[parameters]);
    setPlot([]);
    city.forEach(function (item, index) {
    var data1 = global_data[item][parameters];
    plot_data.push(data1);
  });
    setPlot(plot_data);
    console.log("check",plot_data);
    //plot_data.length=0;
    
  };
  useEffect(() => {
    var city = fireDb.ref("AQI/");
    city.on("value", function (snapshot) {
    var demo = snapshot.val();
    console.log("dy", demo);
    global_data = demo;
  });
  }, []);

  


  return (
    <div>
    <form
      id="myForm"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
    <div class="input-group mb-4 w-75 mx-auto">
        <input
          type="search"
          name="para"
          class="form-control"
          placeholder="Search parameters"
          aria-label="Search parameters"
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
    <div className="BarChart">
      {console.log("inSide",plot_data)}
      <div style={{ maxWidth: "650px" }} >
        
        <Bar
          

          data={{
            
            labels: ["Mumbai","Bangalore","Chennai","Delhi","Kolkata"],
            datasets: [
              {
                label: "AQV",

                data: plot_data,
                backgroundColor: ["aqua", "green", "red", "yellow"],
                
                borderColor: ["aqua", "green", "red", "yellow"],
                borderWidth: 5,
              },
            ],

          }}
          
            
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20

            },
            legend: {
              display:true,
              position:'right'  
            },

          }}
        />

      </div>
    </div>
    </div>
  );
}


export default BarChart;