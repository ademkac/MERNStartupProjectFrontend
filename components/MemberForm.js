import React, { useContext, useEffect, useState } from 'react';
import {PayPalButton} from 'react-paypal-button-v2'
import { Alert, Container, FormGroup } from 'react-bootstrap';
import { useHistory} from 'react-router-dom';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import ErrorModal from '../custom/components/ErrorModal';
import { useHttpClient } from '../reducers/http-hook';
import { useForm } from '../reducers/form-hook';
import { AuthContext } from '../reducers/auth-context';
import Input from '../custom/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from '../util/validators';


const MemberForm = () => {

    const auth = useContext(AuthContext);
    const {isLoading, error, clearError, sendRequest} = useHttpClient()
    const history = useHistory()
    const [sdkReady, setSdkReady] = useState(false)
    const [show, setShow] = useState(false)
    const [formState, inputHandler, setFormData] = useForm({
        name: {
            value: '',
            isValid: false,
        },
        email: {
            value: '',
            isValid: false,
        },
    }, false)

   useEffect(()=>{
    if(auth.name){
        setFormData({
            name:{
                value: auth.name,
                isValid: true
            },
            email: {
                value: auth.email,
                isValid: true
            }
        }, false)
       }
   }, [auth.name, auth.email, setFormData])

   useEffect(()=>{
       const addPayPalScript = async () =>{
           const script = document.createElement('script')
           script.type = 'text/javascript'
           script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.REACT_APP_PAYPAL_CLIENT_ID}`
           script.async = true;
           script.onload = ()=> {
               setSdkReady(true)
           } 
           document.body.appendChild(script)
       }

       if(!window.paypal){
        addPayPalScript()
       } else{
           setSdkReady(true)
       }
       
   }, [])


    const onSubmitHandler = async (event) => {
        event.preventDefault();
      
            try {
               await sendRequest(
                   process.env.REACT_APP_BACKEND_URL+'/api/membership',
                   'POST',
                  JSON.stringify({
                    email: formState.inputs.email.value,
                    name: formState.inputs.name.value
                  }),
                   {
                    'Content-Type': 'application/json'
                   } 
               )
                setShow(true)
               setTimeout(()=>{
                   history.push('/')
               }, 4000); 
           } catch (err) {} 
       }

    return(
        <Container>
            <ErrorModal error={error} onClear={clearError} />
            <Alert variant="success" show={show} onClose={()=>setShow(false)} dismissible>
                <p>Wellcome to the club. You are officially member of our team. </p>
            </Alert>
            <form className="project-form" onSubmit={onSubmitHandler} >
        {isLoading && <LoadingSpinner asOverlay />}
        <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
        <FormGroup >
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
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
        {!sdkReady ? <LoadingSpinner /> : (
            <PayPalButton amount={99} onSuccess={onSubmitHandler} />
        )}
        </div>
      </form>
        </Container>
    )
}

export default MemberForm;