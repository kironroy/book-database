import { useNavigate } from "react-router-dom";
import "../index.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container has-text-centered mt-5">
      <h2 className="title has-text-primary">Welcome to the Book Database</h2>
      <p className="has-text-grey">
        Explore, add, and manage your favorite books effortlessly!
      </p>

      {/* Navigation Button */}
      <button
        className="button is-primary is-large mt-4"
        onClick={() => navigate("/books")}
      >
        View All Books
      </button>
    </div>
  );
}

export default Home;
