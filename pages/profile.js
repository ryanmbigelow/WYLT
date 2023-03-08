import React, { useState, useEffect } from 'react';
import { getFollows } from '../api/followData';
// import { getUserFollows } from '../api/mergedData';
import { getSongs } from '../api/songData';
import { getSingleUser } from '../api/userData';
import FriendCard from '../components/cards/FriendCard';
import SongCard from '../components/cards/SongCard';
import { useAuth } from '../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getSongs(user.uid).then(setSongs);
  };
  useEffect(() => {
    getAllTheSongs();
  }, []);

  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getFollows(user.uid).then((followArr) => {
      followArr.forEach((follow) => {
        getSingleUser(follow.receiver_id)
          .then(setFollows);
      });
    });
    console.warn(setFollows);
  };
  useEffect(() => {
    getAllFollows();
  }, []);

  return (
    <div>
      <div>
        <h3>songs</h3>
        <div id="songcardcontainer">
          {songs.map((song) => (
            <SongCard key={song.firebaseKey} songObj={song} onUpdate={getAllTheSongs} />
          ))}
        </div>
        <h3>follows</h3>
        <div>
          {follows.map((follow) => (
            <FriendCard key={follow.firebaseKey} friendObj={follow} onUpdate={getAllFollows} />
          ))}
        </div>
      </div>
    </div>
  );
}
