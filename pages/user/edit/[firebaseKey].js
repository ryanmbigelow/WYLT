import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleUser } from '../../../api/userData';
import UserForm from '../../../components/forms/UserForm';

export default function EditUserInfo() {
  const [editUser, setEditUser] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(firebaseKey).then(setEditUser);
  }, [firebaseKey]);

  return (
    <UserForm obj={editUser} />
  );
}
