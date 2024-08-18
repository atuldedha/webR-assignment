import { Link } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const Navbar = () => {
  const { user } = useUserInfo();
  return (
    <header className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Assignment Links</h1>
        <nav>
          {!user?.isAuthenticated ? (
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-white hover:text-gray-300">
                  Sign Up
                </Link>
              </li>
            </ul>
          ) : (
            <Link to="/dashboard" className="text-white hover:text-gray-300">
              Go to Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
