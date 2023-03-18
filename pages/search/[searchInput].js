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
  const { user } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    getUsers().then((userArr) => {
      const appUserObj = userArr.find((userObj) => userObj.uid === user.uid);
      setAppUser(appUserObj);
    });
  };
  useEffect(() => {
    getAppUser();
  }, [user]);

  const [searchSongResults, setSearchSongResults] = useState([]);
  const [searchUserResults, setSearchUserResults] = useState([]);

  const router = useRouter();
  const { searchInput } = router.query;

  const getSearchSongResults = () => {
    getAllSongs().then((searchResultsArray) => {
      console.warn(searchResultsArray);
      const filterResults = searchResultsArray.filter((songs) => songs.title.toLowerCase().includes(searchInput)
      || songs.artist.toLowerCase().includes(searchInput));
      setSearchSongResults(filterResults);
      console.warn(filterResults);
    });
  };
  const getSearchUserResults = () => {
    getUsers().then((searchResultsArray) => {
      console.warn(searchResultsArray);
      const filterResults = searchResultsArray.filter((users) => users.username.toLowerCase().includes(searchInput));
      setSearchUserResults(filterResults);
      console.warn(filterResults);
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
      <div className="d-flex flex-wrap">
        {searchSongResults.map((obj) => (
          <SongCard key={obj.firebaseKey} songObj={obj} onUpdate={getSearchSongResults} />
        ))}
      </div>
      <div className="d-flex flex-wrap">
        {searchUserResults.map((obj) => (
          <FriendCard key={obj.firebaseKey} friendObj={obj} onUpdate={getSearchUserResults} appUser={appUser} />
        ))}
      </div>
    </div>
  );
}
