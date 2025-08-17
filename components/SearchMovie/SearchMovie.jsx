import { useState } from "react";

const SearchMovie = () => {
  const [searchData, setSearchData] = useState("");

  const handleChange = () => {
    console.log("works");
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
