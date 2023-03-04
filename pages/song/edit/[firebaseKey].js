import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleSong } from '../../../api/songData';
import SongForm from '../../../components/forms/SongForm';

export default function EditSongInfo() {
  const [editSong, setEditSong] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleSong(firebaseKey).then(setEditSong);
  }, [firebaseKey]);

  return (
    <SongForm songObj={editSong} />
  );
}
