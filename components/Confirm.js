import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import Button from '../custom/components/FormElements/Button'
import { useHttpClient } from '../reducers/http-hook';
import {Toast} from 'react-bootstrap'
import slika from '../assets/images/startup.png'

const Confirm = (props) => {

    const {id} = props.match.params;
    const [confirming, setConfirming] = useState(true)
    const {sendRequest, isLoading} = useHttpClient()
    const [show, setShow]= useState(false)

    useEffect(()=>{
        const fetch = async()=>{
             try {
                await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/users/confirm/${id}`
                )
                
             } catch (error) {
                 
             }
            setConfirming(false)
        }
        fetch()
        setShow(true)
    }, [sendRequest])

    return(
        <div className="confirm center">
            <Toast style={{display: 'block'}} show={show} onClose={()=>setShow(false)}>
                <Toast.Header>
                    <img src={slika} width={30} height={30} sizes="30x30" className="rounded mr-2" alt="" />
                    <strong>Startup Site</strong>
                </Toast.Header>
                <Toast.Body>Your email is confirmed! Please login and take benefits from it</Toast.Body>
            </Toast>
            <div className="center my-3">
            {(isLoading && confirming) 
            ? (<LoadingSpinner />)
            : (<Button><Link style={{display: 'block', textDecoration: 'none'}}  to='/login'>
                Login
            </Link></Button>)
            }
            </div>
        </div>
    )
}

export default Confirm;