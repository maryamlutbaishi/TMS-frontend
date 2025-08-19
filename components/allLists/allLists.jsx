import { useState, useEffect } from "react";
import axios from "axios";
import "./allLists.css";

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
      <div className="lists-container">
        <div>
          <ul>
            {lists.map((list, index) => {
              return (
                <div className="list">
                  <p key={index}>{list.name}</p>
                </div>
              );
            })}
          </ul>
        </div>
        <div>
          <a href="lists/new">
            <button className="add-button">add</button>
          </a>
        </div>
      </div>
    </>
  );
};
export default AllLists;
