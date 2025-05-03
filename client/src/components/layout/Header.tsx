import React from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../jotai/atoms";
import authService from "../../services/authService";
import { LogOut, LayoutDashboard, CheckSquare } from "lucide-react";

const Header: React.FC = () => {
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <CheckSquare className="h-8 w-8" />
          <h1 className="text-2xl font-bold">TaskMaster</h1>
        </div>

        {user ? (
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center hover:text-blue-200 transition-colors"
              >
                <LayoutDashboard className="mr-1 h-5 w-5" />
                <span>Dashboard</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div
                className="hidden md:block cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <span className="font-medium">{user.user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-600 transition-colors rounded-md px-3 py-1.5 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-700 hover:bg-blue-600 transition-colors rounded-md px-4 py-1.5"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-700 hover:bg-blue-50 transition-colors rounded-md px-4 py-1.5"
            >
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
