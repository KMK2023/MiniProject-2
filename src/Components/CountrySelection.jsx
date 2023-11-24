// // import React from 'react';

// function CountrySelection() {
//   const Locationtype = ['Scenic', 'Shopping hubs', 'Capital cities', 'Outbacks'];
//   const Continents = ['Europe', 'Asia', 'Africa', 'Australia', 'Europe', 'Arctic', 'Antarctica'];
//   const pictures = [];

//   return (
//     <>
//       <h1>Welcome to Travel Favourite</h1>
//       <p>Welcome to travel tidbits, where you can save information about your travels.</p>

//       <div>
//         <h3>Location Types:</h3>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {Locationtype.map((type, index) => (
//             <li key={index} style={{ margin: '0', padding: '0' }}>
//               <a href={`#${type.toLowerCase()}`}>{type}</a>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div>
//         <h3>Continents:</h3>
//         <ul style={{ listStyle: 'none', padding: 0 }}>
//           {Continents.map((continent, index) => (
//             <li key={index} style={{ margin: '0', padding: '0' }}>
//               <a href={`#${continent.toLowerCase()}`}>{continent}</a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

// export default CountrySelection;

import React, { useState, useEffect } from "react";
import Worldmap from "../Pages/worldmap.jpg"; // Import the image

const apiUrl = "https://restcountries.com/v3.1/all";

function CountrySelection() {
  const [continents, setContinents] = useState([]);
  const [countries, setCountries] = useState([]);
  // const [cities, setCities] = useState([]);

  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });
        // Extract continents, countries, and cities from the API response
        // const uniqueContinents = Array.from(new Set(data.map((country) => country.region)));
        // const uniqueCountries = Array.from(new Set(data.map((country) => country.name.common)));
        // const uniqueCities = Array.from(new Set(data.flatMap((country) => country.capital)));
        let continentsMap = {},
          countriesMap = {};

        data.map((country) => {
          {
            let cont = country.region,
              count = country.name.common,
              city = country.capital?.[0] || null;
            if (!city) return;

            if (!continentsMap[cont]) continentsMap[cont] = [];
            continentsMap[cont].push(count); //key-continent,value is array of countries

            if (!countriesMap[count]) countriesMap[count] = [];
            countriesMap[count].push(city); // key-country,value -array of cities
          }
        });

        setContinents(continentsMap);
        setCountries(countriesMap);
        // setCities(uniqueCities);

        console.log({ continentsMap, countriesMap });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredContinents = Object.keys(continents);

  // const filteredCountries = countries.filter(
  //   (country) =>
  //     !selectedContinent ||
  //     selectedContinent === "All" ||
  //     continents[selectedContinent] === country.region
  // );

  // const filteredCities = cities.filter(
  //   (city) =>
  //     !selectedCountry ||
  //     selectedCountry === "All" ||
  //     countries[selectedCountry] === city
  // );

  console.log({ selectedContinent, selectedCountry });

  return (
    <div>
      <div
        style={{
          backgroundColor: "#f3f3ce",
          color: "black",
          border: "solid",
          padding: "30px",
        }}
      >
        <img
          src={Worldmap}
          alt="World Map"
          style={{ width: "300px", margin: "auto" }}
        />
        <h2>Country selection with places</h2>
        <br />
        <label>
          Select Continent:
          <select onChange={(e) => setSelectedContinent(e.target.value)}>
            <option value="">All</option>
            {filteredContinents.map((continent, index) => (
              <option key={index} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </label>
        {selectedContinent !== "" && (
          <label>
            Select Country:
            <select onChange={(e) => setSelectedCountry(e.target.value)}>
              <option value="">All</option>
              {continents[selectedContinent].map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        )}

        {selectedCountry !== "" && (
          <label>
            Select City:
            <select>
              {countries[selectedCountry].map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </div>
  );
}

export default CountrySelection;
