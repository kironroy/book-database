import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [bookCount, setBookCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
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

        // **Sort books alphabetically by title**
        booksData.sort((a, b) => a.title.localeCompare(b.title));

        setBooks(booksData);
        setBookCount(booksData.length); // Set total number of books
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4 p-4">
      <h2 className="title has-text-primary">My Books ({bookCount})</h2>{" "}
      {/* Display total books */}
      {/* Search Bar */}
      <input
        type="text"
        className="input is-primary mb-4"
        placeholder="🔍 Search by subject, title or author..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {/* Add a New Book Button */}
      <button
        className="button is-primary add-book-btn mb-4"
        onClick={() => navigate("/add-book")}
      >
        Add a New Book
      </button>
      {/* Sorted Book List */}
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
    </div>
  );
}

export default BookList;
