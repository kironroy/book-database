import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function Home() {
  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary">Welcome to the Book Database</h2>
      <p className="text-muted">
        Explore, add, and manage your favorite books effortlessly!
      </p>
    </div>
  );
}

export default Home;
