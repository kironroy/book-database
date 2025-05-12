import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary">Welcome to the Book Database</h2>
      <p className="text-muted">
        Explore, add, and manage your favorite books effortlessly!
      </p>

      {/* Navigation Button */}
      <button
        className="btn btn-primary btn-lg mt-4 px-4 py-3"
        onClick={() => navigate("/books")}
      >
        View All Books
      </button>
    </div>
  );
}

export default Home;
