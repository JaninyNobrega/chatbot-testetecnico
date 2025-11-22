import React, { useState, useEffect } from 'react';
import './HistoryPage.css';

function HistoryPage({ activeUser }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/messages/?user=${activeUser}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data);
        setLoading(false);
      })
      .catch(() => {
        alert('Erro ao carregar histórico!');
        setLoading(false);
      });
  }, [activeUser]);

  if (loading) return <div className="history-page"><p>Carregando...</p></div>;

  return (
    <div className="history-page">
      <h2>📋 Histórico - Usuário {activeUser}</h2>
      <p>{messages.length} mensagens</p>
      
      <div className="history-list">
        {messages.map((msg) => (
          <div key={msg.id} className="history-item">
            <strong>{msg.is_response ? '🤖 Sistema' : '👤 Usuário'}</strong>
            <p>{msg.content}</p>
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;