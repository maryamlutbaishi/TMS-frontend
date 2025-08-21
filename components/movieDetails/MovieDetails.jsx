import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./MovieDetails.css";
import ReviewForm from "../reviewForm/ReviewForm";
import CommentPage from "../commentPage/CommentPage";
function MovieDetails() {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState({});
  const [formCast, setFormCast] = useState([]);
  const [lists, setLists] = useState(["favorite", "toWatch", "watched"]);
  const [showLists, setShowLists] = useState(false);
  const [userId, setUserId] = useState(null);
  // const [newListName, setNewListName] = useState("");
  const [activeTab, setActiveTab] = useState("info");
  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    const fetchUserLists = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserId(decoded.id);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/list/${decoded.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const customListNames = res.data.customLists?.map((l) => l.name) || [];
        setLists(["favorite", "toWatch", "watched", ...customListNames]);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchUserLists();
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies/${id}`
        );
        setFormDetails(res.data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies/${id}/credits`
        );
        setFormCast(res.data.cast || []);
      } catch (err) {
        console.error("Error fetching cast:", err);
      }
    };

    fetchMovieCast();
  }, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/review/${id}`
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, [id]);

  async function addMovieToList(listName) {
    if (!userId) {
      console.log("Please login first");
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
      setShowLists(false);
    } catch (err) {
      console.error(err);
      console.log("Failed to add movie");
    }
  }

  // async function createNewList() {
  //   if (!newListName.trim() || !userId) return;

  //   const token = localStorage.getItem("token");
  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/list/new`,
  //       { name: newListName, userId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log(res);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to create list");
  //   }
  // }

  return (
    <div className="movie-details-container">
      <img
        height={200}
        className="poster"
        src={`https://image.tmdb.org/t/p/w342/${
          formDetails.poster_path || formDetails.backdrop_path
        }`}
        alt={formDetails.title}
      />

      <div className="tab-buttons">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Movie Info
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      <div className="movie-content">
        {activeTab === "info" && (
          <div className="movie-info">
            <h1>{formDetails.title}</h1>
            {formDetails.genres?.map((gener) => (
              <h4 key={gener.id}>{gener.name}</h4>
            ))}
            <p>{formDetails.overview}</p>
            <h4>Rating: {formDetails.vote_average}</h4>

            <h2>Cast</h2>
            <div className="cast-list">
              {formCast.map((actor) => (
                <p key={actor.id}>{actor.name}</p>
              ))}
            </div>

            <button
              className="toggle-lists-button"
              onClick={() => setShowLists(!showLists)}
            >
              Add to List
            </button>

            {showLists && (
              <div className="list-buttons">
                {lists.map((listName) => (
                  <button
                    key={listName}
                    className="list-item-button"
                    onClick={() => addMovieToList(listName)}
                  >
                    {listName}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="reviews-section">
            <h2>Reviews</h2>
            <CommentPage />
            <ReviewForm />
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
