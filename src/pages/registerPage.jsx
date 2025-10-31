import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-black">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4">
        <div className="flex flex-wrap border-2 items-center justify-center border-[#F77603] my-5 mb-20 py-1 mt-28 w-full md:w-[1350px] border-l-0 border-r-0 gap-3">

          <div className="relative w-full md:w-[1350px] h-[550px] md:h-[650px] rounded-3xl flex flex-col justify-center items-center overflow-hidden">

            <div className="absolute inset-0 bg-[url('car.jpg')] bg-cover bg-center opacity-40 z-0"></div>

            <form onSubmit={handleSubmit} className="relative z-10 w-full flex flex-col items-center">
              <h1
                className="text-3xl md:text-4xl text-[#F77603] mb-6"
                style={{ fontFamily: "Kaushan Script" }}
              >
                Register
              </h1>

              {error && (
                <div className="bg-red-900/80 text-white px-4 py-2 rounded-xl mb-4 w-4/5 md:w-1/3" style={{ fontFamily: "Judson" }}>
                  {error}
                </div>
              )}

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="mb-4 px-4 py-3 rounded-xl w-4/5 md:w-1/3 focus:outline-none bg-white/80 text-black"
                style={{ fontFamily: "Judson" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#F77603] hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition w-4/5 md:w-1/3 disabled:opacity-50"
                style={{ fontFamily: "Judson" }}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              <p className="text-white mt-4" style={{ fontFamily: "Judson" }}>
                Already have an account?{" "}
                <Link to="/login" className="text-[#F77603] hover:underline">
                  Login here
                </Link>
              </p>
            </form>

          </div>

        </div>
      </section>
    </div>
  );
}
