import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'

const MessageItem = (props) => {


    return(
                
            <Container style={{marginBottom: '1rem', backgroundColor: '#15abad', padding: '1rem', boxShadow: '10px 10px 5px grey', width: '70%'}}>
                <Row lg={2} md={2} sm={2} xs={1}>
                    <Col><span style={{marginRight: '2rem'}}>Message no: {props.broj}</span>{props.text}</Col>
                    <Col style={{float: 'right'}}><span style={{marginRight: '3rem'}}>Created at: </span>{props.createdAt}</Col>
                </Row>
            </Container>
                
           
    )
}

export default MessageItem;