import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = collection(db, "books");
        const snapshot = await getDocs(booksRef);
        const booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4 p-4">
      <h2 className="title has-text-primary">My Books</h2>
      <ul className="box">
        {books.map((book) => (
          <li key={book.id} className="media">
            <div className="media-content">
              <strong>{book.title}</strong> by {book.author} —{" "}
              <em>{book.subject}</em> [{book.format}]
              {/* Buttons moved here to ensure they appear below each book */}
              <div className="buttons mt-2">
                <button
                  className="button is-info book-btn"
                  onClick={() => navigate(`/books/${book.id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Button to Navigate to Add Book Page */}
      <button
        className="button is-primary add-book-btn"
        onClick={() => navigate("/add-book")}
      >
        Add a New Book
      </button>
    </div>
  );
}

export default BookList;
