import "./App.css";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import TemperatureModal from "./components/temperatureModal";

function App() {
  const [temperatureModalInfo, setTemperatureModalInfo] = useState({
    open: false,
    temperature: "15",
    name: "captor",
  });

  const coordinates = [50.606465, 3.135558];

  // Make a fetch to get the data from an IP address
  const [captor, setCaptor] = useState({
    client: "pi-1",
    heat_stable: 1,
    temperature: 24.1,
    humidity: 59.54,
    pressure: 1015.28,
    gas_resistance: 21256.345177664978,
    created_at: "2023-01-06 10:22:06",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      fetch("http://172.20.10.3:4040", {})
        .then((response) => response.json())
        .then((data) => {
          console.log("request");
          setCaptor(data[0]);
        });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (captor.temperature > 30) {
      setTemperatureModalInfo({
        open: true,
        temperature: captor.temperature,
        name: captor.client,
      });
    } else {
      setTemperatureModalInfo({
        open: false,
        temperature: captor.temperature,
        name: captor.client,
      });
    }
  }, [captor]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
        integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
        crossorigin=""
      />
      <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={coordinates}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <div className="deviceTooltip">
              <h3>Capteur 1</h3>
              <div>
                <div>
                  <strong>Longitude: </strong>
                  {coordinates[0]}
                </div>
                <div>
                  <strong>Lattitude:</strong> {coordinates[1]}
                </div>
                <div>
                  <strong>Temperature:</strong> {captor.temperature} °C
                </div>
                <div>
                  <strong>Humidité:</strong> {captor.humidity} %
                </div>
                <div>
                  <strong>Pression:</strong> {captor.pressure} Pa
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
        <TemperatureModal
          temperatureModalInfo={temperatureModalInfo}
          setTemperatureModalInfo={setTemperatureModalInfo}
        />
      </MapContainer>
    </>
  );
}

export default App;
