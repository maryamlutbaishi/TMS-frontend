import React from "react";
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
    <div className="list-form-container">
      <form onSubmit={handleSubmit}>
        <h1>shere your review</h1>

        <label htmlFor="reting" className="formLabel">
          rating
        </label>

        <div className="form input">
          <input
            id="reting"
            name="reting"
            value={formData.reting}
            onChange={handleChange}
          />
        </div>

        <label htmlFor="comment" className="formLabel">
          comment
        </label>
        <div className="form input">
          <input
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReviewForm;
