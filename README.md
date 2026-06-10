# 🌍 TravelGuider - Full Stack Travel Assistant

A complete smart travel planning system for Sri Lanka with a React frontend, Node.js backend, and MySQL database.

## 🚀 One-Click Start
To get everything running without errors, follow these simple steps:

### 1. Prerequisites
- **MySQL Server**: Ensure your MySQL (XAMPP / WAMP / Standalone) is **RUNNING**.
- **Credentials**: By default, it uses `user: root` and `password: ""` (empty).

### 2. Quick Setup
Open **one** terminal in this folder and run:
```bash
# 1. Install all dependencies (Frontend + Backend)
npm run install-all

# 2. Start the project
npm run dev
```

### 3. Access
- **Website**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure
- `client/`: React + Vite + Tailwind CSS (Frontend)
- `server/`: Node.js + Express + JWT (Backend)
- `sql/`: Manual Database Schema (Auto-created by server if not found)

## 🛠️ Features
- **Integrated Auth**: Login, Register, Forgot Password.
- **Smart Planning**: Destination search, budget slider, interest cards.
- **AI Chatbot**: Mock responses for Kandy, Colombo, and Beaches.
- **Hotel Catalog**: Luxury and budget hotel listings.
- **Itinerary**: Day-by-day trip summary with status markers.
