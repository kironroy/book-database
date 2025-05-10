import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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

  const handleAdd = async (newBook) => {
    try {
      await addDoc(collection(db, "books"), newBook);
      setBooks((prevBooks) => [
        ...prevBooks,
        { id: new Date().getTime(), ...newBook },
      ]); // Temporary ID until refresh
      console.log("Book added!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      await deleteDoc(doc(db, "books", bookId));
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      console.log("Book deleted!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm">
      <h2 className="text-primary">My Books</h2>
      <ul className="list-group mb-4">
        {books.map((book) => (
          <li
            key={book.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{book.title}</strong> by {book.author} —{" "}
              <em>{book.subject}</em> [{book.format}]
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-info btn-sm"
                onClick={() => navigate(`/books/${book.id}`)}
              >
                View Details
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <h3 className="text-secondary">Add a New Book</h3>
      <BookForm onSubmit={handleAdd} />
    </div>
  );
}

export default BookList;
