import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./ListForm.css";

const ListForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !token) {
      setError("not logged in");
      setLoading(false);
      console.log(loading);
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/list/new`,
        { name: formData.name, userId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("List created:", res.data);
      navigate("/lists");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to create");
    }
  };

  return (
    <div className="list-form-container">
      <h1>Create a list</h1>
      <form onSubmit={handleSubmit} className="list-form">
        <label htmlFor="name">List Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter list name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {error ? <p className="error">{error}</p> : null}
        <button type="submit"> creat list</button>
      </form>
    </div>
  );
};
export default ListForm;
