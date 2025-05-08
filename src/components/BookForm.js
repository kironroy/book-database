import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div>
        <label>Format:</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="paperback">Paperback</option>
          <option value="hardcover">Hardcover</option>
        </select>
      </div>
      <button type="submit">Save</button>
      {onCancel && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default BookForm;
