import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import DownloadsListComponent from '../components/DownloadsComponent/DownloadsListComponent'
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';
const DownloadsScreen = () => {

    const [loadedDownloads, setLoadedDownloads] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(()=>{
        const fetchDownloads = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/downloads`
                );
                setLoadedDownloads(responseData.downloads)
            } catch (err) {
                
            }
        }
        fetchDownloads()
    }, [sendRequest])

return(
    <Container>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedDownloads && (
            <DownloadsListComponent items={loadedDownloads} />
        )}
            
    </Container>
);

}

export default DownloadsScreen;