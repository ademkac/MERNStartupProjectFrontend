import React, { useEffect, useState, } from 'react';
import { Container} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';



const ProjectsByIdScreen = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedProject, setLoadedProject] = useState();
    const projectId = useParams().projectId;
    
    useEffect(()=>{
        const fetchProject = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`
                );
                setLoadedProject(responseData.project)
            } catch (err) {
                
            }
        };
        fetchProject();
    }, [sendRequest, projectId])


    let content;
    if(!isLoading && loadedProject === null){
        content=<h1>Something was wrong</h1>
    }

    if(!isLoading && loadedProject){
        content=(
            <Container style={{display: 'block', width: '80%', padding: '2rem', backgroundColor: '#0b4463', boxShadow: '10px 10px 5px grey' }}>
               <h3 className=" center" style={{marginBottom: '2rem'}}>{loadedProject.naslov}</h3>
                <h2 className="center">Description</h2>
                <p className="justify">{loadedProject.poruka}</p>
                <p  style={{marginTop: '3rem'}}>Please send us your resume at <span style={{color: 'orange', marginLeft: '1rem'}}> {loadedProject.mail}</span></p>
             
            </Container>
        )
    }

    return (
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            {content}
        </Container>
    )
}

export default ProjectsByIdScreen;