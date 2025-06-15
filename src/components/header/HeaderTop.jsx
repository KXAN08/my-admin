import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserStore } from "../../store/useUserStore";
import { useTheme } from "../../store/useTheme";
import { useSidebarStore } from "../../store/useSidebarStore";
import toast from "react-hot-toast";

const HeaderTop = () => {
  const clearToken = useAuthStore(s => s.clearToken);
  const clearUser = useUserStore(s => s.clearUser);
  const user = useUserStore(s => s.user);
  const { isDark, toggleTheme } = useTheme();
  const { toggleSidebar } = useSidebarStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    clearUser();
    toast.success("Logged out!");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-gray-100 transition text-gray-700">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-blue-600 m-0 p-0">Shopping List</h1>
      </div>
      <div className="flex items-center gap-4">
        {user?.username && <span className="text-gray-800">@{user.username}</span>}
        <button onClick={handleLogout} className="p-2 rounded hover:bg-gray-200 text-red-600 transition">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default HeaderTop;
