import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const PiechartComponent = () => {
  const [barData, setBarData] = useState([]);

  const lightOptions = {
    plugins: {
      legend: {
        labels: {
          color: "#495057",
        },
      },
    },
  };

  useEffect(() => {
    fetch(
      "https://s3-ap-southeast-1.amazonaws.com/he-public-data/chart2986176.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const newData = data
          .filter((t) => t.type === "Pie")
          .map((el) => {
            const generateColors = (n) => {
              const colors = [];

              for (let i = 0; i < n; i++) {
                const color = "#" + Math.random().toString(16).slice(-6);
                colors.push(color);
              }
              return colors;
            };
            return {
              datasets: [
                {
                  data: el.elements,
                  backgroundColor: generateColors(el.elements.length),
                  hoverBackgroundColor: generateColors(el.elements.length),
                },
              ],
            };
          });
        setBarData(newData);
      });
  }, []);

  return (
    <>
      <h2>Pie Chart's</h2>
      <div className="card p-d-flex p-jc-center chart">
        {barData.map((chartData, id) => (
          <Chart type="pie" key={id} data={chartData} options={lightOptions} />
        ))}
      </div>
    </>
  );
};

export default PiechartComponent;
