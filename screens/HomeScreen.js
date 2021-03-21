import React from 'react';
import {Container, Row, Col, Image} from 'react-bootstrap';
import slika from '../assets/images/startup.jpeg';
import pulb from '../assets/images/pulb.png';
import code from '../assets/images/code.png';
import coffee from '../assets/images/coffee.png';
import user from '../assets/images/user.png';
import CardComponent from '../components/Card';

const HomeScreen = () => {

return(
    <div>
    <Container className="py-6 px-6 my-3">
        <Row lg={2} md={2} sm={1} xs={1}>
            <Col><h4>The Ultimate Hub for Starting a Startup
                    Discover startup job opportunities, courses, and grab coffee with the members. </h4></Col>

            <Col className="my-3"><Image src={slika} sizes="500px250" fluid/></Col>
        </Row>
    </Container>
    {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
    <Container className="py-6 px-6 my-3 mx-3">
        <Row lg={2} md={2} sm={2} xs={1} style={{ display: 'flex', justifyContent: 'center' }} className="px-3 my-3">
            <Col className="my-3" style={{display: 'flex', justifyContent:'center'}}>
                <CardComponent 
                style={{width: '16rem'}}
                src={code}
                title="Startup Jobs"
                text="Discover the best startups jobs at the fastest growing startups. You got talent, we got opportunities."
                path="/jobs"
                link="Learn more"
                icon="fas fa-arrow-right"
                />
            </Col>
            <Col className="my-3" style={{display: 'flex', justifyContent:'center'}}>
            <CardComponent 
                style={{width: '16rem'}}
                src={user}
                title="Membership"
                text="Grow your network. Get full access to online startup events, courses, and hand picked opportunities."
                path="/membership"
                link="Learn more"
                icon="fas fa-arrow-right"
                />
            </Col>
        </Row>
        <Row lg={2} md={2} sm={2} xs={1} className="px-3">
            <Col className="my-3" style={{display: 'flex', justifyContent:'center'}}>
            <CardComponent 
                style={{width: '16rem'}}
                src={pulb}
                title="Startup Events"
                text="We host monthly online cofounder, networking, and online job fair events."
                path="/events"
                link="Learn more"
                icon="fas fa-arrow-right"
                />
            </Col>
            <Col className="my-3" style={{display: 'flex', justifyContent:'center'}}>
            <CardComponent 
                style={{width: '16rem'}}
                src={coffee}
                title="Projects"
                text="Looking for a cofounder? No problem! Check out these opportunities to join a startup."
                path="/projects"
                link="Learn more"
                icon="fas fa-arrow-right"
                />
            </Col>
        </Row>
    </Container>
    </div>
)

}

export default HomeScreen;