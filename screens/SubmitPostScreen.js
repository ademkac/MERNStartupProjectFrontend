import React, { useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import ImageUpload from '../custom/components/FormElements/ImageUpload';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from '../util/validators';
import {useHttpClient} from '../reducers/http-hook';
import {AuthContext} from '../reducers/auth-context';
import {useForm} from '../reducers/form-hook';
import Input from '../custom/components/FormElements/Input';
 import Button from '../custom/components/FormElements/Button';
 import './ProjectForm.css';
import {FormGroup, Col, Row, Container, Image, Alert, Modal} from 'react-bootstrap';
import slika from '../assets/images/promote.jpg'

const SubmitPostScreen = () => {

    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false)

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [formState, inputHandler]= useForm(
        {
            naslov: {
                value: '',
                isValid: false
            },
            poruka: {
                value: '',
                isValid: false
            },
             slika: {
                value: null,
                isValid: false
            },
            mail: {
                value: '',
                isValid: false
            },
           
        },
        false
    )

    const history = useHistory();

    const projectSubmitHandler = async event => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('user', auth.userId)
            formData.append('naslov', formState.inputs.naslov.value)
            formData.append('poruka', formState.inputs.poruka.value)
            formData.append('mail', formState.inputs.mail.value)
            formData.append('slika', formState.inputs.slika.value)

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/odobreni`,
                'POST',
                formData, 
                {

                    Authorization: 'Bearer ' + auth.token
                }
            );
                setShow(true)
            
        } catch (err) {
            
        }
    }

return(

    <React.Fragment>
        <Container className="my-4" fluid>
            <Row><Col>
            <Image src={slika} style={{maxHeight: '450px', width: '100%'}}/>
            </Col></Row>
        </Container>
        <h2 className="center" style={{marginBottom: '40px'}}>Create project</h2>
      <ErrorModal error={error} onClear={clearError} />
      <Modal show={show} onHide={()=>history.push('/')}>
          <Modal.Body>
            <Alert show={show} variant="success" onClose={()=>setShow(false)}>
            You have successfully added project and admin will check project soon as possible. Check projects screen if admin accepts your request.
            </Alert>
          </Modal.Body>
      </Modal>
      <form className="project-form" onSubmit={projectSubmitHandler} >
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
        />
        </FormGroup>
        <Input
          id="poruka"
          element="textarea"
          label="Summary of your project"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please, this field is required."
          onInput={inputHandler}
        />
        </FormGroup>
        <FormGroup>
        <ImageUpload 
        id="slika" center 
        onInput={inputHandler}
        />
        </FormGroup>
        <FormGroup style={{marginTop: '18rem'}}>
        <Input
          id="mail"
          element="input"
          type="text"
          label="Your mail for contact"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please, enter a valid mail"
          onInput={inputHandler}
        />
        </FormGroup>
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <Button type="submit"  disabled={!formState.isValid}>
          Add project
        </Button>
        </div>
      </form>
    </React.Fragment>
);

}

export default SubmitPostScreen;