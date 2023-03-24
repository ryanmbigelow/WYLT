/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/userData';
import { getAllSongs } from '../../api/songData';
import SongCard from '../../components/cards/SongCard';
import FriendCard from '../../components/cards/FriendCard';
import { useAuth } from '../../utils/context/authContext';

export default function SearchResult() {
  // FUNCTION TO GET THE APP USER OBJECT
  const { uid } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getUsers().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [uid]);

  const [searchSongResults, setSearchSongResults] = useState([]);
  const [searchUserResults, setSearchUserResults] = useState([]);

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchSongResults = () => {
    getAllSongs().then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((songs) => songs.title.toLowerCase().includes(searchInput)
      || songs.artist.toLowerCase().includes(searchInput));
      setSearchSongResults(filterResults);
    });
  };
  const getSearchUserResults = () => {
    getUsers().then((searchResultsArray) => {
      const filterResults = searchResultsArray.filter((users) => users.username.toLowerCase().includes(searchInput));
      setSearchUserResults(filterResults);
    });
  };

  useEffect(() => {
    getSearchSongResults();
    return () => {
      setSearchSongResults([]);
    };
  }, [searchInput]);

  useEffect(() => {
    getSearchUserResults();
    return () => {
      setSearchUserResults([]);
    };
  }, [searchInput]);

  return (
    <div>
      <h3 className="pageheaderflexwrap">songs</h3>
      <div className="songcardcontainer">
        {searchSongResults.length === 0 ? (<h5>no songs found</h5>)
          : (searchSongResults.map((song) => (
            <SongCard key={song.firebaseKey} songObj={song} onUpdate={getSearchSongResults} />
          )))}
      </div>
      <h3 className="pageheaderflexwrap">users</h3>
      <div className="friendcardcontainer">
        {searchUserResults.length === 0 ? (<h5>no users found</h5>)
          : (searchUserResults.map((follow) => (
            <FriendCard key={follow.firebaseKey} friendObj={follow} onUpdate={getSearchUserResults} appUser={appUser} />
          )))}
      </div>
    </div>
  );
}
