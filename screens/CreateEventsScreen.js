import React, { useContext } from 'react'
import { FormGroup, FormControl} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import ErrorModal from '../custom/components/ErrorModal';
import Input from '../custom/components/FormElements/Input';
import Button from '../custom/components/FormElements/Button';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { AuthContext } from '../reducers/auth-context';
import { useForm } from '../reducers/form-hook';
import { useHttpClient } from '../reducers/http-hook';
import { VALIDATOR_REQUIRE } from '../util/validators';
import ImageUpload from '../custom/components/FormElements/ImageUpload';
import './ProjectForm.css';


const CreateEventsScreen = () => {

    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            naslov:{
                value: '',
                isValid: false
            },
            opis: {
                value: '',
                isValid: false
            },
            datum: {
                value: '',
                isValid: false
            },
            lokacija: {
                value: '',
                isValid: false
            },
            slika: {
                value: null,
                isValid: false
            }
        },
        false
    )

    const history = useHistory();

    const onSubmitHandler = async e =>{
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('naslov', formState.inputs.naslov.value)
            formData.append('opis', formState.inputs.opis.value)
            formData.append('datum', formState.inputs.datum.value)
            formData.append('lokacija', formState.inputs.lokacija.value)
            formData.append('slika', formState.inputs.slika.value)

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/events`,
                'POST',
                formData,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push('/events');

        } catch (err) {
            
        }
    }

    return(
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        <form className="project-form" onSubmit={onSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <FormControl>
                <Input 
                id="naslov"
                type="text"
                element="input"
                label="Event title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="This field is required"
                onInput={inputHandler} />
                </FormControl>
            </FormGroup>
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Input 
                id="opis"
                element="textarea"
                label="Summary of event"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="This field is required"
                onInput={inputHandler} />
            </FormGroup>
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <Input 
                id="datum"
                element="input"
                type="date"
                label="Date of event"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="This field is required"
                onInput={inputHandler} />
            </FormGroup>
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <Input 
                id="lokacija"
                element="input"
                type="text"              
                label="Address of event"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="This field is required"
                onInput={inputHandler} />
            </FormGroup>
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <ImageUpload 
            id="slika" center 
            onInput={inputHandler}
            />
            </FormGroup>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button type="submit"  disabled={!formState.isValid}>
                    Add event
                </Button>
            </div>
        </form>
    </React.Fragment>
    )
}

export default CreateEventsScreen;