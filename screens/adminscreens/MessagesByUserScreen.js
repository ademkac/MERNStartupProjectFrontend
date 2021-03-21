import React, { useContext, useEffect, useState } from 'react';
import {useHttpClient} from '../../reducers/http-hook';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import MessagesList from '../../components/UserComponent/MessagesList';
import { Link, useParams } from 'react-router-dom';
import Button from '../../custom/components/FormElements/Button';
import { AuthContext } from '../../reducers/auth-context';


const MessagesByUserScreen = (props) => {

    const auth = useContext(AuthContext)
    const [loadedMessages, setloadedMessages] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const userId = useParams().userId;
    const username = props.match.params.name;
    const room = `ResponseTo${username}`;
    const name = "StartupSite";

    useEffect(()=>{
        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/messages/user/${userId}`
                );
                setloadedMessages(responseData.messages);
            } catch (err) {
                
            }
        };
        fetchMessages();
    }, [sendRequest, userId])  


return(

    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        <h3 className="center my-3">All messages</h3>
        <div className="center my-3">
            <Link to={`/chat?room=${room}&name=${name}&uid=${userId}&sender=${auth.userId}`}>
                <Button>Response</Button>
            </Link>
        </div>
        {!isLoading && loadedMessages && (
            <MessagesList items={loadedMessages} />
        )}
    </React.Fragment>
  
);

}

export default MessagesByUserScreen;