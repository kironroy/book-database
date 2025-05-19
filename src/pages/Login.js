import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../index.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/books"); // Redirect after login
    } catch (err) {
      setError("Failed to login. Check your credentials.");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="container has-text-centered mt-5">
      <h2 className="title has-text-primary">Login</h2>
      {error && <p className="has-text-danger">{error}</p>}
      <form onSubmit={handleLogin} className="box mt-4">
        <div className="field">
          <div className="control">
            <input
              type="email"
              className="input is-large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              type="password"
              className="input is-large"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="button is-primary is-large is-fullwidth"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
