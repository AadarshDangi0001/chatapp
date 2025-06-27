import { useEffect, useRef, useState } from 'react';

const MessageList = ({ messages, isGroupChat, currentUserId, onDM }) => {
  const messagesEndRef = useRef(null);
  const [openContextMenuId, setOpenContextMenuId] = useState(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleContextMenu = (e, userId) => {
    e.preventDefault();
    setOpenContextMenuId(userId === openContextMenuId ? null : userId);
  };

  const handleDM = (userId) => {
    const user = messages.find((msg) => msg.sender._id === userId)?.sender;
    if (user) onDM(user);
    setOpenContextMenuId(null);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {messages.map((message) => {
        const senderId = message.sender._id || message.sender;
        const isSender = String(senderId) === String(currentUserId);
        const displayName = message.sender?.username || message.sender?.name;

        return (
          <div key={message._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div className="flex items-end space-x-2">
              {!isSender && (
                <div className="relative">
                  <div
                    onContextMenu={(e) => handleContextMenu(e, senderId)}
                    className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold cursor-pointer"
                  >
                    {displayName?.[0]?.toUpperCase() || '?'}
                  </div>
                  {openContextMenuId === senderId && (
                    <div className="absolute top-12 left-0 bg-gray-800 text-white rounded shadow p-2 z-10">
                      <button
                        className="text-sm hover:underline"
                        onClick={() => handleDM(senderId)}
                      >
                        DM
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isSender ? 'bg-green-600 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {isGroupChat && !isSender && (
                  <p className="text-xs text-green-300 mb-1 font-semibold">
                    {displayName}
                  </p>
                )}
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;

