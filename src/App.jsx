import { BrowserRouter as Router, Routes, Route } from "react-router";
// import { useState } from "react";

import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";
import ListForm from "../components/listForm/listForm";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="lists" element={<AllLists />} />
          <Route path="search" element={<SearchMovie />} />
          <Route path="lists/new" element={<ListForm />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
