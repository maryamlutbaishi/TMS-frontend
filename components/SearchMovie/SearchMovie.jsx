import { useState } from "react";
import axios from "axios";

const SearchMovie = () => {
  const [searchData, setSearchData] = useState({});

  const handleChange = async (event) => {
    console.log("works");
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
    console.log(searchData);
    const foundMovies = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/movies/search`,
      { params: { query: event.target.value } }
    );
    console.log(foundMovies.data);
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
    </>
  );
};
export default SearchMovie;
