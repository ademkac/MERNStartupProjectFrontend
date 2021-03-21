import React from 'react';

import UserItem from './UserItem';
import './UsersList.css';

const UsersList = props => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        
          <h2>No users found.</h2> 
        
      </div>
    );
  }

  const checkConfirmed = (user) => {
    return user.confirmed === true
  }

  return (
    <ul className="users-list">
      {props.items.filter(checkConfirmed).map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          messageCount={user.messages.length}

        />
      ))}
    </ul>
  );
};

export default UsersList;
