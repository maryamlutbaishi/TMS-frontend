import { useState } from "react";
import { useNavigate } from "react-router";
import { createList } from "../../lib/api";

const ListForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await createList(formData);
    console.log(response);
  };
  return (
    <>
      <h1>create a list</h1>
      <form onSubmit={handleSubmit}>
        <lable htmlFor="name">name: </lable>
        <input
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
        <button type="submit" onClick={() => navigate(-1)}>
          create
        </button>
      </form>
    </>
  );
};
export default ListForm;
