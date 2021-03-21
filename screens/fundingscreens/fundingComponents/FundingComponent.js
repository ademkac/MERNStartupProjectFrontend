import React from 'react';
import { Container } from 'react-bootstrap';


const FundingComponent = (props) => {

    


    return(
        <Container className="justify" style={{marginBottom:'3rem' , backgroundColor: '#0b4463', padding: '2rem', boxShadow: '10px 10px 5px grey', width: '80%'}}>
            <h3 className="my-3">{props.podtip}</h3>
            <h6 className="my-3">{props.naslov}</h6>
            <p className="my-3">{props.text}</p>
            <p  style={{padding: '1rem'}}>For more details: </p>
            <a style={{fontSize: '3vw'}} href={props.link} target="_blank" rel="noopener noreferrer">{props.link}</a>
        </Container>
    )
}

export default FundingComponent;
