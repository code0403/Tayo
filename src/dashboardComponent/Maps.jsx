import React from 'react';
import {MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import { Icon } from 'leaflet';


const CovidMap = ({ caseType, countries, center, zoom, countryInfo}) => {
 
  // console.log(countryInfo)

  const customIcon = new Icon({
    iconUrl : require("../Images/location-pin.png"),
    iconSize: [38, 38]
  })
  
  return (
    <div className="map" style={{ marginTop : "30px", width:"60%", height: '500px', padding:"1em", borderRadius:"20px", boxShadow:"0 0 8px -4px rgba(0, 0, 0, 0.5)" }}>
      <MapContainer  zoom={zoom} center={center}  style={{height:"100%", border:"1px solid black"}}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={center} icon={customIcon}>
          <Tooltip>{countryInfo.country}</Tooltip>
          <Popup>
            <p>Country - {countryInfo.country}</p>
            <p>Total Cases - {countryInfo.cases}</p>
            <p>Total Recovered - {countryInfo.recovered}</p>
            <p>Active Cases - {countryInfo.active}</p>
            <p>Total Deaths - {countryInfo.deaths}</p>
          </Popup>
          
          
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CovidMap;
