import React from 'react';
import Card from '../../custom/components/Card';
import {Link} from 'react-router-dom';
import './UserItem.css'

const UserItem = props => {

    

    

    let content;

    for(let m in props.members){
        if(props.name === m.name){
            content = (
            <span style={{marginLeft: '1rem'}} data-toggle="tooltip" title="Member of our team!" data-placement="right" className="badge badge-dark"><i style={{color:'yellow'}} className="fas fa-crown"></i></span>
            )
        } else {
            content = null;
        }
    }

    return(
        <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/messages/${props.id}/${props.name}`}>
          <div className="user-item__info">
              
            <h2>{props.name}
            {content}
            </h2>
            <h3>
              {props.messageCount} {props.messageCount === 1 ? 'Message' : 'Messages'}
            </h3>
          </div>
        </Link>
      </Card> 
    </li>
    )
}

export default UserItem;