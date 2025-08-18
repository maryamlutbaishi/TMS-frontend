import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

//search

// const search = async (data) =>{
//     try {
//         const response = await axios.get(`${URL}/search`)
//     } catch (error) {
//         console.log(error)
//     }
// }

const createList = async (data) => {
  try {
    const result = await axios.post(`${URL}/list/new`, data);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//list

export { createList };
