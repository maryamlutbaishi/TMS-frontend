import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";

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
import LogoutButton from "../components/auth/logoutButton";
import Layout from "../components/general/layout";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  let user = null;

  function handleLogin(newToken) {
    setToken(newToken);
  }

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      user = decodedToken;
      console.log(decodedToken);
    } catch (err) {
      console.error("Invalid token", err);
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout user={user} />}>
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchMovie />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lists"
            element={
              <ProtectedRoute>
                <AllLists />
              </ProtectedRoute>
            }
          />
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <ReviewForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="lists/new"
            element={
              <ProtectedRoute>
                <ListForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
