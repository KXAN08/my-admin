import { useUserStore } from "../store/useUserStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";
import { Files, Archive } from "lucide-react";
import { HiUserCircle } from "react-icons/hi";

const Profile = () => {
  const user = useUserStore(s => s.user);
  const clearToken = useAuthStore(s => s.clearToken);
  const clearUser = useUserStore(s => s.clearUser);
  const navigate = useNavigate();

  const [isDeleting, setIsDeleting] = useState(false);

  const copyUsername = () => {
    if (user?.username) {
      navigator.clipboard.writeText(user.username);
      toast.success("Username copied!");
    } else {
      toast.error("No username found.");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await axios.delete("/users", {
        data: { username: user.username },
      });
      clearToken();
      clearUser();
      toast.success("Account deleted!");
      navigate("/");
    } catch {
      toast.error("Error deleting account.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <HiUserCircle size={48} color="blue"/>
          <div>
            <h2 className="text-2xl font-semibold">{user?.name || "Name not set"}</h2>
            <p className="text-gray-600 mt-1">@{user?.username || "username"}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={copyUsername}
            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">
            <Files size={18} /> <span>Copy Username</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition">
            <Archive size={18} />
            <span>{isDeleting ? "Deleting..." : "Delete Account"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
