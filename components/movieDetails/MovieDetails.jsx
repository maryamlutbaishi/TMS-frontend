import React from "react";
import { useState ,useEffect  } from "react";
import { useParams } from "react-router";
import axios from "axios";

function MovieDetails() {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  useEffect(() => {
   
    const getMovieDetails = async () => {
      try {
        const foundMovie = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/movies/${id}`
        );
        setFormDetails(foundMovie.data);
        console.log(foundMovie.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovieDetails()
  },[id]);
}

export default MovieDetails;
