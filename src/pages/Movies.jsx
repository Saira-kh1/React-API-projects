import { useEffect, useState } from "react";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  const API_KEY = "3ee3f237dfb47bf500a4e8a738554bd0"; // Replace with your TMDB API key
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

  // Fetch popular movies by default
  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movies (popular or search)
  const fetchMovies = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);

      const url = searchQuery
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch movies");
      setLoading(false);
    }
  };

  // Fetch trailer URL for a movie
  const fetchTrailerUrl = async (movieId) => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
      const data = await res.json();
      const trailer = data.results.find((v) => v.type === "Trailer" && v.site === "YouTube");
      return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
    } catch (err) {
      return null;
    }
  };

  // Handle trailer button click
  const handleTrailerClick = async (movieId) => {
    const trailerUrl = await fetchTrailerUrl(movieId);
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    } else {
      alert("Trailer not available.");
    }
  };

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(query);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Movies</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 w-72 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </form>

      {/* Loading/Error */}
      {loading && <p className="text-center mt-10 text-xl font-semibold">Loading movies...</p>}
      {error && <p className="text-center mt-10 text-red-500 font-semibold">{error}</p>}

      {/* Movie Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMAGE_BASE}${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.title}
                  className="w-full h-80 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{movie.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Rating: {movie.vote_average} ⭐</p>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{movie.overview.slice(0, 100)}...</p>
                  <button
                    onClick={() => handleTrailerClick(movie.id)}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Watch Trailer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 col-span-full">No movies found.</p>
          )}
        </div>
      )}
    </div>
  );
}
