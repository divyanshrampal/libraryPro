import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import DOMPurify from 'dompurify';

const Detail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`).then((res) => {
      console.log(res.data);
      setBook(res.data);
    });
  }, []);

  const stars = [];
  const averageRating = book.volumeInfo?.averageRating || 0;
  const roundedRating = Math.round(averageRating * 2) / 2;

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(<IoStar key={i} className="text-yellow-500 text-2xl inline-block mr-1" />);
    } else if (i === roundedRating + 0.5) {
      stars.push(<IoStarHalf key={i} className="text-yellow-500 text-2xl inline-block mr-1" />);
    } else {
      stars.push(<IoStarOutline key={i} className="text-gray-400 text-2xl inline-block mr-1" />);
    }
  }

  const bookDescription = DOMPurify.sanitize(book.volumeInfo?.description || '');

  return (
    <div className="h-[80vh] overscroll-none m-8">
      <div className="max-w-4xl mx-auto py-8">
        <div className="flex flex-col md:flex-row items-center">
          {/* book Poster */}
          <div className="md:w-1/3">
            <img
              src={`${book.volumeInfo?.imageLinks?.large || book.volumeInfo?.imageLinks?.small}`}
              alt={`${book.volumeInfo?.title} poster`}
              className="rounded-lg shadow-md"
            />
          </div>
          {/* book Info */}
          <div className="md:w-2/3 md:ml-8">
            {/* book Title */}
            <h1 className="text-3xl font-bold mb-2 mt-2">{book.volumeInfo?.title}</h1>
            {/* book Rating */}
            <div className="flex items-center mb-4">
              <span className="py-1 mt-5 mb-2 text-lg">Rating: </span>
              <div className="flex">{stars}</div>
            </div>
            {/* book Published Year */}
            <div className="mb-4">
              <span className="py-1 mt-3 mb-2 text-lg">
                Published Year: {new Date(book.volumeInfo?.publishedDate).getFullYear()}
              </span>
            </div>
            {/* book Description */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Overview</h2>
            <p className="text-lg leading-relaxed mb-4 text-justify">
              {bookDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
