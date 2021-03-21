import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHttpClient } from '../../reducers/http-hook';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import ListOfFundings1 from './fundingComponents/ListOfFundings1';

const FundingScreen1 = () => {

    const [loadedFundings, setLoadedFundings] = useState()
    const {isLoading, error, clearError, sendRequest} = useHttpClient()

    useEffect(()=> {
        const fetchFundings = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/fundings`
                )
                setLoadedFundings(responseData.fundings);
            } catch (err) {
                
            }
        }
        fetchFundings();
    }, [sendRequest])

    return(
        <Container className="left">
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <h2 style={{marginBottom: '3rem'}}>List of Startup Funding</h2>
            {!isLoading && loadedFundings && (
            <ListOfFundings1 items={loadedFundings} />
            )}
        </Container>
    )

}

export default FundingScreen1;