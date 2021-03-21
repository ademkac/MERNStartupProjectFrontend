import React from 'react';

import MessageItem from './MessageItem';
import {Container} from 'react-bootstrap'

const MessageList = props => {

    if(props.items.length === 0){
        return(
            <div className="center">
                <h3>Trenutno nema poruka</h3>
            </div>
        );
    }

    return(
        <Container>
            {props.items.map((message, br) => ( 
                <MessageItem 
                broj={br}
                key={message.id}
                id={message.id}
                text={message.text}
                createdAt={message.createdAt}
                creatorId={message.user}
                />
            ))}
         </Container>
    )
}


export default MessageList;