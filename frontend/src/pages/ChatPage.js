import React, { useState } from 'react';
import './ChatPage.css';

function ChatPage({ activeUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/messages/send/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: activeUser, content: input })
      });

      const data = await response.json();
      setMessages([...messages, data.user_message, data.system_response]);
      setInput('');
    } catch (error) {
      alert('Erro! Verifique se o backend está rodando!');
    }

    setLoading(false);
  };

  return (
    <div className="chat-page">
      <h2>Chat - Usuário {activeUser}</h2>
      
      <div className="messages">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.is_response ? 'bot' : 'user'}>
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? '⏳' : '📤'} Enviar
        </button>
      </form>
    </div>
  );
}

export default ChatPage;