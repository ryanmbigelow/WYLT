import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SongCard from '../components/cards/SongCard';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getUsers } from '../api/userData';
import { getAllSongs } from '../api/songData';

function Home() {
  const { user } = useAuth();

  // FUNCTION TO GET THE APP USER OBJECT
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getUsers().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === user.uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [user]);

  // FUNCTION TO GET THE SONGS FROM A USER'S FOLLOWS
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getAllSongs().then(setSongs);
  };
  useEffect(() => {
    getAllTheSongs();
  }, [appUser]);

  return (
    <div>
      <div className="pageheaderflexwrap">
        <h1>hey {appUser.username}! </h1>
        <Link href="/song/new" passHref>
          <Button variant="outline-dark" className="m-1">Add a Song</Button>
        </Link>
      </div>
      <div>
        <h3>songs</h3>
        <div className="songcardcontainer">
          {songs.map((song) => (
            <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
          ))}
        </div>
      </div>
      <p>Click the button below to logout!</p>
      <Button className="m-1" type="button" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
