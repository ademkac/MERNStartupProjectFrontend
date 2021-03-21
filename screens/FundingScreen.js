import React from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import slika from '../assets/images/Startup-Funding.png';
import slika1 from '../assets/images/Startup-Funding2.png';
import slika2 from '../assets/images/Startup-Funding3.jpg';
import slika3 from '../assets/images/Startup-Funding4.png'; 
import slika4 from '../assets/images/Startup-Funding5.png'; 
import slika5 from '../assets/images/Startup-Funding6.png'; 



const FundingScreen = () => {

return(
    <Container>
        <Container className="my-4">
            <h3>Raise Funds for Your Startup</h3>
            <p>Here we have all the lists of funding for your startup. This includes both dilutive and non-dilutive funding. Non-dilutive funding means you won’t lose equity in your startup. This can get accomplished via: startup competitions prizes, grants, and other ways. For dilutive funding, this is done via venture capital, funding through accelerator programs, crowdfunding, or other ways.</p>
        </Container>
        <Container className="my-4">
            <Row lg={3} md={2} sm={1} xs={1}>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        Startup Funding Non-dilutive Sources
                        </Card.Text>
                        <LinkContainer style={{width:'100%'}} to="/funding1">
                        <Button style={{width: '100%'}} variant="info">View</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika1} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        Startup Funding Dilutive Sources
                        </Card.Text>
                        <LinkContainer style={{width:'100%'}} to="/funding2">
                        <Button style={{width:'100%'}} variant="info">View</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika2} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        Raise Funds with Equivesto
                        </Card.Text>
                        <a style={{width:'100%'}} href="https://equivesto.com/companies" target="_blank" rel="noopener noreferrer">
                        <Button style={{width:'100%'}} variant="info">View</Button>
                        </a>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika3} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        Top Global Startup Competitions
                        </Card.Text>
                        <LinkContainer style={{width:'100%'}} to="/funding4">
                        <Button style={{width:'100%'}} variant="info">View</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika4} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        List of Up Coming Startup Competitions
                        </Card.Text>
                        <LinkContainer style={{width:'100%'}} to="/funding5">
                        <Button style={{width:'100%'}} variant="info">View</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
                <Col className="my-3">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={slika5} style={{width: '100%', height: '100px'}} />
                    <Card.Body>
                        <Card.Text>
                        Funding for COVID-19 Projects
                        </Card.Text>
                        <LinkContainer style={{width:'100%'}} to="/funding6">
                        <Button style={{width:'100%'}} variant="info">View</Button>
                        </LinkContainer>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            {/* ////////////////////////////////////////////////////////////// */}
        </Container>
    </Container>

)

}

export default FundingScreen;