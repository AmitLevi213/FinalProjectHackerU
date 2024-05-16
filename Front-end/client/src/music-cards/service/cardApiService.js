import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:9191/cards";
export const getCards = async () => {
  try {
    const response = await axios.get(`${apiUrl}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getCard = async (cardId) => {
  try {
    const response = await axios.get(`${apiUrl}/${cardId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const getMyCards = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/my-cards`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const deleteCard = async (id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const { data } = await axios.post(`${apiUrl}`, card);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const updateCard = async (cardId, card) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${cardId}`, card);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};

export const changeLikeStatus = async (cardId) => {
  try {
    const { data } = await axios.patch(`${apiUrl}/${cardId}`);
    return data;
  } catch (error) {
    return Promise.reject(error.message);
  }
};
