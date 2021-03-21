import React, { useEffect, useState } from 'react';
import {Container, Image, Row, Col} from 'react-bootstrap';
import pic from '../assets/images/findjob.jpg';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';

import JobList from '../components/JobComponent/JobList';

const JobsScreen = () => {

    const [loadedJobs, setLoadedJobs] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient()

    useEffect(()=>{
        const fetchJobs = async () => {
            try{
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/jobs`
                );
                setLoadedJobs(responseData.jobs)
            }catch(err){}
        };
        fetchJobs();
    }, [sendRequest])

    const jobDeletedHandler = deletedJobId => {
        setLoadedJobs(prevJobs => 
            prevJobs.filter(job=>job.id !== deletedJobId))
    }

return(
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                <LoadingSpinner />
            </div>
            )}
            <Container fluid>
            <Row><Col>
            <Image src={pic} style={{height: '300px', width: '100%'}} alt="slika"/>
            </Col></Row>
            </Container>
            <Container className="my-3">
                <h3 className="center">Startup Jobs. Find your opportunity here.</h3>
               {isLoading && (
                   <div className="center">
                       <LoadingSpinner />
                   </div>
               )}
               {
                   !isLoading && loadedJobs && (
                       <JobList items={loadedJobs} onDeleteJob={jobDeletedHandler} />
                   )
               }
            </Container>
        </Container>

)

}

export default JobsScreen;