import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

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

    setSearchResult(foundMovies.data.results);
    console.log(foundMovies.data.results);
    console.log(searchResult);
  };

  return (
    <>
      <input
        type="text"
        id="query"
        name="query"
        placeholder="search for a movie"
        onKeyUp={handleChange}
      />
      {searchResult.map((movie) => (
        <div
          onClick={() => {
            navigate(`/movies/${movie.id}`);
            console.log("clicked");
          }}
        >
          <h3>{movie.title}</h3>
          <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
        </div>
      ))}
    </>
  );
};
export default SearchMovie;
