// import React, { useAuth } from 'react';
// import PropTypes from 'prop-types';
// import { deleteSingleFollow } from '../../api/followData';

// export default function FriendCard({ friendObj, onUpdate }) {
//   const { user } = useAuth();

//   const deleteThisFriend = () => {
//     if (window.confirm(`Delete ${friendObj.username}?`)) {
//       deleteSingleFollow(friendObj.firebaseKey).then(() => onUpdate());
//     }
//   };

//   return (
//     <div>
//       Friend
//     </div>
//   );
// }

// FriendCard.propTypes = {
//   friendObj: PropTypes.shape({
//     username: PropTypes.string,
//     profile_picture: PropTypes.string,
//     firebaseKey: PropTypes.string,
//     uid: PropTypes.string,
//   }).isRequired,
//   onUpdate: PropTypes.func.isRequired,
// };
