import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import UserSelector from './components/UserSelector';
import './App.css';

function App() {
  const [activeUser, setActiveUser] = useState('A');

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🤖 Chatbot de Atendimento</h1>
          <UserSelector activeUser={activeUser} setActiveUser={setActiveUser} />
          <nav className="navigation">
            <Link to="/chat" className="nav-link">💬 Chat</Link>
            <Link to="/historico" className="nav-link">📋 Histórico</Link>
          </nav>
        </header>
        
        <main className="App-main">
          <Routes>
            <Route path="/" element={<ChatPage activeUser={activeUser} />} />
            <Route path="/chat" element={<ChatPage activeUser={activeUser} />} />
            <Route path="/historico" element={<ChatPage activeUser={activeUser} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;