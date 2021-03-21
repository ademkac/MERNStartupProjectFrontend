import React from 'react';

import './ChatInput.css';


const ChatInput = ({message, setMessage, sendMessage}) => {
    return(
        <form className="form" onSubmit={(event)=> sendMessage(event)}>
        <input 
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({target: {value} })=>setMessage(value)}
        onKeyPress={event=>event.key === 'Enter' ? sendMessage(event) : null} />
        <button onClick={e=>sendMessage(e)} className="sendButton">Send</button>
    </form>
    ) 
}

export default ChatInput