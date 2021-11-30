import React from "react";
import "./App.css";
import BarchartComponent from "./features/bar/BarchartComponent";
import PiechartComponent from "./features/pie/PieChartComponent";

function App() {
  return (
    <div className="App">
      <BarchartComponent />
      <PiechartComponent />
    </div>
  );
}

export default App;
