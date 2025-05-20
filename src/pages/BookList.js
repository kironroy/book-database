import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"; // Removed query and where
import { db } from "../firebase";
import "../index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4 p-4">
      <h2 className="title has-text-primary">My Books</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="input is-primary mb-4"
        placeholder="Search by title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <ul className="box">
        {filteredBooks.map((book) => (
          <li key={book.id} className="media">
            <div className="media-content">
              <strong>{book.title}</strong> by {book.author} —{" "}
              <em>{book.subject}</em> [{book.format}]
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
