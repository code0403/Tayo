import React from "react";
import numeral from "numeral";

const CovidTable = ({countries}) => {
  return (
    <div
      style={{
        marginTop: "30px",
        width: "30%",
        height: "500px",
        padding: "1em",
        borderRadius: "20px",
        border: "1px solid black",
        boxShadow: "0 0 8px -4px rgba(0, 0, 0, 0.5)",
      }}
    >
        <h3>Live Cases by Country</h3>
        <div className="table" style={{ marginTop: "20px", overflow:"scroll", color:"#6a5d5d", backgroundColor:"#fff", height:"400px"}}>
            <tbody>
            {
                countries.map((country, index) => (
                  <tr key={index}  style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                  <td style={{padding:"0.5rem", border:"none"}}>{country.country}</td>
                  <td style={{padding:"0.5rem", border:"none"}}>
                    <strong>{numeral(country.cases).format("0,0")}</strong>
                  </td>
                  </tr>
                ))
            }
            </tbody>
      
    </div>
    </div>
  );
};

export default CovidTable;
