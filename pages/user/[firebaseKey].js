import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { createFollow, getFollows, updateFollow } from '../../api/followData';
import { getSongs } from '../../api/songData';
import { getSingleUser, getUser } from '../../api/userData';
import FriendCard from '../../components/cards/FriendCard';
import SongCard from '../../components/cards/SongCard';
import { useAuth } from '../../utils/context/authContext';

export default function Profile() {
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const publicUserObj = getSingleUser(firebaseKey);
  const appUserObj = getUser(user.uid);
  console.warn(appUserObj);
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getSingleUser(firebaseKey).then((publicUser) => {
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
  const followUser = () => {
    const payload = {
      uid: appUserObj.uid,
      follower_id: appUserObj.firebaseKey,
      receiver_id: publicUserObj.firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload);
    });
  };

  return (
    <div>
      <div>
        <Button variant="outline-dark" className="m-2" onClick={followUser}>Follow</Button>
      </div>
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
