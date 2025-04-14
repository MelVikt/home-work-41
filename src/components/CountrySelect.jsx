import { useEffect, useState } from 'react';
import axios from 'axios';

function CountrySelect({ value, onChange, showError }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const sortedCountries = response.data
          .map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCountries(sortedCountries);
        setLoading(false);
      } catch (err) {
        setError('Error loading country list');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  const renderError = () => {
    if (showError && !value) {
      return <p className="error">Please select a country!</p>;
    }
    return null;
  };

  return (
    <>
      <label>
        Select country:
        <select value={value} onChange={onChange}>
          <option value="">- select here -</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </label>
      {renderError()}
    </>
  );
}

export default CountrySelect;
