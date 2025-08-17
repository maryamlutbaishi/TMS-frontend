import { useState } from "react";

const SearchMovie = () => {
  const [searchData, setSearchData] = useState("");

  const handleChange = (event) => {
    console.log("works");
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <input
        type="text"
        id="query"
        name="query"
        placeholder="search for a movie"
        onChange={handleChange}
      />
    </>
  );
};
export default SearchMovie;
