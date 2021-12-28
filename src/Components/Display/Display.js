import React, {useRef} from "react";
import "./Display.css";
import {Line, Chart} from 'react-chartjs-2'

function Display(dataSet) {

    const myRef = useRef(null);
    console.log(myRef.current);
 //   const ctx = myRef.getContext("2d");
    const labels = [
        "2010",
        "2011",
        "2012",
        "2013",
        "2014",
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2016",
        "2017"

    ]

    const data = {

        labels: labels,
        datasets:[
            {
                data:[211, 326, 165, 350, 420, 370, 500, 375, 415],
                label: "minecrafty Sales",
            },
        ],

    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
        },
    };

  //  const myChart = new Chart(ctx, config)

  const chartData ={
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets:[
      {
        label:'Population',
        data:[
          617594,
          181045,
          153060,
          106519,
          105162,
          95072
        ],
        backgroundColor:[
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ]
      }
    ]
  }

  return (
    <div className="Display">
      <div>
          
        <Chart chartData = {chartData} id="myChart" ref={myRef}  location="Massachusetts" legendPosition="bottom"/>
      </div>
    </div>
  );
}

export default Display;
