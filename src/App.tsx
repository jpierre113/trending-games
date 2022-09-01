import React from 'react';
import axios from 'axios';
import TwitchGame from '../types/twitchgame.type.ts'
import './App.css';

const App = () => {

  const [posts, setPosts]: [TwitchGame[], (posts: TwitchGame[]) => void]= React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios.get<TwitchGame[]>('https://twitch-game-popularity.p.rapidapi.com/games', {
      headers: {
      'X-RapidAPI-Key': ${process.env.API_KEY},
      'X-RapidAPI-Host': 'twitch-game-popularity.p.rapidapi.com'
      },
    });
  }, []);

  React.useEffect(() => {
  axios
    .get<TwitchGame[]>(...)
    .then(response => {
      setPosts(response.data);
      setLoading(false);
    });
},

React.useEffect(() => {
  axios
    .get<TwitchGame[]>(...)
    .then(...)
    .catch(ex => {
      const error =
      ex.response.status === 404
        ? "Resource Not found"
        : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
    });
}, []);
  return (
    <div className="App">
      <h1 className="siteTitle">Twitch Hub</h1>
        <ul className="postList">
          {posts.map((post)=> (
            <li key={post.id}>
            <h2>{post.name}</h2>
            </li>
          ))}
        </ul>
        {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
