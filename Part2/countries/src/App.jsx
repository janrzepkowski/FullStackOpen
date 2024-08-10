import { useState, useEffect } from "react";
import Filter from "./components/Filter";
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

  return (
    <div>
      <h1>Countries</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  );
};

export default App;