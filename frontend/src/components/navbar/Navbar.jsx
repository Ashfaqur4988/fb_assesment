import { User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    // console.log("logout clicked");
    logout();
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-700 text-white w-full">
      {/* Left Side: Mail Schedule */}
      <Link to="/" className="flex items-center space-x-2">
        <User className="w-5 h-5" />
        <h1 className="text-xl font-bold">Mail Schedule</h1>
      </Link>

      {/* Right Side: Auth Buttons */}
      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link
              to={"/login"}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
