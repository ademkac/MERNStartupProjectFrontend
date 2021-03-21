import React from 'react';
import { FormGroup, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useForm } from '../../reducers/form-hook';
import { useHttpClient } from '../../reducers/http-hook';
import ImageUpload from '../../custom/components/FormElements/ImageUpload';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import Input from '../../custom/components/FormElements/Input';
import Button from '../../custom/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../util/validators';
import '../ProjectForm.css'

const CreateEventsScreen = () => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            naslov: {
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
            image: {
                value: null,
                isValid: false
            }
        },
        false
    );

    const history = useHistory()

    const onSubmitHandler = async event => {
        event.preventDefault();


         try {
            const formData = new FormData();
            formData.append('naslov', formState.inputs.naslov.value)
            formData.append('opis', formState.inputs.opis.value)
            formData.append('datum', formState.inputs.datum.value)
            formData.append('lokacija', formState.inputs.lokacija.value)
            formData.append('image', formState.inputs.image.value)

             await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/events`,
                'POST',
                formData
            );
                history.push('/'); 
        } catch (err) {
            
        } 
    }

    return(
        <React.Fragment>

                    
                <h2 className="center" style={{marginTop: '40px'}}>Create Event</h2>
                   
                    <ErrorModal error={error} onClear={clearError} />
                   <form className="project-form" onSubmit={onSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <FormGroup className="my-3">
                            <Input 
                            id="naslov"
                            element="input"
                            type="text"
                            label="Event title"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="opis"
                            element="textarea"
                            label="Summary of event"
                            validators = {[VALIDATOR_MINLENGTH(5)]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <InputGroup>
                                <Input 
                                id="datum"
                                element="input"
                                type="date"
                                label="Date of event"
                                validators = {[VALIDATOR_REQUIRE()]}
                                errorText="This field is required"
                                onInput={inputHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <Input 
                            id="lokacija"
                            element="input"
                            type="text"
                            label="Location of event"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup style={{marginTop: '-2rem'}}>
                            <InputGroup>
                                <ImageUpload 
                                id="image" center 
                                onInput={inputHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '18rem'}}>
                            <Button type="submit"  disabled={!formState.isValid}>
                                Add Event
                            </Button>
                        </div>
                        
                   </form>
                </React.Fragment>
    )

}

export default CreateEventsScreen;