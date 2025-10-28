import { useState, useEffect } from "react";

export default function Weather() {
  const [query, setQuery] = useState(""); // user input
  const [city, setCity] = useState("Karachi"); // selected city
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "871f0e0a3e994abdaff82858250610";

  // fetch weather when city changes
  useEffect(() => {
    if (!city) return;
    async function fetchWeather() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
        );
        const json = await res.json();
        if (json.error) {
          setError(json.error.message);
          setData(null);
        } else {
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  // handle search (press Enter or button)
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setCity(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 pb-16">
      {/* Heading */}
      <h2 className="text-4xl font-extrabold mb-4 text-gray-800 tracking-wide">
        Global Weather Dashboard
      </h2>
      <p className="text-gray-600 mb-10 text-lg text-center max-w-lg">
        Search weather for any city in the world 🌤️
      </p>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-10 w-80"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Weather Card */}
      {loading ? (
        <div className="text-gray-500 text-lg">Fetching weather data...</div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : data ? (
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-8 w-80 text-center hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {data.location.name}, {data.location.country}
          </h3>
          <p className="text-5xl font-extrabold text-blue-600 mb-2">
            {data.current.temp_c}°C
          </p>
          <p className="text-gray-600 capitalize mb-3">
            {data.current.condition.text}
          </p>
          <img
            src={data.current.condition.icon}
            alt="weather icon"
            className="mx-auto mb-4"
          />
          <div className="flex justify-center gap-6 text-gray-700 mt-4">
            <div>
              <p className="font-semibold text-sm">Humidity</p>
              <p>{data.current.humidity}%</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Wind</p>
              <p>{data.current.wind_kph} km/h</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Type a city name to see weather info.</p>
      )}

      {/* Footer Note */}
      <div className="mt-16">
        <p className="text-gray-400 text-sm">
          Powered by{" "}
          <a
            href="https://www.weatherapi.com/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            WeatherAPI.com
          </a>
        </p>
      </div>
    </div>
  );
}
