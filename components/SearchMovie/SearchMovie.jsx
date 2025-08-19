import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./SearchMovie.css";

const SearchMovie = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({});
  const [searchResult, setSearchResult] = useState([]);
  const handleChange = async (event) => {
    console.log("works");
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
    const foundMovies = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/movies/search`,
      { params: { query: event.target.value } }
    );
    console.log("foundMovie: ",foundMovies.data);

    setSearchResult(foundMovies.data);
    console.log(searchResult);
  };

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          id="query"
          name="query"
          placeholder="search for a movie"
          onKeyUp={handleChange}
        />
      </div>
      <div className="all-movies">
        {searchResult.map((movie) => (
          <div
            className="one-movie"
            onClick={() => {
              navigate(`/movies/${movie.id}`);
              console.log("clicked");
            }}
          >
            <h3>{movie.title ? movie.title : movie.name}</h3>
            <img
              className="poster"
              src={`https://image.tmdb.org/t/p/w185/${
                movie.poster_path ? movie.poster_path : movie.backdrop_path
              }`}
            />
            <p>ID: {movie.id}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default SearchMovie;
