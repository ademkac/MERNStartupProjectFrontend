import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';


const CardComponent = (props) => {
    return(
        <Card style={props.style}>
            <Card.Img 
            variant="top" 
            src={props.src}
            style={props.slikaStyle} 
            />
            <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
                {props.text}
            </Card.Text>
            <Link to={props.path} variant="primary">{props.link} <i className={props.icon}></i></Link>
            </Card.Body>
        </Card>
    )
}

export default CardComponent;