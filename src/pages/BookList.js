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
    <div className="container">
      <h2>My Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} —{" "}
            <em>{book.subject}</em> [{book.format}]
            <br />
            <button onClick={() => navigate(`/books/${book.id}`)}>
              View Details
            </button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>Add a New Book</h3>
      <BookForm onSubmit={handleAdd} />
    </div>
  );
}

export default BookList;
