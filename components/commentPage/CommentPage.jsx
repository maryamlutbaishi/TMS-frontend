import React, { useState, useEffect } from "react";
import axios from "axios";
function CommentPage() {
  const [formComment, setFormComment] = useState([]);
  useEffect(() => {
    const showComment = async() => {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/`);
    setFormComment(response.data);
    };
    showComment()
  },[]);

  console.log(formComment)
  return (
    <>
      <h1>comment:</h1>
      {formComment.map((comm)=>{
        return (
            <>
            <h6>{comm.reting}</h6>
        <p>{comm.comment}</p>
    </>
    )
      })}
    </>
  );
}

export default CommentPage;
