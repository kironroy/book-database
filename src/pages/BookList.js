import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import auth
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "bootstrap/dist/css/bootstrap.min.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login"); // Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksRef = collection(db, "books");
      const snapshot = await getDocs(booksRef);
      setBooks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    fetchBooks();
  }, []);

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm">
      <h2 className="text-primary">My Books</h2>
      <ul className="list-group mb-4">
        {books.map((book) => (
          <li key={book.id} className="list-group-item">
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
