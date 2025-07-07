import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    // Fetch countries on initial render
    fetch('https://countries-search-data-prod-812920491762.asia-south1.run.app/countries')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(term)
    );

    setFilteredCountries(filtered);
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchBar"
      />
      <div className="countriesContainer">
        {filteredCountries.map((country) => (
          <div key={country.name} className="countryCard">
            <img src={country.flag} alt={country.name} />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
