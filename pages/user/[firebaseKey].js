import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { createFollow, updateFollow } from '../../api/followData';
import { getUserFollows } from '../../api/mergedData';
import { getSongs } from '../../api/songData';
import { getSingleUser, getUser } from '../../api/userData';
import FriendCard from '../../components/cards/FriendCard';
import SongCard from '../../components/cards/SongCard';
import { useAuth } from '../../utils/context/authContext';

export default function Profile() {
  // GET THE FIREBASEKEY TO VIEW A USER'S PROFILE
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;
  const { profileOwner, setProfileOwner } = useState({});
  const getProfileOwner = () => {
    getSingleUser(firebaseKey).then(setProfileOwner);
  };
  useEffect(() => {
    getProfileOwner();
  });
  const { profileViewer, setProfileViewer } = useState({});
  const getProfileViewer = () => {
    getUser(user.uid).then(setProfileViewer);
  };
  useEffect(() => {
    getProfileViewer();
  });

  // GET ALL THE USER'S UPLOADED SONGS
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    // getSingleUser(firebaseKey).then((publicUser) => {
    getSongs(profileOwner.uid).then(setSongs);
    // });
  };
  useEffect(() => {
    getAllTheSongs();
  }, []);

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getUserFollows(firebaseKey).then(setFollows);
  };
  useEffect(() => {
    getAllFollows();
  }, []);

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    const payload = {
      follower_id: firebaseKey,
      receiver_id: firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload);
    });
  };

  return (
    <div>
      <div>
        {profileOwner === profileViewer ? (<Button variant="outline-dark" className="m-2" onClick={followUser}>Follow</Button>) : ''}
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
            <FriendCard key={follow.firebaseKey} friendObj={follow} onUpdate={getAllFollows} appUser={profileOwner} />
          ))}
        </div>
      </div>
    </div>
  );
}
