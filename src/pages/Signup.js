import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/books"); // Redirect after successful signup
    } catch (err) {
      setError("Signup failed. Try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="text-primary">Create an Account</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSignup} className="mt-3">
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
