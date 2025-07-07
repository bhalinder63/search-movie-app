import "./App.css";

import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import MovieCard from "./components/MovieCard";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const VITE_TMDB_API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzBhOGJhODcxYjBmMjBiZTM0MGJhMzU1MTVkZGM2YyIsIm5iZiI6MTc1MDA1NDk4My45NjIsInN1YiI6IjY4NGZiODQ3MjBjNjRjZGE2ZWIwZTg2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4-7TFMlugzrcgv8BqheGdqqr5jGDwMAL1sUsv9-KCvA";

  const API_BASE_URL = "https://api.themoviedb.org/3";
  const API_KEY = VITE_TMDB_API_KEY;
  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const fetchMovies = async (query = "") => {
    setisLoading(true);
    setErrorMessage("");
    try {
      const endPoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endPoint, API_OPTIONS);
      const data = await response.json();

      if (data.results.length > 0) {
        console.log(data.results);
        setMoviesList(data.results);
      } else {
        setErrorMessage("No movies found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Error fetching movies. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero-img.png" alt="Hero Banner" />
          <h1>
            Find the best <span className="text-gradient">movies</span> for you
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <span className="loader"></span>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
