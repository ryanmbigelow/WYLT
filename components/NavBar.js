/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { signOut } from '../utils/auth';
import { getUsers } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function NavBar({ user }) {
  // FUNCTION TO GET THE APP USER OBJECT
  console.warn(user);
  const { uid } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    if (user) {
      getUsers().then((userArr) => {
        const appUserObj = userArr.find((userObj) => userObj.uid === uid);
        setAppUser(appUserObj);
        console.warn(appUserObj);
      });
    }
  };
  useEffect(() => {
    getAppUser();
  }, [user]);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <Link passHref href="/">
          <a className="navbar-brand" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01">
            WYLT
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link passHref href="/">
                <a className="nav-link">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link passHref href={`/user/${appUser.firebaseKey}`}>
                <a className="nav-link">
                  Profile
                </a>
              </Link>
            </li>
            <button type="button" className="btn btn-danger" onClick={signOut}>
              Sign Out
            </button>
            <SearchBar />
          </ul>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape,
}.isRequired;
