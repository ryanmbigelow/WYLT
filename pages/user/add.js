import React, { useEffect, useState } from 'react';
import FriendCard from '../../components/cards/FriendCard';
import { getUsers } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

export default function AddFriends() {
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

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getUsers().then(setFollows);
  };
  useEffect(() => {
    getAllFollows();
  }, [appUser]);

  return (
    <div>
      <h1 className="pageheaderflexwrap">wylt? community</h1>
      <div className="friendcardcontainer">
        {follows.map((follow) => (
          <FriendCard key={follow.firebaseKey} friendObj={follow} onUpdate={getAllFollows} onUpdate2={getAllFollows} appUser={appUser} />
        ))}
      </div>
    </div>
  );
}
