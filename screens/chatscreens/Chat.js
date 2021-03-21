
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from './InfoBar';
import ChatInput from './ChatInput';
import Messages from './Messages';
import './Chat.css';
import { useHistory } from 'react-router-dom';


let socket

const Chat = ({location}) => {

/*     const custom = useContext(CustomContext)
 */    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // eslint-disable-next-line
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const history = useHistory()
    
    const connectionOptions = {
        "force new connection": true,
        "reconnectionAttempts": "Infinity",
        "timeout": 10000,
        "transports": ["websocket"]
    };

    useEffect(()=>{
         const {name, room, uid} = queryString.parse(location.search);
        
        socket = io(`${process.env.REACT_APP_BACKEND_URL}`, connectionOptions)

        setName(name);
        setRoom(room);

        socket.emit('join', {name, room, uid}, (error)=>{
            if(error){
                alert(error);
                history.push('/')
            }
        });

       // eslint-disable-next-line
    }, [ location.search])

    useEffect(()=>{
        

        socket.on('message', (message)=>{
            setMessages(messages => [...messages, message])
        });

        socket.on('roomData', ({users}) => {
            setUsers(users)
        });
    }, [])

    //function for sending messages
    const sendMessage = (event) =>{
        event.preventDefault();
        const {uid, sender} = queryString.parse(location.search);

        if(message){
            socket.emit('sendMessage', {message, uid, sender}, ()=> setMessage(''))
            /* custom.newMessage(uid); */
        }
    }


    return(
       
        <div className="outerContainer">
        <div className="containerr">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <ChatInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
        {/* <TextContainer users={users}/> */}
      </div>
            
    )
}

export default Chat;