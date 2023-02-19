import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { clientCredentials } from '../utils/client';

function Home() {
  const { user } = useAuth();
  // const dbUrl = clientCredentials.databaseURL;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // CREATE SONG
  const getSong = () => new Promise((resolve, reject) => {
    fetch(`${clientCredentials.deezerAPI}/search?q=${searchInput}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${clientCredentials.deezerApiKey}`,
      }, // you technically do not need the options object for GET requests, but using it here for consistency
    })
      .then((response) => response.json())
      .then((data) => resolve(data)) // will resolve a single object
      .catch(reject);
  });

  const getSearchResults = () => {
    getSong(searchInput).then((setSearchResults));
  };

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput !== '') getSearchResults();
    setSearchInput('');
  };

  useEffect(() => {
    getSearchResults();
    return () => {
      setSearchResults([]);
    };
  }, []);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div>
        <Form onSubmit={handleSubmit} id="searchBar">
          <input className="form-control" type="text" placeholder="search" onChange={handleChange} value={searchInput} style={{ width: '300px', height: '40px' }} />
          <Button variant="outline-success">Search</Button>
        </Form>
      </div>
      console.warn({searchResults});
      <h1>Hello {user.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Home;
