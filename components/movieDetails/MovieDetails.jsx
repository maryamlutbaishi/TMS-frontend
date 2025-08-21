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
  const [activeTab, setActiveTab] = useState("info");
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/review/${id}`)
      .then((res) => setReviews(res.data))
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
      {/* Movie poster */}
      <img
        height={200}
        className="poster"
        src={`https://image.tmdb.org/t/p/w342/${
          formDetails.poster_path || formDetails.backdrop_path
        }`}
        alt={formDetails.title}
      />

      {/* NAV */}
      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <button
          style={{
            fontWeight: activeTab === "info" ? "bold" : "normal",
          }}
          onClick={() => setActiveTab("info")}
        >
          Movie Info
        </button>
        <button
          style={{
            fontWeight: activeTab === "reviews" ? "bold" : "normal",
          }}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* CONTENT AREA */}
      <div style={{ marginTop: "20px" }}>
        {activeTab === "info" && (
          <>
            <h1>{formDetails.title}</h1>
            {formDetails.genres?.map((gener) => (
              <h4 key={gener.id}>{gener.name}</h4>
            ))}
            <p>{formDetails.overview}</p>
            <h4>Rating: {formDetails.vote_average}</h4>

            <h2>Cast</h2>
            <div>
              {formCast.map((actor) => (
                <p key={actor.id}>{actor.name}</p>
              ))}
            </div>

            <button onClick={() => setShowLists(!showLists)}>
              Add to List
            </button>
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
        )}

        {activeTab === "reviews" && (
          <div>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
              reviews.map((r, i) => (
                <div
                  key={i}
                  style={{ borderBottom: "1px solid #ddd", padding: "10px" }}
                >
                  <p>
                    <b>Rating:</b> {r.rating}
                  </p>
                  <p>{r.comment}</p>
                  {r.mood && (
                    <p>
                      <i>Mood: {r.mood}</i>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetails;
