import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleSong } from '../../api/songData';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../api/userData';

export default function SongCard({ songObj, onUpdate }) {
  // FUNCTION TO GET THE APP USER OBJECT
  const { uid } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getUsers().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [uid]);

  const deleteSong = () => {
    if (window.confirm(`Delete ${songObj.title} by ${songObj.artist} from your collection?`)) {
      deleteSingleSong(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <iframe src={songObj.youtube_link} title={songObj.title} style={{ width: '16rem' }} />
      <Card.Body>
        <Card.Title>{songObj.title}</Card.Title>
        <Card.Text>{songObj.artist}</Card.Text>
        <Card.Text>uploaded by {songObj.artist}</Card.Text>
        {/* <Link href={`${songObj.youtube_link}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link> */}
        <Link href={`/song/edit/${songObj.firebaseKey}`} passHref>
          {songObj.user_id === appUser.firebaseKey ? (<button type="button" className="m-2">EDIT</button>) : '' }
        </Link>
        <>
          {songObj.user_id === appUser.firebaseKey ? (
            <button type="button" className="m-2" onClick={deleteSong}>
              DELETE
            </button>
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
