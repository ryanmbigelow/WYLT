import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createUser, getUser, updateUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';
import { signOut } from '../../utils/auth';

const initialStateUser = {
  username: '',
  profile_picture: '',
  uid: '',
  firebaseKey: '',
};

export default function UserForm({ obj }) {
  const [formInput, setFormInput] = useState({
    ...initialStateUser,
    uid: obj.uid,
  });
  const router = useRouter();
  const { setUser, uid } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateUser(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid };
      createUser(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateUser(patchPayloadFBK).then(() => {
          getUser(uid).then((userData) => {
            setUser(userData);
            router.push('/');
          });
        });
      });
    }
  };

  return (
    <div className="board-form-container">
      <Head><title>{obj.firebaseKey ? 'update' : 'create an'} account</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">{obj.firebaseKey ? 'update' : 'create an'} account</h2>
        <div className="mt-5" />
        <div className=""><b>username</b></div>
        <FloatingLabel
          controlId="floatingInput1"
          label="username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="username"
            name="username"
            value={formInput.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className=""><b>profile image</b></div>
        <FloatingLabel
          controlId="floatingInput2"
          label="right click or cmd+click on an image from another website and select &apos;copy image address&apos;"
          className="mb-3"
        >
          <Form.Control
            type="url"
            placeholder="profile image"
            name="profile_picture"
            value={formInput.profile_picture}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="bigbuttonsflexbox">
          <Button type="submit" variant="outline-dark" className="m-1">{obj.firebaseKey ? 'update' : 'create'}</Button>
          <Button type="button" className="m-1" onClick={signOut}>sign out</Button>
        </div>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    username: PropTypes.string,
    profile_picture: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialStateUser,
};
