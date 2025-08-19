import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router";
// import { useState } from "react";

import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";
import ReviewForm from "../components/reviewForm/ReviewForm";
import ListForm from "../components/listForm/listForm";
import MovieDetails from "../components/movieDetails/MovieDetails";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/review" element={<ReviewForm />} />
          <Route path="lists" element={<AllLists />} />
          <Route path="search" element={<SearchMovie />} />
          <Route path="lists/new" element={<ListForm />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
