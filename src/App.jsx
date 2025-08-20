import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router";
// import { useState } from "react";

import LoginForm from "../components/auth/loginForm";
import SignUp from "../components/auth/signupForm";
import SearchMovie from "../components/SearchMovie/SearchMovie";
import AllLists from "../components/allLists/allLists";
import ReviewForm from "../components/reviewForm/ReviewForm";
import ListForm from "../components/listForm/listForm";
import MovieDetails from "../components/movieDetails/MovieDetails";
import CommentPage from "../components/commentPage/CommentPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import ListPage from "../components/list/listPage";
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  function handleLogin(newToken) {
    setToken(newToken);
  }
  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
  }
  return (
    <>
      <Router>
        {token ? <LogoutButton onLogout={handleLogout} /> : null}
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <ReviewForm />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="lists"
            element={
              <ProtectedRoute>
                {" "}
                <AllLists />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              // <ProtectedRoute>
              <SearchMovie />
              // </ProtectedRoute>
            }
          />
          <Route
            path="lists/new"
            element={
              <ProtectedRoute>
                <ListForm />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              // <ProtectedRoute>
              <MovieDetails />
              // </ProtectedRoute>
            }
          />
          <Route
            path="/movie/comment"
            element={
              <ProtectedRoute>
                <CommentPage />
              </ProtectedRoute>
            }
          />

          <Route path="/list/:id" element={<ListPage />} />
        </Routes>
      </Router>
    </>
  );
};
export default App;
