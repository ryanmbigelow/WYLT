import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SongCard from '../components/cards/SongCard';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUsers } from '../api/userData';
import { getAllSongs } from '../api/songData';

function Home() {
  const { uid } = useAuth();

  // FUNCTION TO GET THE APP USER OBJECT
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getUsers().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [uid]);

  // FUNCTION TO GET THE SONGS FROM A USER'S FOLLOWS
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getAllSongs().then(setSongs);
  };
  useEffect(() => {
    getAllTheSongs();
  }, []);

  return (
    <div>
      <div className="pageheaderflexwrap">
        <h1>hey {appUser.username}! </h1>
        <Link href="/song/new" passHref>
          <Button variant="outline-dark" className="m-1">Add a Song</Button>
        </Link>
      </div>
      <div>
        <h3 className="pageheaderflexwrap">songs</h3>
        <div className="songcardcontainer">
          {songs.length === 0 ? (<p>no songs found</p>)
            : (songs.map((song) => (
              <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
            )))}
        </div>
      </div>
      <div className="bigbuttonsflexbox">
        <Button type="button" className="m-1" onClick={signOut}>sign out</Button>
      </div>
    </div>
  );
}

export default Home;
