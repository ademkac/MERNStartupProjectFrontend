import React, { useContext } from 'react';
import { FormGroup, InputGroup } from 'react-bootstrap';
import { useForm } from '../../reducers/form-hook';
import { useHttpClient } from '../../reducers/http-hook';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import Input from '../../custom/components/FormElements/Input';
import Button from '../../custom/components/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../util/validators';
import { AuthContext } from '../../reducers/auth-context';
import { useHistory } from 'react-router-dom';
import '../ProjectForm.css'

const CreateEventsScreen = () => {

    const history = useHistory()

    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            naslov: {
                value: '',
                isValid: false
            },
            text: {
                value: '',
                isValid: false
            },
            tip: {
                value: 'Global startup',
                isValid: true
            },
            podtip: {
                value: '',
                isValid: false
            },
            link: {
                value: '',
                isValid: false
            }
        },
        false
    );


    const onSubmitHandler = async event => {
        event.preventDefault();


         try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/fundings`,
                'POST',
                JSON.stringify({
                    naslov: formState.inputs.naslov.value,
                    text: formState.inputs.text.value,
                    tip: formState.inputs.tip.value,
                    podtip: formState.inputs.podtip.value,
                    link: formState.inputs.link.value

                }),
                {
                    'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token 
                }

            )
            history.push('/')
        } catch (err) {
            
        } 
    }

    return(
        <React.Fragment>

                    
                <h2 className="center" style={{marginTop: '40px'}}>Create Funding</h2>
                    
                    <ErrorModal error={error} onClear={clearError} />
                   <form className="project-form" onSubmit={onSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <FormGroup className="my-3">
                            <Input 
                            id="naslov"
                            element="input"
                            type="text"
                            label="Title"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="text"
                            element="textarea"
                            label="Summary of funding"
                            validators = {[VALIDATOR_MINLENGTH(5)]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <InputGroup>
                                <Input 
                                id="tip"
                                type="select1"
                                label="Type"
                                validators = {[VALIDATOR_REQUIRE()]}
                                errorText="This field is required"
                                onInput={inputHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <Input 
                            id="podtip"
                            element="input"
                            type="text"
                            label="Subtitle"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3" style={{marginTop: '0.1rem'}}>
                            <Input 
                            id="link"
                            element="input"
                            type="text"
                            label="Link of funding for more details"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '5rem'}}>
                            <Button type="submit"  disabled={!formState.isValid}>
                                    Add Funding                
                            </Button>
                        </div>
                        
                   </form>
                </React.Fragment>
        
    )

}

export default CreateEventsScreen;