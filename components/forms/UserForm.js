import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createUser, updateUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialStateUser = {
  name: '',
  profile_picture: '',
  uid: '',
  firebaseKey: '',
};

export default function UserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialStateUser);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

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
      router.push('/');
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(({ name }) => {
        const patchPayloadFBK = { firebaseKey: name };
        updateUser(patchPayloadFBK).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <div className="board-form-container">
      <Head><title>{obj.firebaseKey ? router.push('/') : 'Create an Account'}</title></Head>

      <Form onSubmit={handleSubmit} className="text-color-drkblu">
        <h2 className="mt-5 text-center">Username</h2>
        <div className="mt-5" />
        <div className="">Username</div>
        <FloatingLabel
          controlId="floatingInput1"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            value={formInput.username}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Description</div>
        <FloatingLabel
          controlId="floatingInput2"
          label="Description"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Description"
            style={{ height: '100px' }}
            name="description"
            value={formInput.description}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <div className="">Board Cover Image URL</div>
        <FloatingLabel
          controlId="floatingInput3"
          label="Image URL"
          className="mb-3"
        >
          <Form.Control
            type="url"
            placeholder="Cover Image URL"
            name="image"
            value={formInput.image}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
        <Form.Check
          className="mb-3"
          type="switch"
          id="privacy"
          name="isPublic"
          label="Public Board?"
          checked={formInput.isPublic}
          onChange={(e) => {
            setFormInput((prevState) => ({
              ...prevState,
              isPublic: e.target.checked,
            }));
          }}
        />
        <Button type="submit" variant="outline-dark" className="m-2 text-color-drkblu">{obj.firebaseKey ? 'Update' : 'Create'}</Button>
      </Form>
    </div>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    profile_picture: PropTypes.string,
    uid: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialStateUser,
};
