import PropTypes from 'prop-types';
import UserForm from '../components/forms/UserForm';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // if the user === NO USER, that means there was no fbUser.uid so we are returning the UserForm here
  if (user === 'NO USER') {
    return <UserForm user={user} />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <>
        <NavBar user={user} /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
