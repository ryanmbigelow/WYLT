import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
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
    <div className="songcard">
      <iframe src={songObj.youtube_link} title={songObj.title} style={{ width: '252px', height: '189px' }} className="youtubevideo" />
      <div>
        <div className="songcardbodytext">
          <h5>{songObj.title}</h5>
          <h6>{songObj.artist}</h6>
        </div>
        <div className="cardbuttonsflexwrap">
          <Link href={`/song/edit/${songObj.firebaseKey}`} passHref>
            {songObj.user_id === appUser.firebaseKey ? (<Button type="button" className="m-2">edit</Button>) : '' }
          </Link>
          <>
            {songObj.user_id === appUser.firebaseKey ? (<Button type="button" className="m-2" onClick={deleteSong}>delete</Button>) : ''}
          </>
        </div>
      </div>
    </div>
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
