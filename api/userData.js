import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL USERS
const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// CREATE USER
const createUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// GET SINGLE USER
const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE USER
const deleteSingleUser = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// UPDATE USER
const updateUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET USER SONGS
const getUserSongs = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// GET USER COLLECTION
const getUserCollectionSongs = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  createUser,
  getUserSongs,
  getUserCollectionSongs,
};
