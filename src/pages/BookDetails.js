import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const docRef = doc(db, "books", bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBook({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such book!");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };

    fetchBook();
  }, [bookId, auth]);

  const handleUpdate = async (updatedBook) => {
    try {
      const docRef = doc(db, "books", bookId);
      await updateDoc(docRef, updatedBook);
      setBook((prev) => ({ ...prev, ...updatedBook }));
      setIsEditing(false);
      console.log("Book updated!");
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "books", bookId));
      console.log("Book deleted!");
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (!book) {
    return <p className="text-center text-muted">Loading...</p>;
  }

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm">
      {!isEditing ? (
        <>
          <h2 className="text-primary">{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Subject:</strong> {book.subject}
          </p>
          <p>
            <strong>Format:</strong> {book.format}
          </p>
          <div className="d-flex gap-2 mt-3">
            <button
              className="btn btn-warning"
              onClick={() => setIsEditing(true)}
            >
              Edit Book
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Book
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/books")}
            >
              Back to List
            </button>
          </div>
        </>
      ) : (
        <BookForm
          initialData={book}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default BookDetails;
