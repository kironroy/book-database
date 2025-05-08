import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/books">Books</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>
    </div>
  );
}
export default App;
