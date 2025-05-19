import { useState } from "react";
import "../index.css";


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
    <form onSubmit={handleSubmit} className="box">
      <div className="field">
        <label className="label">Title:</label>
        <div className="control">
          <input
            type="text"
            className="input is-large"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Author:</label>
        <div className="control">
          <input
            type="text"
            className="input is-large"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Subject:</label>
        <div className="control">
          <input
            type="text"
            className="input is-large"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Format:</label>
        <div className="control">
          <div className="select is-large">
            <select value={format} onChange={(e) => setFormat(e.target.value)}>
              <option value="paperback">Paperback</option>
              <option value="hardcover">Hardcover</option>
            </select>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons mt-4">
        <button type="submit" className="button is-primary is-large">
          Save
        </button>
        {onCancel && (
          <button
            type="button"
            className="button is-light is-large"
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