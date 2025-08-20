import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState({});
  const [formCast, setFormCast] = useState([]);
  const [lists, setLists] = useState(["favorite", "toWatch", "watched"]);
  const [showLists, setShowLists] = useState(false);
  const [userId, setUserId] = useState(null);
  const [newListName, setNewListName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUserId(decoded.id);

      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/list/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const customListNames =
            res.data.customLists?.map((l) => l.name) || [];
          setLists(["favorite", "toWatch", "watched", ...customListNames]);
        })
        .catch((err) => console.error(err));
    } catch (e) {
      console.error("Invalid token", e);
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}`)
      .then((res) => setFormDetails(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/movies/${id}/credits`)
      .then((res) => setFormCast(res.data.cast || []))
      .catch((err) => console.error(err));
  }, [id]);

  async function addMovieToList(listName) {
    if (!userId) {
      alert("Please login first");
      return;
    }

    const token = localStorage.getItem("token");
    const movieData = {
      id: formDetails.id,
      title: formDetails.title,
      poster: formDetails.poster_path,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/list/${userId}/${listName}/add`,
        movieData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Movie added to ${listName}!`);
      setShowLists(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add movie");
    }
  }

  async function createNewList() {
    if (!newListName.trim() || !userId) return;

    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/list/new`,
        { name: newListName, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLists((prev) => [...prev, res.data.name]);
      setNewListName("");
      alert(`List "${res.data.name}" created!`);
    } catch (err) {
      console.error(err);
      alert("Failed to create list");
    }
  }

  return (
    <>
      <img
        height={100}
        width={100}
        className="poster"
        src={`https://image.tmdb.org/t/p/w185/${
          formDetails.poster_path || formDetails.backdrop_path
        }`}
        alt={formDetails.title}
      />

      <h1>{formDetails.title}</h1>
      {formDetails.genres?.map((gener) => (
        <h4 key={gener.id}>{gener.name}</h4>
      ))}
      <h2>{formDetails.overview}</h2>
      <h4>{formDetails.vote_average}</h4>

      <h1>Cast:</h1>
      <div>
        {formCast.map((actor) => (
          <h2 key={actor.id}>{actor.name}</h2>
        ))}
      </div>

      <button onClick={() => setShowLists(!showLists)}>Add to List</button>

      {showLists && (
        <div style={{ marginTop: "10px" }}>
          {lists.map((listName) => (
            <button
              key={listName}
              onClick={() => addMovieToList(listName)}
              style={{ display: "block", margin: "5px 0" }}
            >
              {listName}
            </button>
          ))}

          <div style={{ marginTop: "10px" }}>
            <input
              placeholder="New list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={createNewList}>Create List</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MovieDetails;
