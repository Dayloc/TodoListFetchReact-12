import React from "react";
import AgregarTarea from "./AgregarTarea";
import "../../styles/index.css";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Todo List App</h1>
      <AgregarTarea />
    </div>
  );
};

export default Home;
