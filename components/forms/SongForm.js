import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createSong, updateSong } from '../../api/songData';
import { useAuth } from '../../utils/context/authContext';
import { getUsers } from '../../api/userData';

const initialStateSong = {
  artist: '',
  youtube_link: '',
  title: '',
  firebaseKey: '',
  user_id: '',
};

export default function SongForm({ songObj }) {
  const [formInput, setFormInput] = useState(initialStateSong);
  const router = useRouter();
  const { uid } = useAuth();

  // FUNCTION TO GET THE APP USER OBJECT
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

  useEffect(() => {
    if (songObj.firebaseKey) setFormInput(songObj);
  }, [songObj, uid]);

  // FUNCTION TO CONVERT THE YOUTUBE LINK TO A YOUTUBE EMBED LINK
  const convertLink = (payload) => {
    const [, videoID] = payload.split('watch?v=');
    const embedLink = `https://www.youtube.com/embed/${videoID}`;
    return embedLink;
  };

  // EVENT HANDLERS

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLink = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: convertLink(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songObj.firebaseKey) {
      updateSong(formInput).then(() => router.push(`/user/${appUser.firebaseKey}`));
    } else {
      const payload = { ...formInput, user_id: appUser.firebaseKey };
      createSong(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateSong(patchPayloadFBK).then(() => {
          router.push(`/user/${appUser.firebaseKey}`);
        });
      });
    }
  };

  return (
    <div>
      <Head><title>{songObj.firebaseKey ? `update ${songObj.title}` : 'create song'}</title></Head>
      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{songObj.firebaseKey ? `update ${songObj.title}` : 'create song'}</h2>
        <div className="mt-5" />
        <div className=""><b>title</b></div>
        <FloatingLabel
          controlId="floatingInput1"
          label="song title"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="song title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className=""><b>artist</b></div>
        <FloatingLabel
          controlId="floatingInput2"
          label="artist"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="artist"
            name="artist"
            value={formInput.artist}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className=""><b>youtube link</b> (copy the youtube link from your browser)</div>
        <FloatingLabel
          controlId="floatingInput3"
          label="YouTube Embed Link"
          className="mb-3"
        >
          <Form.Control
            type="url"
            placeholder="YouTube Embed Link"
            name="youtube_link"
            value={formInput.youtube_link}
            onChange={handleLink}
            required
          />
        </FloatingLabel>
        <Button type="submit" variant="outline-dark" className="m-1 text-color-drkblu">{songObj.firebaseKey ? 'update' : 'create'}</Button>
      </Form>
    </div>
  );
}

SongForm.propTypes = {
  songObj: PropTypes.shape({
    artist: PropTypes.string,
    youtube_link: PropTypes.string,
    title: PropTypes.string,
    firebaseKey: PropTypes.string,
    user_id: PropTypes.string,
  }),
};

SongForm.defaultProps = {
  songObj: initialStateSong,
};
