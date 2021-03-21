import React, {useState} from 'react'

const HeaderComponent = () => {

  const [show, setShow] = useState(false)

 

  const w3_open = () => {
    if(show){
      setShow(false)
    }else{
      setShow(true)
    }
    console.log(show)
  }
  
  // Close the sidebar with the close button
  const w3_close = () => {
      setShow(false)
      console.log(show)
  }

    return (
        <div>
        <div className="w3-top" style={{ position: 'static'}}>
  <div className="w3-bar w3-white w3-card" id="myNavbar">
    <LinkContainer className="w3-bar-item w3-button" to='/'>
      <Navbar.Brand ><span><Image src={startupimg} width='170px' height='50px' rounded /></span>StartupSite</Navbar.Brand>
    </LinkContainer>
    {/* <!-- Right-sided navbar links --> */}
    <div className="w3-right w3-hide-small">
      <LinkContainer className="w3-bar-item w3-button" to='/jobs'>
        <Nav.Link><i className='fas fa-business-time'></i> Startup jobs</Nav.Link>     
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/events'>
      < Nav.Link><i className='fas fa-calendar-alt'></i> Events</Nav.Link>  
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/downloads'>
        <Nav.Link><i className='fas fa-download'></i> Downloads</Nav.Link>     
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/funding'>
        <Nav.Link><i className='fas fa-hand-holding-usd'></i> Funding</Nav.Link>   
      </LinkContainer>
      {auth.userId === '5fe99c14f47ddf03488ddabf' && (
          <NavDropdown className="nav-link dropdown-toggle" title="Admin stranice" id="basic-nav-dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {/* <LinkContainer className="w3-bar-item w3-button" to="/eventsCreate">
              <NavDropdown.Item>Kreiranje dogadjaja</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer className="w3-bar-item w3-button" to="/downloadsCreate">
              <NavDropdown.Item>Kreiranja snimaka</NavDropdown.Item>
            </LinkContainer> */}
 
          </NavDropdown>
        )}
        <NavDropdown className="w3-bar-item w3-button" title="Explore" id="navbarDropdown">
        {!auth.isLoggedIn && (
          <LinkContainer className="w3-bar-item w3-button" to='/login'>
          <NavDropdown.Item><i className='fas fa-user'></i> Member login</NavDropdown.Item>
          </LinkContainer>
        )}
        {auth.isLoggedIn && (
          
          <NavDropdown.Item><i onClick={auth.logout} className="fas fa-sign-out-alt">logout</i></NavDropdown.Item>
          
        )}
        <LinkContainer className="w3-bar-item w3-button" to='/post-a-job'>
        <NavDropdown.Item><i className='fas fa-plus'></i> Post a job</NavDropdown.Item>
          </LinkContainer>
        <LinkContainer className="w3-bar-item w3-button" to="/submitpost">
          <NavDropdown.Item><i className='fas fa-plus'></i> Submit a post</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown title="Projekti" id="basic-nav-dropdown">
          <LinkContainer className="w3-bar-item w3-button" to="/projects">
            <NavDropdown.Item >Svi projekti</NavDropdown.Item>
          </LinkContainer>
          {auth.isLoggedIn && (
            <LinkContainer className="w3-bar-item w3-button" to="/:userId/projects">
              <NavDropdown.Item  >Moji projekti</NavDropdown.Item>
            </LinkContainer>
          )}
        </NavDropdown>
          <LinkContainer className="w3-bar-item w3-button" to="/contact">
        <NavDropdown.Item>Contact</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer className="w3-bar-item w3-button" to="/about">
        <NavDropdown.Item>About</NavDropdown.Item>
        </LinkContainer>
      </NavDropdown>
    </div>
    {/* <!-- Hide right-floated links on small screens and replace them with a menu icon --> */}

    <a className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onClick={w3_open}>
      <i className="fa fa-bars"></i>
    </a>
  </div>
</div>

 {/* Sidebar on small screens when clicking the menu icon  */}
<nav className="w3-sidebar w3-bar-block w3-black w3-card w3-animate-right w3-hide-medium w3-hide-large" style={{display: show ? 'block' : 'none', right: 0}} id="mySidebar">
  <a style={{textDecoration: 'none'}} onClick={w3_close} className="w3-bar-item w3-button w3-large w3-padding-16">Close ×</a>
  <LinkContainer  className="w3-bar-item w3-button" to='/jobs'>
        <Nav.Link><i className='fas fa-business-time'></i> Startup jobs</Nav.Link>     
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/events'>
      < Nav.Link><i className='fas fa-calendar-alt'></i> Events</Nav.Link>  
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/downloads'>
        <Nav.Link><i className='fas fa-download'></i> Downloads</Nav.Link>     
      </LinkContainer>
      <LinkContainer className="w3-bar-item w3-button" to='/funding'>
        <Nav.Link><i className='fas fa-hand-holding-usd'></i> Funding</Nav.Link>   
      </LinkContainer>
</nav>

</div>
    )
}

export default HeaderComponent;