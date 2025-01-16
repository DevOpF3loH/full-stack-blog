import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex-[3] h-full flex items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
            className="p-5 border border-solid border-gray-300 rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            className="p-5 border border-solid border-gray-300 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            // disabled={isLoading}
            className="p-5 rounded-md border-none bg-teal-400 text-white font-bold cursor-pointer disabled:bg-gray-400"
          >
            Login
          </button>
          {error && <span className="text-red-600">{error}</span>}
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="flex-[2] bg-[#fcf5f3] flex items-center justify-center">
        <img src="/featured1.jpeg" alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default LoginPage;
