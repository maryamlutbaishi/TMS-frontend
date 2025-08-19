import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SearchMovie.css";

const SearchMovie = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = async (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
    const foundMovies = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/movies/search`,
      { params: { query: event.target.value } }
    );
    console.log("foundMovie: ", foundMovies.data);

    setSearchResult(foundMovies.data);
  };

  return (
    <>
      {/* Search Bar */}

      <div className="search_bar_container">
        <div className="search_icon_container">
          <svg
            className="search_icon"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 50 50"
          >
            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
          </svg>
        </div>
        <div className="search_input_container">
          <input
            type="text"
            id="query"
            name="query"
            placeholder="search for a movie"
            onKeyUp={handleChange}
          />
        </div>
      </div>

      {/* Movies Container */}

      <div className="all-movies">
        {searchResult.map((movie) => (
          <div
            className="one-movie"
            onClick={() => {
              navigate(`/movies/${movie.id}`);
            }}
          >
            <h3>{movie.title ? movie.title : movie.name}</h3>
            {movie.poster_path ? (
              <img
                className="poster"
                src={`https://image.tmdb.org/t/p/w185/${
                  movie.poster_path ? movie.poster_path : movie.backdrop_path
                }`}
              />
            ) : (
              <img className="poster" src="/shop_01.png" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default SearchMovie;
