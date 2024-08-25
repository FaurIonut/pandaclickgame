import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend
    axios.get('/api/leaderboard')
      .then(response => setLeaders(response.data))
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaders.map((leader, index) => (
          <li key={index}>
            {leader.username}: {leader.tokens} tokens
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;
