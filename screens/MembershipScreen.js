import React, { useState} from 'react';
import {Container, Row, Col, Button, Image, Card} from 'react-bootstrap';
import slika from '../assets/images/team.jpg';
import heart from '../assets/images/heart.png';
import member from '../assets/images/member.png';
import like from '../assets/images/like1.png';
import play from '../assets/images/play.png';
import lady from '../assets/images/lady1.jpg';
import Modal from '../components/Modal';
import MemberForm from '../components/MemberForm';
import MemberFormHeader from '../components/MemberFormHeader';



const MembershipScreen = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return(
<Container>
    <Container className="my-4">
        <Row lg={2} md={2} sm={1} xs={1} style={{display: 'flex', justifyContent: 'center'}}>
            <Col>
                <Container>
                    <h3 style={{textAlign: 'center'}}>Accelerate Your Startup or Career.</h3>
                    <p style={{textAlign: 'center', marginTop: '5px'}}>We bring you the best curated opportunities, network, projects, and more.</p>
                    <Button className="center" onClick={handleShow} style={{marginTop: '3rem', marginBottom: '2rem'}} variant="primary">BECOME A MEMBER</Button>
                    <Modal 
                    show={show}
                    onHide={handleClose}
                    title={<MemberFormHeader />}
                    body={<MemberForm 
                        
                        />}
                    />
                </Container>
            </Col>
            <Col>
                <Image src={slika} sizes="500px250" fluid />
            </Col>
        </Row>
    </Container>
    <Container>
        <Row className="my-4" lg={2} md={2} sm={1} xs={1}>
            <Col className="my-4" style={{display: 'flex', justifyContent:'center'}}>
        <Card style={{width: '15rem'}}>
        <Card.Img 
            variant="top" 
            src={play} 
            />
            <Card.Body>
            <Card.Title>
Content Collaboration </Card.Title>
            <Card.Text>
            We work with you to write awesome content to increase brand awareness.            </Card.Text>
            </Card.Body>
        </Card>
            </Col>
            <Col className="my-4" style={{display: 'flex', justifyContent:'center'}}>
            <Card style={{width: '15rem'}}>
        <Card.Img 
            variant="top" 
            src={like} 
            />
            <Card.Body>
            <Card.Title>
Free Online Events</Card.Title>
            <Card.Text>
            Visit our events.
            </Card.Text>
            </Card.Body>
        </Card>
            </Col>
        </Row>
        <Row className="my-4" lg={2} md={2} sm={1} xs={1}>
            <Col className="my-4" style={{display: 'flex', justifyContent:'center'}}>
            <Card style={{width: '15rem'}}>
        <Card.Img 
            variant="top" 
            src={member} 
            />
            <Card.Body>
            <Card.Title>Access to Startup Courses & Downloads</Card.Title>
            <Card.Text>
            Get started with breaking into startups or building your dream company.
            </Card.Text>
            </Card.Body>
        </Card>
            </Col>
            <Col className="my-4" style={{display: 'flex', justifyContent:'center'}}>
            <Card style={{width: '15rem'}}>
        <Card.Img 
            variant="top" 
            src={heart} 
            />
            <Card.Body>
            <Card.Title>
Get support with product launch</Card.Title>
            <Card.Text>
            Submit your project with our community to get connected with users.
            </Card.Text>
            </Card.Body>
        </Card>
            </Col>
        </Row>
    </Container>
    <Container>
        <p style={{textAlign: 'center'}}>Designed for careers of tomorrow. In addition to courses and unlimited access to events we offer:</p>
        <Container className="my-4">
            <Row lg={1} md={1} sm={1} xs={1}>
                <Col>
                <Image src={lady} sizes="500px250" rounded fluid/>
                </Col>
                <Col>
                    <Container>
                        <h3 style={{color: '#b00b4a'}}>Get Matched with Projects</h3>
                        <p style={{textAlign: 'left'}}>Looking to build up your portfolio? No problemo! We match up with the best projects that is aligned with your skill sets and interests. </p>
                    </Container>
                    <Container>
                    <h3 style={{color: '#b00b4a'}}>Hand-pick coffee matches </h3>
                        <p style={{textAlign: 'left'}}>Get warm introductions to connections that can help you grow your career. </p>
                    </Container>
                </Col>
            </Row>
        </Container>
    </Container>
</Container>
    )
}

export default MembershipScreen;