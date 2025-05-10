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
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Author:</label>
        <input
          type="text"
          className="form-control"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Subject:</label>
        <input
          type="text"
          className="form-control"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Format:</label>
        <select
          className="form-select"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="paperback">Paperback</option>
          <option value="hardcover">Hardcover</option>
        </select>
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
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
