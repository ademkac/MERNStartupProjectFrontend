import React, { useEffect, useState, } from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';



const EventsByIdScreen = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedEvent, setLoadedEvent] = useState();
    const eventId = useParams().eventId;
    
    useEffect(()=>{
        const fetchEvent = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`
                );
                setLoadedEvent(responseData.event)
            } catch (err) {
                
            }
        };
        fetchEvent();
    }, [sendRequest, eventId])


    let content;
    if(!isLoading && loadedEvent === null){
        content=<h1>nesto nije u redu!!!</h1>
    }

    if(!isLoading && loadedEvent){
        content=(
            <Container>
                <Container className="my-4" fluid>
                    <Row><Col>
                    <Image src={`${process.env.REACT_APP_BACKEND_URL}/${loadedEvent.image}`} style={{width: '100%', maxHeight: '400px'}}/>
                    </Col></Row>
                </Container>
               <Row style={{marginTop: '10rem'}} lg={2} md={2} sm={1} xs={1}>
                   <Col  lg={8} md={8} >
                        <h3 >{loadedEvent.naslov}</h3>
                        <p style={{marginTop: '4rem', fontFamily: 'sans-serif', font: '16'}}>{loadedEvent.opis}</p>
                   </Col>
                   <Col  lg={4} md={4} >
                        <ul>
                            <li>
                                <h4>Date</h4>
                                <p>{loadedEvent.datum}</p>
                            </li>
                            <li>
                                <h4>Location</h4>
                                <p> {loadedEvent.lokacija} </p>
                            </li>
                            <li>
                                <h4>Session Duration</h4>
                                <p> 60 Minutes </p>
                            </li>
                            <li>
                                <h4>FREE for Members</h4>
                                <p> Members get access to all events and programming for FREE. Not a member yet? </p>
                                <Link to='/membership'>
                                <Button variant="danger">BECOME A MEMBER</Button>
                                </Link>
                            </li>
                        </ul>
                   </Col>
               </Row>
            </Container>
        )
    }

    return (
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {content}
        </Container>
    )
}

export default EventsByIdScreen;