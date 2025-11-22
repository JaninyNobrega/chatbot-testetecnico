import React from 'react';
import './UserSelector.css';

function UserSelector({ activeUser, setActiveUser }) {
  return (
    <div className="user-selector">
      <span>Usuário Ativo:</span>
      <button
        className={activeUser === 'A' ? 'active' : ''}
        onClick={() => setActiveUser('A')}
      >
        👤 Usuário A
      </button>
      <button
        className={activeUser === 'B' ? 'active' : ''}
        onClick={() => setActiveUser('B')}
      >
        👤 Usuário B
      </button>
    </div>
  );
}

export default UserSelector;