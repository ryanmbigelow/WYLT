import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

// GET ALL FOLLOWS
const getFollows = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows.json?orderBy="follower_id"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

// CREATE FOLLOW
const createFollow = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows.json`, {
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
// GET SINGLE FOLLOW
const getSingleFollow = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE FOLLOW
const deleteSingleFollow = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// UPDATE FOLLOW
const updateFollow = (payload) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/follows/${payload.firebaseKey}.json`, {
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
  getFollows,
  getSingleFollow,
  deleteSingleFollow,
  updateFollow,
  createFollow,
};
