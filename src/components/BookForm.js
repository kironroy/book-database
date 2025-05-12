import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function BookForm({ initialData = {}, onSubmit, onCancel }) {
  // Form state variables
  const [title, setTitle] = useState(initialData.title || "");
  const [author, setAuthor] = useState(initialData.author || "");
  const [subject, setSubject] = useState(initialData.subject || "");
  const [format, setFormat] = useState(initialData.format || "paperback");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const bookData = { title, author, subject, format };
    onSubmit(bookData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 border rounded shadow-sm"
    >
      <div className="mb-3">
        <label className="form-label fs-5">Title:</label>
        <input
          type="text"
          className="form-control form-control-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fs-5">Author:</label>
        <input
          type="text"
          className="form-control form-control-lg"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label fs-5">Subject:</label>
        <input
          type="text"
          className="form-control form-control-lg"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label fs-5">Format:</label>
        <select
          className="form-select form-select-lg"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="paperback">Paperback</option>
          <option value="hardcover">Hardcover</option>
        </select>
      </div>
      {/* Buttons stack on mobile, stay inline on larger screens */}
      <div className="d-grid gap-3 d-md-flex mt-3">
        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 w-md-auto"
        >
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary btn-lg w-100 w-md-auto"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookForm;
