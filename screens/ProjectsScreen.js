import React, { useEffect, useState } from 'react';
import {useHttpClient} from '../reducers/http-hook';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import ProjectList from '../components/ProjectsComponents/ProjectList';
import { Container, Row, Col, Image } from 'react-bootstrap';
import projectsPic from '../assets/images/projects1.png';
import {Link} from 'react-router-dom'


const ProjectsScreen = () => {

    const [loadedProjects, setLoadedProjects] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    useEffect(()=>{
        const fetchProjects = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/projects`
                );
                console.log(responseData.projects)
                setLoadedProjects(responseData.projects);
            } catch (err) {
                
            }
        };
        fetchProjects();
    }, [sendRequest])

    const projectDeletedHandler = deletedProjectId => {
        setLoadedProjects(prevProjects => 
            prevProjects.filter(project => project.id !== deletedProjectId))
    }

return(

    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        <Container className="my-4" fluid>
        <Row><Col>
            <Image src={projectsPic} style={{maxHeight: '450px', width: '100%'}}/>
            </Col></Row>
        </Container>
        <h3 className="center" style={{marginTop: '30px', marginBottom: '40px'}}>Find new projects here</h3>
        <p className="center" style={{marginTop: '30px', marginBottom: '40px'}}>These projects are ideal to join as co-founders, team members or a side-hustle. If you have a project you would like to get listed <Link style={{marginLeft: '1rem'}} to='/submitpost' color='red'> submit it here</Link>.</p>
        {!isLoading && loadedProjects && (
            <ProjectList items={loadedProjects} onDeleteProject={projectDeletedHandler} />
        )}
    </React.Fragment>
  
);

}

export default ProjectsScreen;