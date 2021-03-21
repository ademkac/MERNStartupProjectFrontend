// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import JobsScreen from './screens/JobsScreen';
import LoginScreen from './screens/LoginScreen';
import EventsScreen from './screens/EventsScreen';
import DownloadsScreen from './screens/DownloadsScreen';
import FundingScreen from './screens/FundingScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ContactScreen from './screens/ContactScreen';
import AboutScreen from './screens/AboutScreen';
import SubmitPostScreen from './screens/SubmitPostScreen';
import PostAJobScreen from './screens/PostAJobScreen';
import MembershipScreen from './screens/MembershipScreen';
import CreateCoursesScreen from './screens/adminscreens/CreateCoursesScreen';
import CreateEventsScreen from './screens/adminscreens/CreateEventsScreen';
import CreateFundingScreen from './screens/adminscreens/CreateFundingScreen';
import ProjectsByUserIdScreen from './screens/ProjectsByUserIdScreen';
import JobsByIdScreen from './screens/JobsByIdScreen';
import ProjectByIdScreen from './screens/ProjectsByIdScreen';
import EventsByIdScreen from './screens/EventsByIdScreen';
import FundingScreen1 from './screens/fundingscreens/FundingScreen1'
import Chat from './screens/chatscreens/Chat';
import { AuthContext } from './reducers/auth-context';
import {useAuth} from './reducers/auth-hook';
import ProjectsUpdateScreen from './screens/ProjectsUpdateScreen';
import UsersScreen from './screens/adminscreens/UsersScreen';
import MessagesByUserScreen from './screens/adminscreens/MessagesByUserScreen';
import InboxScreen from './screens/InboxScreen';
import FundingScreen2 from './screens/fundingscreens/FundingScreen2';
import FundingScreen3 from './screens/fundingscreens/FundingScreen3';
import FundingScreen4 from './screens/fundingscreens/FundingScreen4';
import FundingScreen5 from './screens/fundingscreens/FundingScreen5';
import FundingScreen6 from './screens/fundingscreens/FundingScreen6';
import CheckScreen from './screens/adminscreens/CheckScreen';
import CheckJobs from './screens/adminscreens/CheckJobs';
import Confirm from './components/Confirm';

const App =()=> {



  const {token, login, logout, userId, name, email} = useAuth();

  const room = "StartupSite"

 
 

  let routes;


  

  if(token){
    routes=(
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/:userId/projects' component={ProjectsByUserIdScreen} exact />
        <Route path='/projects/:projectId' component={ProjectByIdScreen} exact/>
        <Route path='/messages/:userId/:name' component={MessagesByUserScreen} exact />
        <Route path='/project/:projectId' component={ProjectsUpdateScreen} exact/>
        <Route path='/jobs/:jobId' component={JobsByIdScreen} exact />
        <Route path='/events/:eventId' component={EventsByIdScreen} exact />
          <Route path='/jobs' component={JobsScreen} />
          <Route path='/events' component={EventsScreen} />
          <Route path='/downloads' component={DownloadsScreen} />
          <Route path='/funding' component={FundingScreen} />
          <Route path='/projects' component={ProjectsScreen} />
          <Route path='/contact' component={ContactScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/submitpost' component={SubmitPostScreen} />
          <Route path='/post-a-job' component={PostAJobScreen} />
          <Route path='/membership' component={MembershipScreen} />
          <Route path='/eventsCreate' component={CreateEventsScreen} />
          <Route path='/fundingCreate' component={CreateFundingScreen} />
          <Route path='/downloadsCreate' component={CreateCoursesScreen} />
          <Route path='/funding1' component={FundingScreen1}/>
          <Route path='/funding2' component={FundingScreen2} />
          <Route path='/funding3' component={FundingScreen3} />
          <Route path='/funding4' component={FundingScreen4} />
          <Route path='/funding5' component={FundingScreen5} />
          <Route path='/funding6' component={FundingScreen6} />
           <Route path='/chat' component={Chat} />
           <Route path='/users' component={UsersScreen} />
           <Route path='/inbox' component={InboxScreen} />
           <Route path='/check' component={CheckScreen} />
           <Route path='/checkJobs' component={CheckJobs} />
         <Redirect to="/" /> 
      </Switch>
    );
  }else{
    routes=(
      <Switch>
        <Route path='/' component={HomeScreen} exact/>
        <Route path='/projects/:projectId' component={ProjectByIdScreen} exact/>
        <Route path='/events/:eventId' component={EventsByIdScreen} exact />
        <Route path='/jobs/:jobId' component={JobsByIdScreen} exact />
        <Route path='/confirm/:id' component={Confirm} exact />
        <Route path='/login' component={LoginScreen} />
          <Route path='/jobs' component={JobsScreen} />
          <Route path='/events' component={EventsScreen} />
          <Route path='/downloads' component={DownloadsScreen} />
          <Route path='/funding' component={FundingScreen} />
          <Route path='/projects' component={ProjectsScreen} />
          <Route path='/contact' component={ContactScreen} />
          <Route path='/about' component={AboutScreen} />
          <Route path='/membership' component={MembershipScreen} />
          <Route path='/funding1' component={FundingScreen1}/>
          <Route path='/funding2' component={FundingScreen2} />
          <Route path='/funding3' component={FundingScreen3} />
          <Route path='/funding4' component={FundingScreen4} />
          <Route path='/funding5' component={FundingScreen5} />
          <Route path='/funding6' component={FundingScreen6} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{isLoggedIn: !!token,
        name: name,
        email: email,
        token: token,
        userId: userId,
        login: login,
        logout: logout}}
    >
    <Router>
      <Header/>
      
      <main style={{marginTop: '2rem'}}>
        <Container>
          {routes}
        </Container>
        <Link 
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: '100px',
          height: '100px' 
          }}
        to={token ? `/chat?room=${room}&name=${name}&uid=${userId}&sender=${userId}` : '/login'}
        ><i style={{fontSize: '5rem', color: '#e6e7e8'}} className="fas fa-comment"></i>
        </Link>
             
     </main>
     
     <Footer />
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
