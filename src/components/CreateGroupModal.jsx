import { useState } from "react";
import { X } from "lucide-react";
import axios from "../api/axiosInstance";
import toast from "react-hot-toast";

const CreateGroupModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/groups", { name, password });
      toast.success(res.data?.message || "Group created!");
      onClose();
    } catch {
      toast.error("Error creating group");
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex justify-center items-center z-[999]">
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white p-5 w-90 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold m-0">Create New Group</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Group Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-2 border border-gray-300 rounded"/>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Create
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGroupModal;
