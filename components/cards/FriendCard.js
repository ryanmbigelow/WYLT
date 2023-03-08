import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleFollow } from '../../api/followData';
import { useAuth } from '../../utils/context/authContext';

export default function FriendCard({ friendObj, onUpdate, appUser }) {
  const { user } = useAuth();

  const deleteThisFriend = () => {
    if (window.confirm(`Unfollow ${friendObj.username}?`)) {
      deleteSingleFollow(friendObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card>
        <iframe src={friendObj.profile_picture} title={friendObj.username} />
        <Card.Body>
          <Card.Title>{friendObj.username}</Card.Title>
          <Link href={`/user/${friendObj.firebaseKey}`} passHref>
            {appUser.uid === user.uid ? (<Button variant="outline-dark" className="m-2">view profile</Button>) : '' }
          </Link>
          <>
            {appUser.uid === user.uid ? (
              <Button variant="outline-dark" className="m-2" onClick={deleteThisFriend}>
                DELETE
              </Button>
            )
              : ''}
          </>
        </Card.Body>
      </Card>
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
  appUser: PropTypes.func.isRequired,
};
