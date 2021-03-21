import React, { useEffect, useState, } from 'react';
import { Container, Button, Fade } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHttpClient } from '../reducers/http-hook';



const JobsByIdScreen = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedJob, setLoadedJob] = useState();
    const [open, setOpen] = useState(false);
    const jobId = useParams().jobId;
    
    useEffect(()=>{
        const fetchJob = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/jobs/${jobId}`
                );
                setLoadedJob(responseData.job)
            } catch (err) {
                
            }
        };
        fetchJob();
    }, [sendRequest, jobId])


    let content;
    if(!isLoading && loadedJob === null){
        content=<h1>nesto nije u redu!!!</h1>
    }

    if(!isLoading && loadedJob){
        content=(
            <Container style={{width: '80%', padding: '2rem', backgroundColor: '#0b4463', boxShadow: '10px 10px 5px grey'}}>
                <h3 className=" center" style={{marginBottom: '8rem'}}>{loadedJob.tip}</h3>
        <h4  style={{fontWeight: 'bold'}}>About {loadedJob.kompanija}</h4>
                <p style={{fontFamily: 'sans-serif', font: '16', marginBottom: '7rem'}}>{loadedJob.poruka}</p>
                <h5 className="center">How To Apply</h5>
                <Button
                className="center"
                style={{width: '70%', margin: '0 auto'}}
                    onClick={() => setOpen(!open)}
                    aria-controls="example-fade-text"
                    aria-expanded={open}
                >
                    Apply for job
                </Button>
                <Fade in={open} >
                    <div id="example-fade-text" className="center my-3">
                    <p style={{fontSize: '2vw'}}>To apply for this job email your details to</p>
                    <a  href={`https://${loadedJob.link}`} target="_blank" rel="noopener noreferrer" style={{display: 'block', color: 'orange', marginLeft: '0.5rem', fontSize: '2vw'}}>{loadedJob.link}</a>
                    </div>
                </Fade>
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

export default JobsByIdScreen;