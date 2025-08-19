import { BrowserRouter as Router, Routes, Route } from "react-router";
// import { useState } from "react";

import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";
import ReviewForm from "../components/reviewForm/ReviewForm";
import ListForm from "../components/listForm/listForm";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/review" element={<ReviewForm />} />
          <Route path="lists" element={<AllLists />} />
          <Route path="search" element={<SearchMovie />} />
          <Route path="lists/new" element={<ListForm />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
