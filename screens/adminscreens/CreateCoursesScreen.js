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
 
const CreateCoursesScreen = () => {

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
            zahtevi: {
                value: '',
                isValid: false
            },
            link: {
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

    const history = useHistory();

    const onSubmitHandler = async e =>{
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('naslov', formState.inputs.naslov.value)
            formData.append('opis', formState.inputs.opis.value)
            formData.append('zahtevi', formState.inputs.zahtevi.value)
            formData.append('link', formState.inputs.link.value)
            formData.append('image', formState.inputs.image.value)

             await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/downloads`,
                'POST',
                formData
            );
                history.push('/'); 
        } catch (err) {
            
        } 


    }

    return(
        <React.Fragment>

                    
                <h2 className="center" style={{marginTop: '40px'}}>Create course</h2>
                   
                    <ErrorModal error={error} onClear={clearError} />
                   <form className="project-form" onSubmit={onSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <FormGroup className="my-3">
                            <Input 
                            id="naslov"
                            element="input"
                            type="text"
                            label="Enter a title"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="opis"
                            element="textarea"
                            label="Summary of course"
                            validators = {[VALIDATOR_MINLENGTH(5)]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <InputGroup>
                                <Input 
                                id="zahtevi"
                                element="textarea"
                                label="Requirements"
                                validators = {[VALIDATOR_REQUIRE()]}
                                errorText="This field is required"
                                onInput={inputHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup  style={{marginTop: '6rem'}}>
                       
                            <Input 
                            id="link"
                            element="input"
                            type="text"
                            label="Link of course"
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
                                Add course
                            </Button>
                        </div>
                        
                   </form>
                </React.Fragment>
    )
}

export default CreateCoursesScreen;