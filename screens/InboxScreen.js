import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { AuthContext } from '../reducers/auth-context';
import { useHttpClient } from '../reducers/http-hook';
import MessagesList from '../components/UserComponent/MessagesList';
/* import { useCustomHook } from '../reducers/custom-hook'; */

const InboxScreen = () => {

    const [loadedMessages, setLoadedMessages] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const auth = useContext(AuthContext);
    /* const {clearMessages} = useCustomHook() */

    useEffect(()=>{
        const fetchMessages = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/inbox/user/${auth.userId}`
                )
                setLoadedMessages(responseData.messages);
            } catch (err) {
                
            }
        }

        fetchMessages()
    }, [sendRequest, auth])

  /*   useEffect(()=>{
        clearMessages()
    }, []) */

    return(
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className='center'>
                    <LoadingSpinner />
                </div>
            )}
            <h3 className="center my-3">Inbox</h3>
            {!isLoading && loadedMessages && (
                <MessagesList items={loadedMessages} />
            )}

        </Container>
    )
}

export default InboxScreen;