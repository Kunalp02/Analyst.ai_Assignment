import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterAuthor, setFilterCategory } from "../redux/slices/bookStoreSlice";


const SearchBar = ({ authors, categories, onSearchResults }) => {
  const dispatch = useDispatch();
  const { filterAuthor, filterCategory } = useSelector((state) => state.bookstore);
  const [searchTitle, setSearchTitle] = useState('');
  const [loading, setLoading ] = useState(false);

  async function searchTitleFunction() {
    const response = await fetch(`http://localhost:8000/books/search/?title=${searchTitle}`);
    const data = await response.json();
    console.log(data);
    onSearchResults(data); 
  }


  useEffect(() => {
    console.log(searchTitle);
    setLoading(true);
    console.log(`sbar` + loading)
    searchTitleFunction();
  }, [searchTitle]);

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  
  const handleAuthorChange = (e) => {
    const author = e.target.value;
    dispatch(setFilterAuthor(author));
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    dispatch(setFilterCategory(category));
  };

  return (
    <div className="w-full bg-white flex bg-slate-700 flex flex-wrap justify-center align-center">
      <div className="m-3">
        <input onChange={handleSearchTitleChange}  type="search" placeholder="Search Book" className="p-2 rounded-xl focus:outline-none bg-slate-200" />
      
        <select className="ml-2 p-2 rounded-lg focus:outline-none" onChange={handleAuthorChange} value={filterAuthor}>
          <option value="">All Authors</option>
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        
        <select className="ml-2 p-2 rounded-lg focus:outline-none" onChange={handleCategoryChange} value={filterCategory}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
