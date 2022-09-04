import React from 'react';
import axios from 'axios';
import TwitchGame from './types/twitchgame.type'
import './App.css';

const App = () => {
  const defaultPosts:TwitchGame[] = [];

  const [posts, setPosts]: [TwitchGame[], (posts: TwitchGame[]) => void]= React.useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios.get<TwitchGame[]>('https://twitch-game-popularity.p.rapidapi.com/games', {
      headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
      'X-RapidAPI-Host': 'twitch-game-popularity.p.rapidapi.com'
      },
    }).then(response => {
      console.log(response);
      setPosts(response.data);
      setLoading(false);
    }).catch(ex => {
      console.log (ex);
      console.log(process.env.API_KEY)
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
          {posts.filter((x): x is TwitchGame => x !== null).map((post)=> (
            <li key={post.id}>
            <h2>{post.Name}</h2>
            </li>
          ))}
        </ul>
        {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
