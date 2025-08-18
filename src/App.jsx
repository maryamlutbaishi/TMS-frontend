import { BrowserRouter as Router, Routes, Route } from "react-router";
// import { useState } from "react";

import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="lists" element={<AllLists />} />
          <Route path="search" element={<SearchMovie />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
