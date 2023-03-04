import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createSong, updateSong } from '../../api/songData';
import { useAuth } from '../../utils/context/authContext';

const initialStateSong = {
  artist: '',
  youtube_link: '',
  title: '',
  firebaseKey: '',
  uid: '',
};

export default function SongForm({ songObj }) {
  const [formInput, setFormInput] = useState(initialStateSong);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (songObj.firebaseKey) setFormInput(songObj);
  }, [songObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (songObj.firebaseKey) {
      updateSong(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createSong(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateSong(patchPayloadFBK).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <div>
      <Head><title>{songObj.firebaseKey ? `Update ${songObj.title}` : 'Create Song'}</title></Head>
      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{songObj.firebaseKey ? `Update ${songObj.title}` : 'Create Song'}</h2>
        <div className="mt-5" />
        <div className="">Title</div>
        <FloatingLabel
          controlId="floatingInput1"
          label="Song Title"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Song Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Artist</div>
        <FloatingLabel
          controlId="floatingInput2"
          label="Artist"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Artist"
            name="artist"
            value={formInput.artist}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">YouTube Embed Link</div>
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
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Button type="submit" variant="outline-dark" className="m-2 text-color-drkblu">{songObj.firebaseKey ? 'Update' : 'Create'}</Button>
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
    uid: PropTypes.string,
  }),
};

SongForm.defaultProps = {
  songObj: initialStateSong,
};
