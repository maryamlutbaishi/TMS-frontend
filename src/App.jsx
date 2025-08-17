import { useState } from "react";

import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";

const App = () => {
  return (
    <>
      <SearchMovie />
      <AllLists />
    </>
  );
};
export default App;
