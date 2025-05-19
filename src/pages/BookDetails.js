import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  getFirestore,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import BookForm from "../components/BookForm";
import "../index.css";

const firestoreDb = getFirestore(); // Initialize Firestore

function BookDetails() {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, "books", bookId);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.exists() ? docSnap.data() : "No such book!");

      if (docSnap.exists()) {
        setBook({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchBook();
  }, [bookId]);

  // Debugging Firestore access with KNOWN_DOCUMENT_ID
  useEffect(() => {
    const testDocRef = doc(firestoreDb, "books", "KNOWN_DOCUMENT_ID");
    getDoc(testDocRef).then((docSnap) =>
      console.log(docSnap.exists() ? docSnap.data() : "No such book!")
    );
  }, []);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) {
      return; // If the user cancels, exit the function
    }

    try {
      await deleteDoc(doc(db, "books", bookId));
      console.log("Book deleted!");
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  if (!book) {
    return (
      <div className="has-text-centered has-text-grey-light">
        <p>Loading...</p>
        <p>If this takes too long, try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="container p-4 box">
      {!isEditing ? (
        <>
          <h2 className="title has-text-primary">{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Subject:</strong> {book.subject}
          </p>
          <p>
            <strong>Format:</strong> {book.format}
          </p>

          {/* Buttons */}
          <div className="buttons mt-4">
            <button
              className="button is-warning is-fullwidth"
              onClick={() => setIsEditing(true)}
            >
              Edit Book
            </button>
            <button
              className="button is-danger is-fullwidth"
              onClick={handleDelete}
            >
              Delete Book
            </button>
            <button
              className="button is-link is-fullwidth"
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
