import axios from 'axios';


export const fetchAuthors = async () => {
  const response = await axios.get('http://localhost:8000/api/authors/');
  console.log(response);
  return response.data;
};

export const fetchBooks = async () => {
  const response = await axios.get('http://localhost:8000/api/books/');
  console.log(response);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get('http://localhost:8000/api/categories/');
  console.log(response);
  return response.data;
};
