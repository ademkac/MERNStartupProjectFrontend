import React, { useContext} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar, NavDropdown, Image, Container} from 'react-bootstrap'
import startupimg from '../assets/images/startup.png';
import {AuthContext} from '../reducers/auth-context';


  

const Header = () => {

    const auth = useContext(AuthContext);

return(

 <Navbar bg="light" variant='light' expand="lg" collapseOnSelect style={{backgroundColor: 'white', fontSize: 16}}>
  <Container>
    <LinkContainer to='/'>
  <Navbar.Brand ><span><Image src={startupimg} width='170px' height='90px' rounded /></span>StartupSite</Navbar.Brand>
    </LinkContainer>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
        <LinkContainer to='/jobs'>
      <Nav.Link><i className='fas fa-business-time'></i> Startup jobs</Nav.Link>     
        </LinkContainer>
        <LinkContainer to='/events'>
      <Nav.Link><i className='fas fa-calendar-alt'></i> Events</Nav.Link>  
        </LinkContainer>
        <LinkContainer to='/downloads'>
      <Nav.Link><i className='fas fa-download'></i> Downloads</Nav.Link>     
        </LinkContainer>
        <LinkContainer to='/funding'>
      <Nav.Link><i className='fas fa-hand-holding-usd'></i> Funding</Nav.Link>   
        </LinkContainer>
         {auth.userId === '60205515b75e62f9ac29022a' && (  
          <NavDropdown title="Admin pages" id="basic-nav-dropdown">
            <LinkContainer to="/eventsCreate">
              <NavDropdown.Item>Create event</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/downloadsCreate">
              <NavDropdown.Item>Create course</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/fundingCreate">
              <NavDropdown.Item>Create funding</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/check">
              <NavDropdown.Item>Check projects</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/checkJobs">
              <NavDropdown.Item>Check jobs</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/users">
              <NavDropdown.Item>Users</NavDropdown.Item>
            </LinkContainer>
          </NavDropdown>
          )}  
        
      <NavDropdown title="Explore" id="basic-nav-dropdown">
        {!auth.isLoggedIn && (
          <LinkContainer to='/login'>
          <NavDropdown.Item><i className='fas fa-user'></i> Login</NavDropdown.Item>
          </LinkContainer>
        )}
        {auth.isLoggedIn && (
          
          <NavDropdown.Item><i onClick={auth.logout} className="fas fa-sign-out-alt">logout</i></NavDropdown.Item>
          
        )}
        <LinkContainer to='/post-a-job'>
        <NavDropdown.Item><i className='fas fa-plus'></i> Post a job</NavDropdown.Item>
          </LinkContainer>
        <LinkContainer to="/submitpost">
          <NavDropdown.Item><i className='fas fa-plus'></i> Submit a project</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown  title="Projects" id="basic-nav-dropdown">
          <LinkContainer to="/projects">
            <NavDropdown.Item >All projects</NavDropdown.Item>
          </LinkContainer>
          {auth.isLoggedIn && (
            <LinkContainer to="/:userId/projects">
              <NavDropdown.Item >My projects</NavDropdown.Item>
            </LinkContainer>
          )}
        </NavDropdown>
          <LinkContainer to="/contact">
        <NavDropdown.Item>Contact</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to="/about">
        <NavDropdown.Item>About</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown> 
      {auth.userId !== '60205515b75e62f9ac29022a' && (
        <LinkContainer to="/inbox">
          <Nav.Link><i className="fas fa-inbox"></i> Inbox</Nav.Link>
      </LinkContainer>
      )}    
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar> 


);
}

export default Header;