import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import {
  createFollow, deleteSingleFollow, getFollows, updateFollow,
} from '../../api/followData';

export default function FriendCard({
  friendObj, onUpdate, appUser,
}) {
  // CHECK IF PROFILE VIEWER FOLLOWS PROFILE OWNER
  const [userRelationship, setUserRelationship] = useState(false);
  const getUserRelationship = () => {
    getFollows(appUser.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiver_id === friendObj.firebaseKey && relationship.follower_id === appUser.firebaseKey);
      if (userFollowRelationship) setUserRelationship(true);
      else setUserRelationship(false);
    });
  };
  useEffect(() => {
    getUserRelationship();
  }, [appUser, friendObj]);

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    const payload = {
      follower_id: appUser.firebaseKey,
      receiver_id: friendObj.firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload).then(() => onUpdate());
    });
  };

  // CLICK EVENT FOR UNFOLLOWING A USER
  const unfollowUser = () => {
    getFollows(appUser.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiver_id === friendObj.firebaseKey && relationship.follower_id === appUser.firebaseKey);
      deleteSingleFollow(userFollowRelationship.firebaseKey).then(getUserRelationship);
    });
  };

  return (
    <div className="friendcard">
      <img src={friendObj.profile_picture} title={friendObj.username} alt={friendObj} style={{ width: '252px', height: '252px' }} className="border-radius-image" />
      <Card.Body>
        <h5 className="friendcardbodytext"><a href={`/user/${friendObj.firebaseKey}`}>@{friendObj.username}</a></h5>
        <div className="cardbuttonsflexwrap">
          <Link href={`/user/${friendObj.firebaseKey}`} passHref>
            {appUser.firebaseKey !== friendObj.firebaseKey ? (<Button variant="outline-dark" className="m-2">profile</Button>) : '' }
          </Link>
          <>
            {userRelationship === true && appUser.firebaseKey !== friendObj.firebaseKey ? (<Button variant="outline-dark" className="m-2" onClick={unfollowUser}>unfollow</Button>) : ''}
            {userRelationship === false && appUser.firebaseKey !== friendObj.firebaseKey ? (<Button variant="outline-dark" className="m-2" onClick={followUser}>follow</Button>) : ''}
          </>
        </div>
      </Card.Body>
    </div>
  );
}

FriendCard.propTypes = {
  friendObj: PropTypes.shape({
    username: PropTypes.string,
    profile_picture: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  appUser: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
