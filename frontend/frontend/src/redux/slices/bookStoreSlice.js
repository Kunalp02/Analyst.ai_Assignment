import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthors, fetchBooks, fetchCategories } from "../../services/api";
import { createSlice } from "@reduxjs/toolkit";


export const fetchBookstoreData = createAsyncThunk('bookstore/fetchData', async () => {
    try {
      const authors = await fetchAuthors();
      const books = await fetchBooks();
      const categories = await fetchCategories();
  
      return { authors, books, categories };
    } catch (error) {
      console.error('Error fetching bookstore data:', error);
    }
  });
  

  

const bookstoreSlice = createSlice({
  name: 'bookstore',
  initialState: {
    authors: [],
    books: [],
    categories: [],
    cart: [],
    filterAuthor: null,
    filterCategory: null,
  },
  reducers: {
    addToCart(state, action) {
      const bookId = action.payload;
      state.cart.push(bookId);
    },
    setFilterAuthor: (state, action) => {
      state.filterAuthor = action.payload;
    
    },
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBookstoreData.fulfilled, (state, action) => {
      const { authors, books, categories } = action.payload;
      state.authors = authors;
      state.books = books;
      state.categories = categories;
    });
  },
});


export const selectFilteredBooks = (state) => {
  const { books, filterAuthor, filterCategory } = state.bookstore;
  console.log(books, filterAuthor, filterCategory)
  if (!filterAuthor && !filterCategory) {
    return books;
  }

  return books.filter((book) => {
    console.log(`printing book  ${book}` )
    const authorMatches = !filterAuthor || book.author.name === filterAuthor;
    console.log(book.author.name, filterAuthor, authorMatches)

    const categoryMatches = !filterCategory || book.categories.some(category => category.name === filterCategory);
    console.log(filterCategory, categoryMatches)

    return authorMatches && categoryMatches;
  });
};

export const { addToCart, setFilterAuthor, setFilterCategory } = bookstoreSlice.actions;
export default bookstoreSlice.reducer;
