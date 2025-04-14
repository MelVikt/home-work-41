import { useEffect, useState } from 'react';
import axios from 'axios';

function CountryDetails({ countryCode }) {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryCode) return;

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        const data = Array.isArray(response.data) ? response.data[0] : response.data;
        setCountryData(data);
      } catch (err) {
        console.error('Error during download:', err);
        setError('Failed to load country data.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [countryCode]);

  const renderFlag = () => {
    if (countryData.flags.png) {
      return <img src={countryData.flags.png} alt={`Flag ${countryData.name.common}`} width={100} />;
    }
    return null;
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!countryData) return null;

  return (
    <div className="country-details">
      <h3>Information about the country</h3>
      {renderFlag()}
      <p><strong>Name:</strong> {countryData.name.common}</p>
      <p><strong>Capital:</strong> {countryData.capital}</p>
      <p><strong>Region:</strong> {countryData.region}</p>
      <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
    </div>
  );
}

export default CountryDetails;
