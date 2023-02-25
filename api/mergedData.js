import { deleteSingleCollectionSong } from './collectionSongData';
import { deleteSingleSong } from './songData';
import {
  deleteSingleUser, getSingleUser, getUserCollectionSongs, getUserSongs,
} from './userData';

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

// DELETE USER, SONGS, AND COLLECTION SONGS
const deleteUserSongsRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getUserSongs(firebaseKey).then((userSongsArray) => {
    const deleteSongPromises = userSongsArray.map((song) => deleteSingleSong(song.firebaseKey));
    Promise.all(deleteSongPromises);
  }).then(
    getUserCollectionSongs(firebaseKey).then((userCollectionSongsArray) => {
      const deleteCollectionSongPromises = userCollectionSongsArray.map((song) => deleteSingleCollectionSong(song.firebaseKey));

      Promise.all(deleteCollectionSongPromises).then(() => {
        deleteSingleUser(firebaseKey).then(resolve);
      });
    }),
  ).catch(reject);
});

export { getUserSongsRelationship, getUserCollectionSongsRelationship, deleteUserSongsRelationship };
