import React, {useEffect, useState} from 'react';
import axios from 'axios';
import TwitchGame from './types/twitchgame.type';
import SelectedPage from './types/selectedpage.type';
import ReactPaginate from 'react-paginate';
import ReactPaginateProps from './types/reactpaginateprops.type'
import './App.css';

const App = () => {
  const defaultPosts:TwitchGame[] = [];

  const [posts, setPosts]: [TwitchGame[], (posts: TwitchGame[]) => void]= useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] = useState<boolean>(true);

  const [error, setError]: [string, (error: string) => void] = useState("");

  const [currentPage, setCurrentPage]: [SelectedPage, (currentPage: SelectedPage) => void] = useState({selected: 1});

  const PER_PAGE = 10;
  const offset = currentPage.selected * PER_PAGE;
  const currentPageData = posts.filter((x): x is TwitchGame => x !== null)
    .slice(offset, offset + PER_PAGE)
    .map((post) => (
       <li key={post.Name}>
       <h2>{post.Name}</h2>
       </li>
     )
   )
  const pageCount = Math.ceil(posts.length / PER_PAGE);

  useEffect(() => {
    axios.get<TwitchGame[]>('https://twitch-game-popularity.p.rapidapi.com/games', {
      headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
      'X-RapidAPI-Host': 'twitch-game-popularity.p.rapidapi.com'
      },
    }).then(response => {
      setPosts(response.data);
      setLoading(false);
    }).catch(ex => {
      const error =
      ex.response.status === 404 ? "Resource Not found" : "An unexpected error has occurred";
      setError(error);
      setLoading(false);
    });
  }, []);

  function handlePageClick(selectedItem: SelectedPage) {
    setCurrentPage(selectedItem);
}

  return (
    <div className="App">
      <h1 className="siteTitle">Twitch Hub</h1>
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            />
            <ul className="postList">
              {currentPageData}
            </ul>
        {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
