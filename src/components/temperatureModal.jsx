import React from "react";
import SimpleModal from "./modal";

const TemperatureModal = ({
  temperatureModalInfo,
  setTemperatureModalInfo,
}) => {
  const normalTemperature = 25;

  return (
    <SimpleModal
      onClose={() =>
        setTemperatureModalInfo({
          open: false,
          temperature: temperatureModalInfo.temperature,
          name: temperatureModalInfo.name,
        })
      }
      message={`  Le capteur "${
        temperatureModalInfo.name
      }" a relevé une temperature à
    ${temperatureModalInfo.temperature - normalTemperature}°C au dessus de
    la normal.`}
      isOpen={temperatureModalInfo.open}
    />
  );
};
export default TemperatureModal;
