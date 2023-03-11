import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getFollows } from '../../api/followData';
import { getSongs } from '../../api/songData';
import { getSingleUser } from '../../api/userData';
import FriendCard from '../../components/cards/FriendCard';
import SongCard from '../../components/cards/SongCard';

export default function Profile() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  const publicUserObj = getSingleUser(firebaseKey).then((user) => user[0]);
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getSingleUser(firebaseKey).then((publicUser) => {
      console.warn(publicUser[0].uid);
      getSongs(publicUser[0].uid).then(setSongs);
    });
  };
  useEffect(() => {
    getAllTheSongs();
  }, []);

  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getSingleUser(firebaseKey).then((publicUser) => {
      getFollows(publicUser[0].uid).then((followArr) => {
        followArr.forEach((follow) => {
          getSingleUser(follow.receiver_id)
            .then(setFollows);
        });
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
            <FriendCard key={follow.firebaseKey} friendObj={follow} onUpdate={getAllFollows} appUser={publicUserObj} />
          ))}
        </div>
      </div>
    </div>
  );
}
