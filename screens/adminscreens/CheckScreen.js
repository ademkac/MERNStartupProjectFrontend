import React, { useEffect, useState } from 'react';
import {useHttpClient} from '../../reducers/http-hook';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import { Container } from 'react-bootstrap';
import CheckList from '../../components/CheckComponent/CheckList'


const CheckScreen = () => {

    const [loadedProjects, setLoadedProjects] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    useEffect(()=>{
        const fetchProjects = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/odobreni`
                );
                console.log(responseData.odobreni)
                setLoadedProjects(responseData.odobreni);
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
        </Container>
        
        {!isLoading && loadedProjects && (
            <CheckList items={loadedProjects} onDeleteProject={projectDeletedHandler} />
        )}
    </React.Fragment>
  
);

}

export default CheckScreen;