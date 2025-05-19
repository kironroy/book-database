import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import "../index.css";

function AddBook() {
  const navigate = useNavigate();

  const handleAdd = async (newBook) => {
    try {
      await addDoc(collection(db, "books"), newBook);
      console.log("Book added!");
      navigate("/"); // Redirect to BookList
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="container p-4 box">
      <h3 className="title has-text-grey-dark">Add a New Book</h3>
      <BookForm onSubmit={handleAdd} />

      <button
        className="button is-link back-books-btn"
        onClick={() => navigate("/")}
      >
        Back to My Books
      </button>
    </div>
  );
}

export default AddBook;
