import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET A USERS' SONGS
const getSongs = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json?orderBy="user_id"&equalTo="${firebaseKey}"`, {
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

// GET ALL SONGS
const getAllSongs = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json`, {
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

// CREATE SONG
const createSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs.json`, {
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
// GET SINGLE SONG
const getSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE SONG
const deleteSingleSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// UPDATE SONG
const updateSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/songs/${payload.firebaseKey}.json`, {
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

export {
  getSongs,
  getAllSongs,
  getSingleSong,
  deleteSingleSong,
  updateSong,
  createSong,
};
