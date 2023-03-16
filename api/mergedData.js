import { deleteSingleSong, getSongs } from './songData';
import {
  deleteSingleUser, getSingleUser, getUserCollectionSongs, getUserSongs,
} from './userData';
import { deleteSingleFollow, getFollows } from './followData';

// GET A USER AND THEIR SONGS
const getUserSongsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleUser(firebaseKey).then((userObject) => {
    getUserSongs(userObject.uid).then((songArr) => resolve({ ...userObject, songArr }));
  }).catch(reject);
});

// GET A USER AND THEIR COLLECTION SONGS
const getUserCollectionSongsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleUser(firebaseKey).then((userObject) => {
    getUserCollectionSongs(userObject.uid).then((songArr) => resolve({ ...userObject, songArr }));
  }).catch(reject);
});

// DELETE USER, SONGS, AND FOLLOWS
const deleteUserSongsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getSongs(firebaseKey).then((userSongsArray) => {
    const deleteSongPromises = userSongsArray.map((song) => deleteSingleSong(song.firebaseKey));
    Promise.all(deleteSongPromises);
  }).then(
    getFollows(firebaseKey).then((userFollowsArray) => {
      const deleteUserFollowsPromises = userFollowsArray.map((follow) => deleteSingleFollow(follow.firebaseKey));

      Promise.all(deleteUserFollowsPromises).then(() => {
        deleteSingleUser(firebaseKey).then(resolve);
      });
    }),
  ).catch(reject);
});

// GET USERS BY USER FOLLOWS
const getUserFollows = (firebaseKey) => new Promise((resolve, reject) => {
  getFollows(firebaseKey).then((followArr) => {
    const userFollowsArray = followArr.map((follow) => getSingleUser(follow.receiver_id));
    Promise.all(userFollowsArray).then(resolve);
  }).catch(reject);
});

// GET ALL SONGS FROM USER FOLLOWS
const getFollowsSongs = (firebaseKey) => new Promise((resolve, reject) => {
  getUserFollows(firebaseKey).then((followArr) => {
    const followsArray = followArr.map((follow) => getSongs(follow.firebaseKey));
    Promise.all(followsArray);
    console.warn(followsArray);
    followsArray.forEach((song) => resolve(song));
  }).catch(reject);
});

export {
  getUserSongsRelationship, getUserCollectionSongsRelationship, deleteUserSongsRelationship, getUserFollows, getFollowsSongs,
};
