import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Image, FormGroup, Alert} from 'react-bootstrap';
import slika from '../assets/images/contact.jpg';
import { useForm } from '../reducers/form-hook';
import { useHttpClient } from '../reducers/http-hook';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import Input from '../custom/components/FormElements/Input';
import Button from '../custom/components/FormElements/Button';
import {VALIDATOR_EMAIL, VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../util/validators';
import './ProjectForm.css';

import { useHistory } from 'react-router-dom';
import { AuthContext } from '../reducers/auth-context';


const ContactScreen = () => {
    const auth = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const history = useHistory()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler, setFormData] = useForm(
        {
            email:{
                value: '',
                isValid: false
            },
            name:{
                value: '',
                isValid: false
            },
            poruka:{
                value: '',
                isValid: false
            }
        },
        false
    )

    useEffect(()=>{
        if(auth.name){
            setFormData({
                name:{
                    value: auth.name,
                    isValid: true
                },
                email:{
                    value:auth.email,
                    isValid: true
                }
            }, false)
        }
    }, [auth.name, auth.email, setFormData])

    const onSubmitHandler = async e =>{
        e.preventDefault();

         try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/contact`,
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    name: formState.inputs.name.value,
                    poruka: formState.inputs.poruka.value
                }),
                {
                    'Content-Type': 'application/json'
                }
            )
            setShow(true)
            setTimeout(()=>{
                history.push('/')
            }, 4000)
        } catch (err) {
            
        } 
        console.log(formState)
    }

return(
    <Container >
            <Container className="justify" style={{width: '80%', backgroundColor: '#995e15', boxShadow: '10px 10px 5px grey', padding: '2rem'}}>
                <small style={{padding: '1rem', fontSize: '2vw', transition: 'opacity 0.33s'}}>Send us an email anytime, we endeavour to answer
                    all enquiries within 24 hours on business days.
                </small>
            </Container>
        <Row style={{marginTop: '3rem'}} lg={2} md={1} sm={1} xd={1}>
               
            <Col className="my-3" style={{display: 'flex', justifyContent: 'center',}}>
                <Image src={slika} rounded style={{width: '480px', height: '380px', marginTop: '2rem'}} />
            </Col>
            <Col className="my-3">
            <Alert show={show} variant="success" onClose={()=> setShow(false)} dismissible>
                <p>Thank You for enquiry</p>
            </Alert>
                 <ErrorModal error={error} onClear={clearError} />
                <form className="project-form" onSubmit={onSubmitHandler}>
                {isLoading && <LoadingSpinner asOverlay />}
                    <Container>
                        <Row>
                            <Col >
                            <FormGroup className="my-3">
                            {auth.name ? (
                                <Input
                                id="name"
                                element="input"
                                type="text"
                                label="Name"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Molimo vas unesite ime"
                                onInput={inputHandler}
                                initialValue={auth.name}
                                initialValid={true}
                                    />
                                    ) : <Input
                                    id="name"
                                    element="input"
                                    type="text"
                                    label="Name"
                                    validators={[VALIDATOR_REQUIRE()]}
                                    errorText="Molimo vas unesite ime"
                                    onInput={inputHandler}
                                    
                                />}
                            </FormGroup>
                            </Col>
                            <Col>
                            <FormGroup className="my-3">
                            {auth.email ? (
                                <Input
                                id="email"
                                element="input"
                                type="email"
                                label="Email"
                                validators={[VALIDATOR_EMAIL()]}
                                errorText="Molimo vas da unesete email."
                                onInput={inputHandler}
                                initialValue={auth.email}
                                    />
                                    ): <Input
                                    id="email"
                                    element="input"
                                    type="email"
                                    label="Email"
                                    validators={[VALIDATOR_EMAIL()]}
                                    errorText="Molimo vas da unesete email."
                                    onInput={inputHandler}
                                />}
                        </FormGroup>
                            </Col>
                        </Row>
                    </Container>
                    <FormGroup >
                            <Input 
                            id="poruka"
                            element="textarea"
                            label="Unesite poruku"
                            validators = {[VALIDATOR_MINLENGTH(5)]}
                            errorText="Unesite odgovarajucu poruku"
                            onInput={inputHandler}
                            />
                    </FormGroup>
                    <Container style={{display: 'flex', justifyContent: 'center', marginTop: '6rem'}} >
                    <Button style={{width: '50%'}} disabled={!formState.isValid}  type="submit">Send Enquiry</Button>
                    </Container>
                    
                </form>
            </Col>
        </Row> 

    </Container>
);

}

export default ContactScreen;