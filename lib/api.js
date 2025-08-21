import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;

const createList = async (data) => {
  try {
    const url = `${URL}/list/new`;
    const result = await axios.post(url, data);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const create = async (data) => {
  try {
    const url = `${URL}/review/new`;
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    return error;
  }
};
const deleteList = async (id) => {
  try {
    const response = await axios.delete(`${URL}/list/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

//list

export { createList, create, deleteList };
