import React, { useEffect, useState } from 'react';
import { getSongs } from '../api/songData';
import SongCard from '../components/cards/SongCard';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getSongs(user.uid).then(setSongs);
  };
  useEffect(() => {
    getAllTheSongs();
  }, []);

  return (
    <div>
      <h1>Hello {user.displayName}! </h1>
      <div>
        <div id="songcardcontainer">
          {songs.map((song) => (
            <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
          ))}
        </div>
      </div>
      <p>Click the button below to logout!</p>
      <button className="btn btn-danger btn-lg copy-btn" type="button" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

export default Home;
