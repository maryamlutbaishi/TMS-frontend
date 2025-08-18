import { useState, useEffect } from "react";
import axios from "axios";

const AllLists = () => {
  const [lists, setLists] = useState([]);
  const getAllLists = async () => {
    const result = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/list`);
    setLists(result.data);
  };
  useEffect(() => {
    getAllLists();
  }, []);
  return (
    <>
      <ul>
        {lists.map((list, index) => {
          return <p key={index}>{list.name}</p>;
        })}
      </ul>
      <a href="lists/new">
        <button>add</button>
      </a>
    </>
  );
};
export default AllLists;
