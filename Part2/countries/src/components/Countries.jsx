import { useState } from "react";
import Country from "./country";

const Countries = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowClick = (country) => {
    setSelectedCountry(country);
  };

  if (selectedCountry) {
    return <Country country={selectedCountry} />;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca2}>
          {country.name.common}{" "}
          <button onClick={() => handleShowClick(country)}>show</button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
