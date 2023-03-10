import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import {
  createFollow, deleteSingleFollow, getFollows, updateFollow,
} from '../../api/followData';
import { getUserFollows } from '../../api/mergedData';
import { getSongs } from '../../api/songData';
import { getSingleUser, getUsers } from '../../api/userData';
import FriendCard from '../../components/cards/FriendCard';
import SongCard from '../../components/cards/SongCard';
import { useAuth } from '../../utils/context/authContext';

export default function Profile() {
  // GET THE FIREBASEKEY TO VIEW A USER'S PROFILE
  const { user } = useAuth();
  const router = useRouter();
  const { firebaseKey } = router.query;

  // SET THE PROFILE OWNER - THE USER WHOSE PROFILE IS BEING VIEWED
  const [profileOwner, setProfileOwner] = useState({});
  const getProfileOwner = () => {
    getSingleUser(firebaseKey).then(setProfileOwner);
  };
  useEffect(() => {
    getProfileOwner();
  }, [firebaseKey]);

  // SET THE PROFILE VIEWER - THE USER VIEWING ANOTHER USER'S PROFILE
  const [profileViewer, setProfileViewer] = useState({});
  const getProfileViewer = () => {
    getUsers().then((userArr) => {
      const appUser = userArr.find((userObj) => userObj.uid === user.uid);
      setProfileViewer(appUser);
    });
  };
  useEffect(() => {
    getProfileViewer();
  }, [user]);

  // GET ALL THE USER'S UPLOADED SONGS
  const [songs, setSongs] = useState([]);
  const getAllTheSongs = () => {
    getSongs(profileOwner.uid).then(setSongs);
  };
  useEffect(() => {
    getAllTheSongs();
  }, [profileOwner]);

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getUserFollows(firebaseKey).then(setFollows);
  };
  useEffect(() => {
    getAllFollows();
  }, [firebaseKey]);

  // CHECK IF PROFILE VIEWER FOLLOWS PROFILE OWNER
  const [userRelationship, setUserRelationship] = useState(false);
  const getUserRelationship = () => {
    getFollows(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiver_id === profileOwner.firebaseKey && relationship.follower_id === profileViewer.firebaseKey);
      if (userFollowRelationship) setUserRelationship(true);
    });
  };
  useEffect(() => {
    getUserRelationship();
  }, [profileOwner, profileViewer]);

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    const payload = {
      follower_id: profileViewer.firebaseKey,
      receiver_id: profileOwner.firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload);
    });
  };

  // CLICK EVENT FOR UNFOLLOWING A USER
  const unfollowUser = () => {
    getFollows(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiver_id === profileOwner.firebaseKey && relationship.follower_id === profileViewer.firebaseKey);
      deleteSingleFollow(userFollowRelationship.firebaseKey);
    });
  };

  return (
    <div>
      <div>
        {userRelationship === true && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2" onClick={unfollowUser}>Unfollow</Button>) : ''}
        {userRelationship === false && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2" onClick={followUser}>Follow</Button>) : ''}
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
