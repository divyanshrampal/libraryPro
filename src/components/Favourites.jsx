import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState('');
  const [row, setRow] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from local storage
    const oldFav = localStorage.getItem('book_mania');
    const parsedFav = JSON.parse(oldFav) || [];
    setFavourites([...parsedFav]);
  }, []);

  const del = (book) => {
    const newBooks = favourites.filter((b) => b.id !== book.id);
    setFavourites(newBooks);
    localStorage.setItem('book_mania', JSON.stringify(newBooks));
  };

  let filteredBooks = favourites.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(search.toLowerCase())
  );

  const maxPage = Math.ceil(filteredBooks.length / row);
  const si = (currentPage - 1) * row;
  const ei = si + row;

  filteredBooks = filteredBooks.slice(si, ei);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <div className="flex flex-col items-center">
        {/* Search input */}
        <div className="relative text-gray-600 mt-2 w-1/2">
          <input
            type="search"
            name="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none w-full"
          />
          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M18.95 17.585l-4.352-4.352a7.5 7.5 0 1 0-1.414 1.414l4.352 4.352a1 1 0 0 0 1.414-1.414zM3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"
              />
            </svg>
          </button>
        </div>
        {/* Rows per page input */}
        <div className="mt-6 text-center">
          <label htmlFor="rowsPerPage" className="text-gray-600 font-bold mr-2">
            Rows per page:
          </label>
          <input
            id="rowsPerPage"
            placeholder="Enter number"
            value={row}
            onChange={(e) => setRow(e.target.value)}
            type="number"
            className="border border-gray-300 rounded-md p-2 text-center w-14 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="mt-6">
        {/* Book table */}
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-gray-500 font-bold uppercase bg-gray-100 border-b border-gray-300">
                Title
              </th>
              <th className="py-3 px-6 text-left text-gray-500 font-bold uppercase bg-gray-100 border-b border-gray-300">
                Author
              </th>
              <th className="py-3 px-6 text-left text-gray-500 font-bold uppercase bg-gray-100 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-100 border-b border-gray-300">
                <td className="py-4 px-6 whitespace-nowrap">{book.volumeInfo.title}</td>
                <td className="py-4 px-6 whitespace-nowrap">{book.volumeInfo.authors.map((author) => (<p>{author}</p>))}</td>
                <td className="py-4 px-6 whitespace-nowrap">
                  <button className="text-red-600 hover:text-red-900" onClick={() => del(book)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */
      <Pagination
        currentPage={currentPage}
        maxPage={maxPage}
        prevPage={prevPage}
        nextPage={nextPage}
        setCurrentPage={setCurrentPage}
      />}
    </div>
  );
}

export default Favourites;
