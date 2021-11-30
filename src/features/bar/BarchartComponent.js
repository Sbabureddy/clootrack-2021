import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";

const BarchartComponent = () => {
  const [pieData, setPieData] = useState([]);

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
      .then((res) => {
        const newData = res
          .filter((t) => t.type === "Bar")
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
        setPieData(newData);
      });
  }, []);

  return (
    <>
      <h2>Bar Chart's</h2>
      <div className="card p-d-flex p-jc-center chart">
        {pieData.map((chartData, id) => (
          <Chart type="bar" key={id} data={chartData} options={lightOptions} />
        ))}
      </div>
    </>
  );
};

export default BarchartComponent;
