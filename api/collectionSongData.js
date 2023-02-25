import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL COLLECTION SONGS
const getCollectionSongs = () => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs.json`, {
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

// CREATE COLLECTION SONG
const createColletionSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs.json`, {
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
// GET SINGLE COLLECTION SONG
const getSingleCollectionSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE COLLECTION SONG
const deleteSingleCollectionSong = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs/${firebaseKey}.json`, {
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
const updateCollectionSong = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/collectionSongs/${payload.firebaseKey}.json`, {
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
  getCollectionSongs,
  getSingleCollectionSong,
  deleteSingleCollectionSong,
  updateCollectionSong,
  createColletionSong,
};
