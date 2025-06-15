import { NavLink } from "react-router-dom";
import { User, MessageCircle, Plus } from "lucide-react";
import { useState } from "react";
import CreateGroupModal from "../CreateGroupModal";
import useGetGroups from "../../service/getGroups";
import { useSidebarStore } from "../../store/useSidebarStore";

const HeaderNav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: groups = [], isLoading } = useGetGroups();
  const { isCollapsed } = useSidebarStore();

  return (
    <aside
      className={`bg-white border-r shadow-md h-screen transition-all duration-300
        ${isCollapsed ? "w-20" : "w-64"} flex-shrink-0`} >
      <div className="p-3 flex flex-col h-full">
        <div className="mb-6 mt-2 flex justify-center">
          <img className="w-18 h-18 " src="./img/logo.png" alt="logo" /> 
        </div>
        {modalOpen && (
          <CreateGroupModal isNav={false} onClose={() => setModalOpen(false)} />
        )}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 py-2 px-3 rounded-md mb-2 transition ${
              isActive ? "bg-blue-100 text-blue-600" : "text-gray-800 hover:bg-gray-100"
            }`}>
          <User size={20} />
          {!isCollapsed && <span>Profile</span>}
        </NavLink>
        <div className="w-full">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between w-full py-2 px-3 text-left rounded-md text-gray-800 hover:bg-gray-100 transition">
            <span className="flex items-center gap-2">
              <MessageCircle size={18} />
              {!isCollapsed && <span>Groups</span>}
            </span>
            {!isCollapsed && <span>{isOpen ? "▾" : "▸"}</span>}
          </button>

          {isOpen && (
            <>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-2 py-2 px-3 mt-2 text-sm text-blue-600 hover:bg-blue-50 w-full rounded-md transition">
                <Plus size={16} />
                {!isCollapsed && <span>Create Group</span>}
              </button>

              <ul className="mt-2">
                {isLoading ? (
                  <li className="text-gray-400 px-3 text-sm">Loading...</li>
                ) : (
                  groups.map((group) => (
                    <li key={group._id}>
                      <NavLink
                        to={`/group/${group._id}`}
                        className={({ isActive }) =>
                          `flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition ${
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}>
                        <MessageCircle size={16} />
                        {!isCollapsed && <span>{group.name}</span>}
                      </NavLink>
                    </li>
                  ))
                )}
              </ul>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default HeaderNav;
