# 🔗 Real-Time Chat App

A sleek and responsive real-time chat application with **Group Chat**, **Direct Messaging (DM)**, **Online Presence**, and **Live Updates** — built with **React**, **Socket.io**, and **Node.js**.

## ✨ Features

- 🔒 User Authentication (JWT-based)
- 💬 Group chat ("General Group") for all users
- 🧑‍🤝‍🧑 One-on-one private messaging (DM)
- 🟢 Online status indicators
- 🕓 Message timestamps
- 📥 Auto-scrolling and smooth UI
- 🔁 User list auto-sorts by latest message activity (like WhatsApp)
- 👆 Click on profile avatar in group chat to open DM menu

## 📁 Project Structure



## ⚙️ Tech Stack

- Frontend: `React`, `Tailwind CSS`, `Socket.io-client`
- Backend: `Node.js`, `Express`, `MongoDB`, `Socket.io`
- Auth: `JWT`

## 🚀 Getting Started

### 1. Clone the repo

bash
git clone https://github.com/your-username/chat-app.git
cd chat-app

### 2. Setup frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev

### 3. Setup backend
bash
Copy
Edit
cd backend
npm install
npm run dev
Make sure MongoDB is running locally or provide a connection string in .env.

## 🔐 .env Example (Backend)
ini
Copy
Edit
PORT=5050
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your_jwt_secret
📦 API Endpoints (Sample)
Endpoint	Method	Description
/api/auth/login	POST	Login user
/api/auth/register	POST	Register new user
/api/messages/:id	GET	Fetch DM messages
/api/messages/group	GET	Fetch group chat messages

## 🧪 Future Improvements
✅ Typing indicators

✅ Message read receipts

✅ Emojis and file sharing

✅ Search chat history

✅ Notifications (toasts or push)


## 🙌 Author
Made with ❤️ by Aadarsh Dangi
