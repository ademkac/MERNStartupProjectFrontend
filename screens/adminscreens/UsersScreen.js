import React, { useEffect, useState } from 'react';

import UsersList from '../../components/UserComponent/UsersList';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import {useHttpClient} from '../../reducers/http-hook'

const UsersScreen = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();
  const [loadedMembers, setLoadedMembers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users`
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };
    const fetchMember = async () => {
        try {
          const responseData = await sendRequest(
              `${process.env.REACT_APP_BACKEND_URL}/api/membership`
          );
            setLoadedMembers(responseData.members)
        } catch (err) {
            
        }
      }
    fetchMember();
    fetchUsers();
  }, [sendRequest]);
 
 

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && loadedMembers && <UsersList members={loadedMembers}  items={loadedUsers} />}
    </React.Fragment>
  );
};

export default UsersScreen;
