import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import "./allLists.css";

const AllLists = () => {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();

  const getAllLists = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.id;

      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/list/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const defaultLists = [
        { name: "Favorites", movie: result.data.favorite },
        { name: "To Watch", movie: result.data.toWatch },
        { name: "Watched", movie: result.data.watched },
      ];

      setLists([...defaultLists, ...result.data.customLists]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllLists();
  }, []);

  return (
    <div className="lists-container">
      {lists.length === 0 ? (
        <p>No lists found. Create one!</p>
      ) : (
        lists.map((list, index) => (
          <div key={index} className="list">
            <h3>{list.name}</h3>
            <div className="movies">
              {list.movie.length > 0 ? (
                list.movie.map((movie) => (
                  <div
                    key={movie.id}
                    className="one-movie"
                    onClick={() => navigate(`/movies/${movie.id}`)}
                  >
                    <img
                      className="poster"
                      src={`https://image.tmdb.org/t/p/w185/${movie.poster}`}
                    />
                    <p>{movie.title}</p>
                    {/** test delete button */}
                  </div>
                ))
              ) : (
                <p className="empty-list">No movies in this list.</p>
              )}
            </div>
          </div>
        ))
      )}

      <button className="add-button" onClick={() => navigate("/lists/new")}>
        +
      </button>
    </div>
  );
};

export default AllLists;
