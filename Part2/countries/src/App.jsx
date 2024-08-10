import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Country from "./components/country";
import Countries from "./components/Countries";
import countriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const countriesToShow = filter
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries;

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      {countriesToShow.length === 1 ? (
        <Country country={countriesToShow[0]} />
      ) : (
        <Countries countries={countriesToShow} />
      )}
    </div>
  );
};

export default App;
