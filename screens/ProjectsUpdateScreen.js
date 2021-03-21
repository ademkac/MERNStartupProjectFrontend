import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {FormGroup} from 'react-bootstrap'
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { AuthContext } from '../reducers/auth-context';
import { useForm } from '../reducers/form-hook';
import { useHttpClient } from '../reducers/http-hook';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../util/validators';
import './ProjectForm.css';
import Input from '../custom/components/FormElements/Input';
 import Button from '../custom/components/FormElements/Button';

const ProjectsUpdateScreen = () => {

    const auth = useContext(AuthContext);
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [loadedProject, setLoadedProject] = useState();
    const projectId = useParams().projectId;
    const history = useHistory();

    const [formState, inputHandler, setFormData] = useForm(
        {
            naslov: {
                value: '',
                isValid: false
            },
            poruka: {
                value: '',
                isValid: false
            },
            
            mail: {
                value: '',
                isValid: false
            }

        },
        false
    )

    useEffect(()=>{
        const fetchProject = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`
                );
                setLoadedProject(responseData.project);
                setFormData({
                    naslov: {
                        value: responseData.project.naslov,
                        isValid: true
                    },
                    poruka: {
                        value: responseData.project.poruka,
                        isValid: true
                    },
                    mail: {
                        value: responseData.project.mail,
                        isValid: true
                    }
                }, true);
            } catch (err) {
                
            }
        }
        fetchProject();
    }, [sendRequest, projectId, setFormData])

    const projectUpdateSubmitHandler = async event => {
        event.preventDefault();
        try {
           
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`,
                'PATCH',
                JSON.stringify({
                    naslov: formState.inputs.naslov.value,
                    poruka: formState.inputs.poruka.value,
                    mail: formState.inputs.mail.value,
                }),
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            );
            history.push(`/projects`);
        } catch (err) {
            
        }
    }

    if(isLoading){
        return(
            <div className="center">
                <LoadingSpinner />
            </div>
        )
    }

    if(!loadedProject && !error){
        return(
            <div className="center">
                <h2>Could not find project</h2>
            </div>
        )
    }

return(
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading &&loadedProject && (
            <form className="project-form" onSubmit={projectUpdateSubmitHandler} >
            {isLoading && <LoadingSpinner asOverlay />}
            <FormGroup style={{marginTop: '1rem', marginBottom: '1rem'}}>
            <FormGroup >
            <Input
              id="naslov"
              element="input"
              type="text"
              label="Title"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Enter a valid title"
              onInput={inputHandler}
              initialValue={loadedProject.naslov}
              initialValid={true}
            />
            </FormGroup>
            <Input
              id="poruka"
              element="textarea"
              label="Summary of your project"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Molimo vas da unesete poruku."
              onInput={inputHandler}
              initialValue={loadedProject.poruka}
              initialValid={true}
            />
            </FormGroup>
            
            <FormGroup style={{marginTop: '3rem'}}>
            <Input
              id="mail"
              element="input"
              type="text"
              label="Your mail for contact"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please, enter a valid mail"
              onInput={inputHandler}
              initialValue={loadedProject.mail}
              initialValid={true}
            />
            </FormGroup>
            
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button type="submit"  disabled={!formState.isValid}>
              Update project
            </Button>
            </div>
          </form>
        )}
    </React.Fragment>
)
}


export default ProjectsUpdateScreen;