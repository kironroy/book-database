import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
    <div className="container mt-4 p-4 border rounded shadow-sm" style={{ paddingBottom: "3rem" }}>
      <h3 className="text-secondary">Add a New Book</h3>
      <BookForm onSubmit={handleAdd} />
      <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>
        Back to My Books
      </button>
      <div style={{ height: "3rem" }}></div>
    </div>
  );
}

export default AddBook;
