import bookstoreReducer from "./slices/bookStoreSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";



const rootReducer = combineReducers({
  bookstore: bookstoreReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
