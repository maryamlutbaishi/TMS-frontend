import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
function ListPage() {
  const { id } = useParams();
  const [formList, setFormList] = useState(null);
  console.log(id)
  useEffect(() => {
    const ListDetails = async () => {
      const oneList = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/list/${id}`
      );
      setFormList(oneList.data);
     
    };
    ListDetails();
  }, [id]);
  console.log(formList);
  return(
    <>
    <h1>{formList? formList.name: <p>wait</p> }<a/>List</h1>
    {formList?.movie?.map((mov)=>{
        return <a href="/movies/:id">{mov.name}</a>
    })}
    
    </>
  )
}

export default ListPage;
