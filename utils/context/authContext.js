// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getSingleUser } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const [uid, setUid] = useState('');
  // we need to set the state of uid to determine whether or not the fbUser's uid already exists

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      // we use an async promise so that we can check for a user and then run await
      if (fbUser) {
        setUid(fbUser.uid);
        // if the fbUser already exists, they will have a uid
        await getSingleUser(fbUser.uid).then(async (response) => {
          if (Object.keys(response).length === 0) {
            setUser('NO USER');
            // if there is no user, the length of the object's keys is 0. therefore, we can setUser to NO USER which we will use later in the useMemo.
          } else {
            setUser(fbUser);
            // if the user's uid exists, we can set the user to fbUser.
          }
        });
      } else {
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
      uid,
      setUser,
      // uid and setUser become props that we can access when we call AuthProvider in other files.
    }),
    [user, uid],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
