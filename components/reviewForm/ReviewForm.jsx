import React from "react";
import axios from "axios";
import { useState } from "react";
import { create } from "../../lib/api";
import "./reviewForm.css"
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
      <h1>shere your review</h1>
      
      <label htmlFor="reting" className="formLabel" >reting</label>
      <div className="form input">
      <input
        id="reting"
        name="reting"
        value={formData.reting}
        onChange={handleChange}
      />
      </div>

      <label htmlFor="comment" className="formLabel">comment</label>
      <div className="form input">
      <input
        id="comment"
        name="comment"
        value={formData.comment}
        onChange={handleChange}
      />
      </div>

      <label className="formLabel">
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
