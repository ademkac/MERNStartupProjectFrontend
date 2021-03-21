import React, { useEffect, useState } from 'react';
import {useHttpClient} from '../../reducers/http-hook';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import { Container } from 'react-bootstrap';
import CheckJobList from '../../components/CheckComponent/CheckJobList';


const CheckJobs = () => {

    const [loadedJobs, setloadedJobs] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    useEffect(()=>{
        const fetchJobs = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/provera`
                );
                console.log(responseData.odobreni)
                setloadedJobs(responseData.odobreni);
            } catch (err) {
                
            }
        };
        fetchJobs();
    }, [sendRequest])

    const projectDeletedHandler = deletedProjectId => {
        setloadedJobs(prevProjects => 
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
        
        {!isLoading && loadedJobs && (
            <CheckJobList items={loadedJobs} onDeleteProject={projectDeletedHandler} />
        )}
    </React.Fragment>
  
);

}

export default CheckJobs;