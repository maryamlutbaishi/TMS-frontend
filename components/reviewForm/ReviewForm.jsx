import React from "react";
import axios from "axios";
import { useState } from "react";
const ReviewForm = () => {
    const[formData,setFormData]=useState({
        reting:"",
        comment:"",
        mood:""
    })
    
  return (
    <form>
      <label htmlFor="reting">reting</label>
      <input id="reting" name="reting" />

      <label htmlFor="comment">comment</label>
      <input id="comment" name="comment" />

      <label htmlFor="mood">mood</label>
      <input id="mood" name="mood" />
    </form>
  );
};

export default ReviewForm;
