import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleSong } from '../../api/songData';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../api/userData';

export default function SongCard({ songObj, onUpdate }) {
  // FUNCTION TO GET THE APP USER OBJECT
  const { user } = useAuth();
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

  const deleteSong = () => {
    if (window.confirm(`Delete ${songObj.title} by ${songObj.artist} from your collection?`)) {
      deleteSingleSong(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <iframe src={songObj.youtube_link} title={songObj.title} style={{ width: 420, height: 315 }} />
      <Card.Body>
        <Card.Title>{songObj.title} by {songObj.artist}</Card.Title>
        <Link href={`/song/${songObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/song/edit/${songObj.firebaseKey}`} passHref>
          {songObj.user_id === appUser.firebaseKey ? (<Button variant="outline-dark" className="m-2">EDIT</Button>) : '' }
        </Link>
        <>
          {songObj.user_id === appUser.firebaseKey ? (
            <Button variant="outline-dark" className="m-2" onClick={deleteSong}>
              DELETE
            </Button>
          )
            : ''}
        </>
      </Card.Body>
    </Card>
  );
}

SongCard.propTypes = {
  songObj: PropTypes.shape({
    artist: PropTypes.string,
    youtube_link: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    user_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
