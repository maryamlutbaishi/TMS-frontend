import React from "react";
// import axios from "axios";
import { useState } from "react";
import { create } from "../../lib/api";
const ReviewForm = () => {
  const [formData, setFormData] = useState({
    reting: "",
    comment: "",
    mood: "happy",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await create(formData);
    console.log(response);
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="reting">reting</label>
      <input
        id="reting"
        name="reting"
        value={formData.reting}
        onChange={handleChange}
      />

      <label htmlFor="comment">comment</label>
      <input
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
      />

      <label>
        mood:
        <select name="mood" onChange={handleChange}>
          <option value="happy">happy</option>
          <option value="sad">sad</option>
          <option value="angry">angry</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
