import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState([]);
  const [formCast, setFormCast] = useState([]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const foundMovie = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies/${id}`
        );
        console.log(foundMovie.data);

        setFormDetails(foundMovie.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieDetails();
  }, [id]);
  console.log(formDetails);
  useEffect(() => {
    const movieCast = async () => {
      try {
        const foundCast = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies/${id}/credits`
        );

        setFormCast(foundCast.data);
        console.log("Found Cast: ", foundCast);
      } catch (err) {
        console.log(err);
      }
    };
    movieCast();
  }, [id]);
  console.log(formCast);

  async function addMovie() {
    const movieData = {
      id: formDetails.id,
      title: formDetails.title,
      poster: formDetails.poster_path,
    };
    const addedMovie = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/movies/add`,
      movieData
    );
  }

  return (
    <>
      <img
        height={100}
        width={100}
        className="poster"
        src={`https://image.tmdb.org/t/p/w185/${
          formDetails.poster_path
            ? formDetails.poster_path
            : formDetails.backdrop_path
        }`}
      ></img>

      <h1>{formDetails.title}</h1>
      {formDetails?.genres?.map((gener) => {
        return <h4>{gener.name}</h4>;
      })}
      <h2>{formDetails.overview}</h2>
      <h4>{formDetails.vote_average}</h4>
      <h1>cast:</h1>
      <div>
        {formCast?.cast?.map((actor) => {
          return <h2>{actor.name}</h2>;
        })}
      </div>
      <button>like</button>
      <button onClick={addMovie}>add to list</button>
    </>
  );
}

export default MovieDetails;
