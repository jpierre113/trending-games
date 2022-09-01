import React from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const listTwitchGames = {
    method: 'GET',
    url: 'https://twitch-game-popularity.p.rapidapi.com/games',
    headers: {
      'X-RapidAPI-Key': '642de38df0msh16c47a2b6d94672p1ead6fjsnd5cdeb6bfb68',
      'X-RapidAPI-Host': 'twitch-game-popularity.p.rapidapi.com'
    }
  };

  axios.request(listTwitchGames).then(function (response) {
  	console.log(response.data);
  }).catch(function (error) {
  	console.error(error);
  });
  return (
    <div className="App">
      <h1 className="siteTitle">Twitch Hub</h1>
      {
        listTwitchGames.map(({game, index}: {game: (param: any) => void; index: number}) => {
          return(
            {[(game(10))]}
            key={index}
          );
        })
      }
    </div>
  );
}

export default App;
