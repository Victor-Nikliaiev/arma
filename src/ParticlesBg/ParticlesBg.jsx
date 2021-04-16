import React from "react";
import Particles from "react-particles-js";
import "./ParticlesBg.scss";
import { particleConfig } from "./particleConfig";

export const ParticlesBg = () => {
  return (
    <div className="background">
      <Particles params={particleConfig}></Particles>;
    </div>
  );
};
