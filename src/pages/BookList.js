import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCount, setFilteredCount] = useState(0); // New state for search results count
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksRef = collection(db, "books");
        const snapshot = await getDocs(booksRef);
        let booksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        booksData.sort((a, b) => a.title.localeCompare(b.title));

        setBooks(booksData);
        setBookCount(booksData.length); // Set total number of books
        setFilteredCount(booksData.length); // Initialize filtered count
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    setFilteredCount(
      books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ).length
    );
  }, [searchQuery, books]);

  return (
    <div className="container mt-4 p-4">
      <h2 className="title has-text-primary">
        My Books ({filteredCount}/{bookCount})
      </h2>{" "}
      {/* Display filtered results count */}
      <input
        type="text"
        className="input is-primary mb-4"
        placeholder="🔍 Search by subject, title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        className="button is-primary add-book-btn mb-4"
        onClick={() => navigate("/add-book")}
      >
        Add a New Book
      </button>
      <ul className="box">
        {books
          .filter(
            (book) =>
              book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
              book.subject.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((book) => (
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
    </div>
  );
}

export default BookList;
