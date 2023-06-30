import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://www.googleapis.com/books/v1/volumes?q=javascript' // Replace with your desired search query or API endpoint
        );
        setBooks(response.data.items);
      } catch (error) {
        console.log('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Calculate pagination indexes
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Library Management</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentBooks.map((book) => (
          <div className="bg-white shadow-md rounded-md p-4 flex flex-col items-center" key={book.id}>
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-32 h-48 object-cover mb-4"
              />
            )}
            <div>
              <h3 className="text-lg font-bold mb-2">{book.volumeInfo.title}</h3>
              <p className="text-sm text-gray-600">
                Author: {book.volumeInfo.authors && book.volumeInfo.authors.join(', ')}
              </p>
              {/* Render other book details */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <nav className="pagination">
          {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, index) => (
            <button
              key={index}
              className={`pagination-item ${index + 1 === currentPage ? 'active' : ''}`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BookList />
    </div>
  );
};

export default App;
 