import React from 'react';
import {Link} from 'react-router-dom'
import {Container, Row, Col, Image} from 'react-bootstrap';
import Samed from '../assets/images/samed1.jpg';
import Adem from '../assets/images/adem.jpg';


const AboutScreen = () => {

return(
    <Container>
        <Container className="my-4" style={{width: '70%', margin: '0 auto'}}>
            <h3 style={{textAlign: 'center'}}>About StartupSite</h3>
            <p style={{textAlign: 'left' ,marginTop: '3rem'}}>“A startup that helps other startups” that’s how our friends describe us.
             StartupSite started as a side-project. Today, we look forward to your impressions of how you like the site. :)
                <span><Link to="/contact" variant="info"> Shoot us a message! </Link></span>
            </p>
        </Container>
        <hr/>
        <Container className="my-4" style={{width: '100%', margin: '50 auto'}}>
            <Row style={{display: 'flex', justifyContent: 'center'}} lg={2} md={2} sm={1} xs={1} >
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Samed} roundedCircle style={{width: '171px', height: '180px'}} title="Samed Kozar"/>
                    <Container style={{display: 'block'}}>
                    <h3>Samed Kozar</h3>
                    <p>Project Lead</p>
                    </Container>
                </Col>
                <Col style={{display: 'flex', justifyContent: 'center'}}>
                    <Image src={Adem} roundedCircle style={{width: '171px', height: '180px'}} title="Adem Kacapor" />
                    <Container style={{display: 'block'}}>
                    <h3>Adem Kacapor</h3>
                    <p>Advisor</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    </Container>
);

}

export default AboutScreen;