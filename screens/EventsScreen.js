import React, { useEffect, useState } from 'react';
import {Container, Alert} from 'react-bootstrap';
import CarouselEventsComponent from '../components/CarouselComponent';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';


const EventsScreen = () => {

    const [loadedEvents, setLoadedEvents] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(()=>{
        const fetchEvents = async ()=>{
            try {
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_URL+'/api/events'
                );
                setLoadedEvents(responseData.events);
            } catch (err) {
                
            }
        }
        fetchEvents();
    }, [sendRequest])

return(
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Container className="my-3">
            <Alert variant="success">
            <Alert.Heading>
                Startup Events 
            </Alert.Heading>
            <p style={{fontWeight: 'bold'}}>Meet Co-founders. Beta users. Mentors.</p>
            </Alert>
            </Container>
            <Container style={{width: '70%',}}>
                {!isLoading && loadedEvents && (
                    <CarouselEventsComponent items={loadedEvents} />
                )}
                
            </Container>
            <Container className="my-4">
                <h3>Startup Events</h3>
                <p style={{textAlign:'left'}}>We bring out the best content and speakers to grow your startup or career. No need for awkward business cards or expensive tickets. Come and meet our members online and take those conversations offline. Our community Manager to ensure you have the best experience and meet great connections.</p>
            </Container>
        </Container>
)

}

export default EventsScreen;