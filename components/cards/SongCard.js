import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleSong } from '../../api/songData';
import { useAuth } from '../../utils/context/authContext';

export default function SongCard({ songObj, onUpdate }) {
  const { user } = useAuth();

  const deleteSong = () => {
    if (window.confirm(`Delete ${songObj.title}?`)) {
      deleteSingleSong(songObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card>
      <iframe src={songObj.youtube_link} title={songObj.title} style={{ width: 420, height: 315 }} />
      <Card.Body>
        <Card.Title>{songObj.title} by {songObj.artist}</Card.Title>
        <Link href={`/pin/${songObj.firebaseKey}`} passHref>
          <Button variant="outline-dark" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/pin/edit/${songObj.firebaseKey}`} passHref>
          {songObj.uid === user.uid ? (<Button variant="outline-dark" className="m-2">EDIT</Button>) : '' }
        </Link>
        <>
          {songObj.uid === user.uid ? (
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
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
