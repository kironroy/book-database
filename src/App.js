import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Required for dropdowns & collapsibles
import "./index.css";


function App() {
  const { currentUser } = useAuth();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => window.location.reload());
  };

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <div className="container-fluid">
            <a className="navbar-brand fs-4" href="/">
          Book Database
            </a>

            {/* Toggle Button for Mobile */}
            <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
            >
          <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!currentUser && (
              <>
            <li className="nav-item">
              <a className="nav-link fs-5" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link fs-5" href="/signup">
                Signup
              </a>
            </li>
              </>
            )}
            {currentUser && (
              <li className="nav-item">
            <button
              className="btn btn-outline-danger btn-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
              </li>
            )}
          </ul>
            </div>
          </div>
        </nav>

        {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/books/:bookId"
            element={
              <ProtectedRoute>
                <BookDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
