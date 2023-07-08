import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookstoreData, addToCart, selectFilteredBooks, } from "../redux/slices/bookStoreSlice";
import SearchBar from "./SearchBar";
import { toast } from "react-hot-toast";

const BookListing = () => {
  const dispatch = useDispatch();
  const filteredBooks = useSelector(selectFilteredBooks);
  const { authors, categories } = useSelector((state) => state.bookstore);  
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchResults = (data) => {
    setSearchResults(data);
    console.log(`blisting ${searchResults}`)
    setLoading(false);
    console.log(`blist` + loading)
  };


  useEffect(() => {
    dispatch(fetchBookstoreData());
  }, [dispatch]);

  const handleAddToCart = (bookId) => {
    toast.success("Added to cart");
  };


  
  return (
    <div className="w-full flex flex-wrap justify-center">


      <SearchBar authors={authors} categories={categories} onSearchResults={handleSearchResults}  onloading={setLoading}/>
      
      {
        searchResults.length > 0 && filteredBooks < 0 ? (
          <div className="flex flex-wrap gap-10 p-10 justify-center transition-all">
            {
              searchResults.map((book, id) => {
                return(
                  <div className="mt-5 mx-w-[280px] mx-h-[320px] border p-3 rounded-xl hover:shadow-2xl bg-white" key={id}>
                    <img className="mx-auto" src="" alt="" height={220} width={200}/>
                      <h1 className="text-3xl">{book.title}</h1>
                      <p className="font-light">{book.description}</p>
                      <p className="">Rs {book.price}/-</p>
                      <div>
                        <button className=" border p-2 mt-2 rounded-md bg-violet-600 text-white hover:outline-none" onClick={() => handleAddToCart(book.id)}>Add To Cart</button>
                      </div>
                  </div>
                );
              })
            }
          </div>
        ) : (
          <div className="flex flex-wrap gap-10 p-10 justify-center transition-all">
          {
            filteredBooks.map((book, id) => {
              return(
                <div className="mt-5 mx-w-[280px] mx-h-[320px] border p-3 rounded-xl hover:shadow-2xl bg-white" key={id}>
                  <img className="mx-auto" src="" alt="" height={220} width={200}/>
                    <h1 className="text-3xl">{book.title}</h1>
                    <p className="font-light">{book.description}</p>
                    <p className="">Rs {book.price}/-</p>
                    <div>
                      <button className=" border p-2 mt-2 rounded-md bg-violet-600 text-white hover:outline-none" onClick={() => handleAddToCart(book.id)}>Add To Cart</button>
                    </div>
                </div>
              );
            })
          }
          </div>
        )
      }
      

    </div>
  );
};

export default BookListing;
