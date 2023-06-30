import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import {add ,remove} from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

function Books() {
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${page}&maxResults=10`
        );
        setBooks(response.data.items);
        setLoading(false);

        // it runs everytime page reloads
        let oldFav = localStorage.getItem("book_mania");
        oldFav = JSON.parse(oldFav) || [];
        setFavourites([...oldFav]);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (search !== '') {
      fetchBooks();
    } else {
      setBooks([]);
    }
  }, [search, page]);

  function nextPage() {
    setPage(page + 10);
  }

  function prevPage() {
    if (page > 10) setPage(page - 10);
  }

  const handleSearch = () => {
    setPage(1);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const filteredBooks = books.filter((book) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'title') {
      return book.volumeInfo.title.toLowerCase().includes(search.toLowerCase());
    } else if (filter === 'author') {
      return book.volumeInfo.authors?.some((author) =>
        author.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filter === 'subject') {
      return book.volumeInfo.categories?.some((category) =>
        category.toLowerCase().includes(search.toLowerCase())
      );
    } else if (filter === 'publish-date') {
      return book.volumeInfo.publishedDate?.includes(search);
    }
    return true;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'relevance') {
      return 0; // Maintain the original order
    } else if (sortBy === 'title-asc') {
      return a.volumeInfo.title.localeCompare(b.volumeInfo.title);
    } else if (sortBy === 'title-desc') {
      return b.volumeInfo.title.localeCompare(a.volumeInfo.title);
    } else if (sortBy === 'author-asc') {
      return (
        a.volumeInfo.authors?.[0]?.localeCompare(b.volumeInfo.authors?.[0]) || 0
      );
    } else if (sortBy === 'author-desc') {
      return (
        b.volumeInfo.authors?.[0]?.localeCompare(a.volumeInfo.authors?.[0]) || 0
      );
    } else if (sortBy === 'publish-date-asc') {
      return (
        a.volumeInfo.publishedDate?.localeCompare(b.volumeInfo.publishedDate) ||
        0
      );
    } else if (sortBy === 'publish-date-desc') {
      return (
        b.volumeInfo.publishedDate?.localeCompare(a.volumeInfo.publishedDate) ||
        0
      );
    }
    return 0;
  });

  const [favourites, setFavourites] = useState([]);

  const addToFav = (book) => {
    let newBooks = [...favourites, book];
    setFavourites([...newBooks]);
    localStorage.setItem("book_mania", JSON.stringify(newBooks));
  };
  
  const del = (book) => {
    let newBooks = favourites.filter((b) => b.id !== book.id);
    setFavourites([...newBooks]);
    localStorage.setItem("book_mania", JSON.stringify(newBooks));
  };
  

  const {cart} = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = (book) => {
    dispatch(add(book));
    toast.success("Item added to Cart");
  }

  const removeFromCart = (book) => {
    dispatch(remove(book.id));
    toast.error("Item removed from Cart");
  }

  const MAX_TITLE_LENGTH = 25;  

  return (
    <div className='flex flex-col items-center'>
      <div className='relative flex justify-center text-gray-600 mt-2 w-1/2'>
      <input
        type="text"
        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
        <button
          type='submit'
          className='absolute right-0 top-0 mt-3 mr-4'
          onClick={handleSearch}
        >
          <svg
            className='text-gray-600 h-4 w-4 fill-current'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
          >
            <path d='M18.95 17.585l-4.352-4.352a7.5 7.5 0 1 0-1.414 1.414l4.352 4.352a1 1 0 0 0 1.414-1.414zM3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z' />
          </svg>
        </button>
      </div>
      {search !== '' && (
        <div className='mt-8 mb-8 font-bold text-2xl text-center'>
          {search} Books
        </div>
      )}
      {loading ? (
        <div className='flex justify-center mt-5'>
          <Oval
            height='80'
            width='80'
            radius='9'
            color='green'
            ariaLabel='loading'
            wrapperStyle
            wrapperClass
          />
        </div>
      ) : (
        <div className='flex flex-wrap justify-center'>
          {sortedBooks.map((book) => (
  <div
    className='w-72 h-[400px] bg-gray-800 rounded-lg overflow-hidden m-4 hover:shadow-xl'
    key={book.id}
  >
    <div
      className='w-full h-[200px] bg-center bg-cover'
      style={{
        backgroundImage: `url(${book.volumeInfo.imageLinks?.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    ></div>
    <div className='p-4 h-1/2 flex flex-col justify-between'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-white text-lg font-medium w-40'>
          {book.volumeInfo.title.length > MAX_TITLE_LENGTH
            ? book.volumeInfo.title.substring(0, MAX_TITLE_LENGTH) + "..."
            : book.volumeInfo.title}
        </h2>
        {!favourites.find((b) => b.id === book.id) ? (
          <button
            className="add-to-favorites"
            onClick={() => addToFav(book)}
          >
            <p className="text-5xl text-red-700">♡</p>
          </button>
        ) : (
          <button
            className="remove-from-favorites"
            onClick={() => del(book)}
          >
            <p className="text-5xl text-red-700">♥</p>
          </button>
        )}
      </div>
      <div className='mb-3'>
        <NavLink
          className='block text-center bg-blue-500 hover:bg-red-600 text-white font-semibold py-2 mt-2 rounded'
          to={`/detail/${book.id}`}
        >
          View Details
        </NavLink>
        {
  cart.some((p) => p.id === book.id) ? (
    <button
      className="block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 mt-2 rounded w-full"
      onClick={() => removeFromCart(book)}
    >
      Remove from Bag
    </button>
  ) : (
    <button
      className="block text-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 mt-2 rounded w-full"
      onClick={() => addToCart(book)}
    >
      Add to Bag
    </button>
  )
}


      </div>
    </div>
  </div>
))}

        </div>
      )}
      <div className='flex flex-wrap items-center justify-center mt-4'>
        <label className='mr-2'>Filter By:</label>
        <select
          className='border border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none'
          value={filter}
          onChange={handleFilterChange}
        >
          <option value='all'>All</option>
          <option value='title'>Title</option>
          <option value='author'>Author</option>
          <option value='subject'>Subject</option>
          <option value='publish-date'>Publish Date</option>
        </select>
        <label className='ml-4 mr-2'>Sort By:</label>
        <select
          className='border border-gray-300 bg-white h-10 px-5 rounded-full text-sm focus:outline-none'
          value={sortBy}
          onChange={handleSortByChange}
        >
          <option value='relevance'>Relevance</option>
          <option value='title-asc'>Title (A - Z)</option>
          <option value='title-desc'>Title (Z - A)</option>
          <option value='author-asc'>Author (A - Z)</option>
          <option value='author-desc'>Author (Z - A)</option>
          <option value='publish-date-asc'>Publish Date (Asc)</option>
          <option value='publish-date-desc'>Publish Date (Desc)</option>
        </select>
      </div>
      <div className='flex justify-center mt-4'>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-l'
          onClick={prevPage}
          disabled={page <= 10}
        >
          Previous
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r'
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Books;
