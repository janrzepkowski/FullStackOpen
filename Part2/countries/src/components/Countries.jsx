import Country from "./country";

const Countries = ({ countries }) => {
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca2}>{country.name.common}</div>
      ))}
    </div>
  );
};

export default Countries;
