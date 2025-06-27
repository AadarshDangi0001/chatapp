import { useEffect, useState } from 'react';
import { chatAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Users } from 'lucide-react';

const UserList = ({ onSelectUser, onSelectGroup, selectedUser, isGroupSelected, lastActivityMap }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await chatAPI.getUsers();
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [lastActivityMap]);

  const sortedUsers = [...users].sort((a, b) => {
    const aTime = lastActivityMap[a._id] || 0;
    const bTime = lastActivityMap[b._id] || 0;
    return bTime - aTime;
  });

  return (
    <div className="w-[300px] bg-gray-950 border-r border-gray-800 text-white flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div
          onClick={() => onSelectGroup()}
          className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 transition ${
            isGroupSelected ? 'bg-gray-800' : ''
          }`}
        >
          <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            <Users size={22} />
          </div>
          <div className="ml-3">
            <div className="font-medium">General Group</div>
            <div className="text-sm text-gray-400">Everyone is here</div>
          </div>
        </div>

        {sortedUsers.map((u) => (
          <div
            key={u._id}
            onClick={() => onSelectUser(u)}
            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 transition ${
              selectedUser?._id === u._id && !isGroupSelected ? 'bg-gray-800' : ''
            }`}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center text-lg font-bold">
                {u.username[0]?.toUpperCase()}
              </div>
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-950 ${
                  u.isOnline ? 'bg-green-500' : 'bg-gray-500'
                }`}
              ></span>
            </div>
            <div className="ml-3">
              <div className="font-medium">{u.username}</div>
              <div className="text-sm text-gray-400">
                {u.isOnline
                  ? 'Online'
                  : u.lastSeen
                  ? `Last seen ${new Date(u.lastSeen).toLocaleDateString()}`
                  : 'Offline'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
