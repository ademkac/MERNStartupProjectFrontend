import React, { useContext, useState } from 'react';
import {AuthContext} from '../reducers/auth-context';
import {useForm} from '../reducers/form-hook';
import {useHttpClient} from '../reducers/http-hook';
import Card from '../custom/components/Card';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import Input from '../custom/components/FormElements/Input';
import Button from '../custom/components/FormElements/Button';
import {
VALIDATOR_EMAIL,
VALIDATOR_MINLENGTH,
VALIDATOR_REQUIRE} from '../util/validators';
import './login.css';
import { Alert } from 'react-bootstrap';

const LoginScreen = () => {

   const auth = useContext(AuthContext);
   const [show, setShow] = useState(false)
   const [isLoginMode, setIsLoginMode] = useState(true);
   const {isLoading, error, sendRequest, clearError} = useHttpClient();

   const [formState, inputHandler, setFormData] = useForm(
       {
           email: {
               value: '',
               isValid: false
           },
           password: {
               value: '',
               isValid: false
           }
       },
       false
   );

   const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };


  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) {
        try {
            const responseData = await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                'POST',
                JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value 
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            auth.login(responseData.userId, responseData.name, responseData.email, responseData.token);
        } catch (err) {
          console.log(err)
        }
    } else {
      try {
      let res = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
           {
            'Content-Type': 'application/json'
          }
        );
        if(res.msg === 'Email sent, please check your mail to confirm' || res.msg === 'Confirmation email resent, maybe check your spam?'){
          setShow(true)
        }
        console.log(show)
       /*  auth.login(responseData.user.id); */ 
      } catch (err) {
        console.log(err)
      }
    }
  };

return(

    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <Card className="authentication">
            {isLoading && <LoadingSpinner asOverlay />}
            <Alert show={show} variant="success" onClose={()=> setShow(false)} dismissible>
                <p>Email sent, please check your email to confirm</p>
            </Alert>
            <h2>{isLoginMode ? 'StartupSite Login' : 'StartupSite SignUp'}</h2>
            <hr/>
            <form onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                    <Input 
                    element="input"
                    id="name"
                    type="text"
                    label="Your name"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Molimo vas unesite vase ime"
                    onInput={inputHandler}
                    />
                )}
                <Input
                    element="input"
                    id="email"
                    type="email"
                    label="E-Mail"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter valid email address"
                    onInput={inputHandler}
                />
                <Input
                    element="input"
                    id="password"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a code, at least 6 characters."
                    onInput={inputHandler}
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
            </Button>
        </Card>
        <div id="snackbar">Successfully logged in!!! </div>
    </React.Fragment>
 
)

}

export default LoginScreen;