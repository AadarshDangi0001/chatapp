// ChatArea.jsx
import { useState, useEffect } from 'react';
import { chatAPI } from '../../services/api';
import { useSocket } from '../../hooks/useSocket';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { User, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ChatArea = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isGroupSelected, setIsGroupSelected] = useState(true);
  const [lastMessageMap, setLastMessageMap] = useState({});
  


  const { user } = useAuth();
  const currentUserId = user?.id || user?._id;
  const token = localStorage.getItem('token');
  const socket = useSocket(token);

  const updateLastMessageTime = (userId) => {
    setLastMessageMap((prev) => ({ ...prev, [userId]: Date.now() }));
  };

  useEffect(() => {
    handleSelectGroup();
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (message) => {
      const senderId = message.sender._id || message.sender;
      const receiverId = message.receiver._id || message.receiver;
      const otherUserId = senderId === currentUserId ? receiverId : senderId;
      updateLastMessageTime(otherUserId);

      if (!isGroupSelected && (senderId === selectedUser?._id || receiverId === selectedUser?._id)) {
        setMessages((prev) => [...prev, message]);
      }
    };

    const handleGroupMessage = (message) => {
      updateLastMessageTime('group');
      if (isGroupSelected) {
        setMessages((prev) => [...prev, message]);
      }
    };

    const handleMessageSent = (message) => {
      setMessages((prev) => [...prev, message]);
      if (!isGroupSelected && selectedUser) {
        updateLastMessageTime(selectedUser._id);
      } else if (isGroupSelected) {
        updateLastMessageTime('group');
      }
    };

    socket.on('receive_message', handlePrivateMessage);
    socket.on('receive_group_message', handleGroupMessage);
    socket.on('message_sent', handleMessageSent);

    return () => {
      socket.off('receive_message', handlePrivateMessage);
      socket.off('receive_group_message', handleGroupMessage);
      socket.off('message_sent', handleMessageSent);
    };
  }, [socket, selectedUser, isGroupSelected]);

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    setIsGroupSelected(false);
    try {
      const res = await chatAPI.getMessages(user._id);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSelectGroup = async () => {
    setIsGroupSelected(true);
    setSelectedUser(null);
    try {
      const res = await chatAPI.getGroupMessages();
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch group messages:', error);
    }
  };

  const handleSendMessage = (content) => {
    if (!socket) return;

    if (isGroupSelected) {
      socket.emit('send_group_message', { content });
    } else if (selectedUser) {
      socket.emit('send_message', {
        receiverId: selectedUser._id,
        content,
      });
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden">
    <div className="hidden md:block">
  <UserList
    onSelectUser={handleSelectUser}
    onSelectGroup={handleSelectGroup}
    selectedUser={selectedUser}
    isGroupSelected={isGroupSelected}
    lastActivityMap={lastMessageMap}
  />
</div>

{isSidebarOpen && (
  <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-80">
    <UserList
      onSelectUser={handleSelectUser}
      onSelectGroup={handleSelectGroup}
      selectedUser={selectedUser}
      isGroupSelected={isGroupSelected}
      lastActivityMap={lastMessageMap}
      onClose={() => setIsSidebarOpen(false)}
    />
  </div>
)}

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-4 bg-gray-900 border-b border-gray-800 flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
            {isGroupSelected ? (
              <Users className="text-white" size={20} />
            ) : (
              <User className="text-gray-300" size={20} />
            )}
          </div>
          <div>
            <h3 className="text-white font-medium">
              {isGroupSelected ? 'General Group' : selectedUser?.username}
            </h3>
            <p className="text-gray-400 text-sm">
              {isGroupSelected
                ? 'Everyone is here'
                : selectedUser?.isOnline
                ? 'Online'
                : 'Offline'}
            </p>
          </div>
        </div>

        <MessageList
          messages={messages}
          isGroupChat={isGroupSelected}
          currentUserId={currentUserId}
          onDM={handleSelectUser}
        />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatArea;

