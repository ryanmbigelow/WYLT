import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import SongCard from '../components/cards/SongCard';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getFollowsSongs } from '../api/mergedData';
import { getUsers } from '../api/userData';

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
    if (appUser) {
      getFollowsSongs(appUser.firebaseKey).then(setSongs);
    }
  };
  useEffect(() => {
    getAllTheSongs();
  }, [appUser]);

  return (
    <div>
      <h1>Hello {user.displayName}! </h1>
      <div>
        <Link href="/song/new" passHref>
          <Button variant="outline-dark" className="m-2">Add a Song</Button>
        </Link>
      </div>
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
