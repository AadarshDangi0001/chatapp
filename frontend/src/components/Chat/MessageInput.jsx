import { useState } from 'react';
import { Send } from 'lucide-react';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
      <div className="flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;