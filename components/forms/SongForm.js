// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { Button, FloatingLabel, Form } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import Head from 'next/head';
// import { createUser, getSingleUser, updateUser } from '../../api/userData';
// import { useAuth } from '../../utils/context/authContext';

// const initialStateSong = {
//   artist: PropTypes.string,
//   youtube_link: PropTypes.string,
//   title: PropTypes.string,
//   firebaseKey: PropTypes.string,
//   uid: PropTypes.string,
// };

// export default function SongForm({ obj }) {
//   const [formInput, setFormInput] = useState({
//     ...initialStateSong,
//     uid: obj.uid,
//   });
//   const router = useRouter();
//   const { setUser, uid } = useAuth();

//   useEffect(() => {
//     if (obj.firebaseKey) setFormInput(obj);
//   }, [obj]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.firebaseKey) {
//       updateUser(formInput).then(() => router.push('/'));
//     } else {
//       const payload = { ...formInput, uid };
//       createUser(payload).then(({ name }) => {
//         const patchPayloadFBK = { firebaseKey: name };
//         updateUser(patchPayloadFBK).then(() => {
//           getSingleUser(uid).then((userData) => {
//             setUser(userData);
//             router.push('/');
//           });
//         });
//       });
//     }
//   };

//   return (
//     <div className="board-form-container">
//       <Head><title>Create an Account</title></Head>

//       <Form onSubmit={handleSubmit} className="text-color-drkblu">
//         <h2 className="mt-5 text-center">Create an Account</h2>
//         <div className="mt-5" />
//         <div className="">Username</div>
//         <FloatingLabel
//           controlId="floatingInput1"
//           label="Username"
//           className="mb-3"
//         >
//           <Form.Control
//             type="text"
//             placeholder="Username"
//             name="username"
//             value={formInput.username}
//             onChange={handleChange}
//             required
//           />
//         </FloatingLabel>
//         <div className="">Profile Image</div>
//         <FloatingLabel
//           controlId="floatingInput2"
//           label="Profile Picture Image URL"
//           className="mb-3"
//         >
//           <Form.Control
//             type="url"
//             placeholder="Profile Picture Image URL"
//             name="profile_picture"
//             value={formInput.profile_picture}
//             onChange={handleChange}
//             required
//           />
//         </FloatingLabel>
//         <Button type="submit" variant="outline-dark" className="m-2 text-color-drkblu">{obj.firebaseKey ? 'Update' : 'Create'}</Button>
//       </Form>
//     </div>
//   );
// }

// SongForm.propTypes = {
//   songObj: PropTypes.shape({
//     artist: PropTypes.string,
//     youtube_link: PropTypes.string,
//     title: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     uid: PropTypes.string,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };
