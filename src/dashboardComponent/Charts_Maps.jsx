import React, { useEffect, useState } from "react";
import { sortData } from "../utlis/utlis";
// import LineGraph from './LineGrap';
import CovidMap from "./Maps";
import "leaflet/dist/leaflet.css";
import CovidTable from "./CovidTable";
import LineGraph from "./LineGrap";

const ChartsMaps = () => {
  const [caseType, setCaseType] = useState("cases");
  const [country, setInputCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countries, setCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);

  const getAllCountriesInfo = async () => {
    try {
      let res = await fetch(`https://disease.sh/v3/covid-19/all`);
      let result = await res.json();
      setCountryInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getCountriesData = async () => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        let sortedData = sortData(data);
        setCountries(countries);
        setMapCountries(data);
        setTableData(sortedData);
      });
  };

  useEffect(() => {
    getAllCountriesInfo();
    getCountriesData();
  }, []);

  const handleChange = (e) => {
    setCaseType(e.target.value);
  };

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/countries/Zimbabwe`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
      let res = await fetch(url);
      let result = await res.json();
      setInputCountry(countryCode);
      setCountryInfo(result);
      setMapCenter([result.countryInfo.lat, result.countryInfo.long]);
      setMapZoom(3);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ width: "80%", height: "auto" }}>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Covid-19 Dashboard
      </h1>
      <div style={{ marginTop: "50px" }}>
        <form
          style={{
            width: "70%",
            margin: "auto",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <label style={{ fontSize: "24px" }} htmlFor="cases">
            {" "}
            Cases:
            <input
              type="radio"
              name="cases"
              id="cases"
              value="cases"
              checked={caseType === "cases"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", outline: "none" }}
            />
          </label>

          <label style={{ fontSize: "24px" }} htmlFor="deaths">
            {" "}
            Deaths:
            <input
              type="radio"
              name="deaths"
              id="deaths"
              value="deaths"
              checked={caseType === "deaths"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", outline: "none" }}
            />
          </label>

          <label style={{ fontSize: "24px" }} htmlFor="recovered">
            {" "}
            Recovered:
            <input
              type="radio"
              name="recovered"
              id="recovered"
              value="recovered"
              checked={caseType === "recovered"}
              onChange={handleChange}
              style={{ width: "20px", height: "20px", outline: "none" }}
            />
          </label>

          <label style={{ fontSize: "24px" }}>Countries:</label>
          <select value={country} onChange={onCountryChange}>
            <option value="worldwide">worldwide</option>
            {countries.map((country, index) => {
              return (
                <option key={index} value={country.value}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div style={{display:"flex", justifyContent:"space-around", alignItems:"center"}}>
        <CovidMap
          caseType={caseType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          countryInfo={countryInfo}
        />

        <CovidTable countries={tableData} />
      </div>

      {/* <LineGraph caseType={caseType} /> */}
    </div>
  );
};

export default ChartsMaps;
