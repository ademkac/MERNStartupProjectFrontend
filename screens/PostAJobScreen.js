import React, { useContext, useState} from 'react';
import {Container,
        Row,
        Col,
        Image,
        FormGroup,
        InputGroup,
        Alert,
        Modal
        } from 'react-bootstrap';
import slika from '../assets/images/postjob.jpg';
import {AuthContext} from '../reducers/auth-context';
import {useHttpClient} from '../reducers/http-hook';
import {useForm} from '../reducers/form-hook';
import Input from '../custom/components/FormElements/Input';
import Button from '../custom/components/FormElements/Button';
import './ProjectForm.css';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../util/validators';
import ErrorModal from '../custom/components/ErrorModal';
import ImageUpload from '../custom/components/FormElements/ImageUpload'

const PostAJobScreen = () => {

    const auth = useContext(AuthContext);
    const [show, setShow] = useState(false)
    const history = useHistory()
    const {isLoading, error, sendRequest, clearError} = useHttpClient()
    const [formState, inputHandler] = useForm(
        {
            link:{
                value: '',
                isValid: false
            },
            poruka:{
                value: '',
                isValid: false
            },
            
            kompanija: {
                value: '',
                isValid: false
            },
            tip: {
                value: '',
                isValid: false
            },
            radnoVreme: {
                value: 'Full time',
                isValid: true
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


    const onSubmitHandler = async event => {
        event.preventDefault();
        console.log(formState)
        try {

            const formData = new FormData();
            formData.append('user', auth.userId)
            formData.append('link', formState.inputs.link.value)
            formData.append('poruka', formState.inputs.poruka.value)
            formData.append('kompanija', formState.inputs.kompanija.value)
            formData.append('tip', formState.inputs.tip.value)
            formData.append('radnoVreme', formState.inputs.radnoVreme.value)
            formData.append('lokacija', formState.inputs.lokacija.value)
            formData.append('datum', new Date().toDateString() )
            formData.append('slika', formState.inputs.slika.value)

            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/provera`,
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
        <Container className="my-3">
            <Row lg={1} md={1} sm={1} xs={1}>
                <Col>
                <Container>
                    <Container className="my-3" style={{display: "flex", justifyContent: 'center'}}>
                <h2 style={{marginTop: '40px'}}>Post a Job</h2>
                    </Container>
                    <ErrorModal error={error} onClear={clearError} />
                    <Modal show={show} onHide={()=>history.push('/')}>
                        <Modal.Body>
                        <Alert show={show} variant="success" onClose={()=>setShow(false)}>
                            You have successfully added job and admin will check job soon as possible. Check jobs screen if admin accepts your request.
                    </Alert>
                        </Modal.Body>
                    </Modal>
                   <form className="project-form" onSubmit={onSubmitHandler}>
                        {isLoading && <LoadingSpinner asOverlay />}
                        <FormGroup className="my-3">
                            <Input 
                            id="link"
                            element="input"
                            type="text"
                            label="Link for more details"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="poruka"
                            element="textarea"
                            label="Summary of job"
                            validators = {[VALIDATOR_MINLENGTH(5)]}
                            errorText="Enter summary "
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup style={{marginTop: '5rem'}}>
                            <Input 
                            id="kompanija"
                            element="input"
                            type="text"
                            label="Name of your company"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="tip"
                            element="input"
                            type="text"
                            label="Enter the job type"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="radnoVreme"
                            type="select"
                            label="Choose working hours"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="This field is required"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Input 
                            id="lokacija"
                            element="input"
                            type="text"
                            label="Unesite lokaciju"
                            validators = {[VALIDATOR_REQUIRE()]}
                            errorText="Unesite validnu lokaciju"
                            onInput={inputHandler}
                            />
                        </FormGroup>
                        <FormGroup style={{marginTop: '-2rem'}}>
                            <InputGroup>
                                <ImageUpload 
                                id="slika" center 
                                onInput={inputHandler}
                                />
                            </InputGroup>
                        </FormGroup>
                    
                        <Container className="center" style={{marginTop: '20rem'}}>
                            <Button type="submit" disabled={!formState.isValid}>Postavite vas posao</Button>
                        </Container>
                   </form>
                </Container>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
);

}

export default PostAJobScreen;