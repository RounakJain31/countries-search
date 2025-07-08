import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
      );
      const data = await response.json();
      setCountries(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    const filteredList = countries.filter((country) =>
      (country?.common || "").toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  }, [search, countries]);

  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />
      <div style={styles.grid}>
        {filtered.map((country, index) => (
          <div className="countryCard" key={index} style={styles.card}>
            <img
              src={country.png}
              alt={`${country.common} flag`}
              style={styles.flag}
            />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    minHeight: "100vh",
  },
  input: {
    width: "60%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "15px",
  },
  card: {
    backgroundColor: "white",
    border: "1px solid #ccc",
    width: "120px",
    padding: "10px",
    textAlign: "center",
    boxShadow: "0 0 4px rgba(0,0,0,0.1)",
  },
  flag: {
    width: "100%",
    height: "auto",
  },
};

export default App;