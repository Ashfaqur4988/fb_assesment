import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    login(formData);
    navigate("/");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Mail className="w-5 h-5 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 ml-2 outline-none bg-transparent text-gray-800"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <Lock className="w-5 h-5 text-gray-500" />
            <input
              type="password"
              placeholder="Password"
              className="flex-1 ml-2 outline-none bg-transparent text-gray-800"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
