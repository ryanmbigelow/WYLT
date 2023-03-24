/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap';
// import logo from '../images/logo.png';
import SearchBar from './SearchBar';
import { getUsers } from '../api/userData';
import { useAuth } from '../utils/context/authContext';

export default function NavBar({ user }) {
  // FUNCTION TO GET THE APP USER OBJECT
  const { uid } = useAuth();
  const [appUser, setAppUser] = useState({});
  const getAppUser = () => {
    if (user) {
      getUsers().then((userArr) => {
        const appUserObj = userArr.find((userObj) => userObj.uid === uid);
        setAppUser(appUserObj);
      });
    }
  };
  useEffect(() => {
    getAppUser();
  }, [user]);

  return (
    <Navbar expand="lg" id="navbar">
      <Container fluid>
        {/* <Nav.Link href="/">
          <Image src={logo} alt="logo" width={100} height={50} />
        </Nav.Link> */}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">home</Nav.Link>
            <NavDropdown title="add" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/song/new">add a song</NavDropdown.Item>
              <NavDropdown.Item href="/user/add">add friends</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <SearchBar className="d-flex" />
          <Nav.Link href={`/user/${appUser.firebaseKey}`}>
            <img src={appUser.profile_picture} alt="userURL" width="50px" height="50px" className="border-radius-image" />
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

NavBar.propTypes = {
  user: PropTypes.shape,
}.isRequired;
