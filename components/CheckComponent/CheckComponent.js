import React, { useContext, useState } from 'react';
import Button from '../../custom/components/FormElements/Button';
import Modal from '../../components/Modal';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import {AuthContext } from '../../reducers/auth-context';
import {useHttpClient} from '../../reducers/http-hook';
import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';



const CheckComponent = (props) => {

    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const auth = useContext(AuthContext);
    const [showConfirmModal, setShowConfirmModal]= useState(false);
    const [show, setShow] = useState(false)

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    }

    const acceptHandler = async () => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/projects`,
                'POST',
                JSON.stringify({
                    user: props.creatorId,
                    naslov: props.naslov,
                    poruka: props.poruka,
                    slika: props.slika,
                    mail: props.mail
                }),{
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            setShow(true)
        } catch (err) {
            
        }
    }

    const confirmDeleteHandler = async() => {
        setShowConfirmModal(false)
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/odobreni/${props.id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            props.onDelete(props.id);
        } catch (err) {
            
        }
    }

    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showConfirmModal}
                onHide={cancelDeleteHandler}
                title="Are you sure?"
                body={
                    <p>
                Do you want to proceed and delete this project? Please note that it
                can't be undone thereafter.
                </p>
                }
                footerClass="place-item__modal-actions"
                footer={
                <React.Fragment>
                    <Button inverse onClick={cancelDeleteHandler}>
                    CANCEL
                    </Button>
                    <Button danger onClick={confirmDeleteHandler}>
                    DELETE
                    </Button>
                </React.Fragment>
                }
            >
            </Modal>
            <Alert show={show} variant="success" onClose={()=> setShow(false)} dismissible>
                <p>You have successfully added project in database! Please delete the project you added .</p>
            </Alert>
            <div className="row">
                {isLoading && <LoadingSpinner asOverlay />}
                <div className="col-md-7">
                    <Link to={`/projects/${props.id}`}>
                        <img style={{width: 700, height: 300}} className="img-fluid rounded mb-3 mb-md-0" src={`${process.env.REACT_APP_BACKEND_URL}/${props.slika}`} alt=""/>
                    </Link>
                </div>
                <div className="col-md-5">
                    <h3>{props.naslov}</h3>
                    <p>{props.poruka}</p>
                </div>
                <div className="place-item__actions">
                   {/*  {auth.userId === props.creatorId && (
                    <Button to={`/project/${props.id}`}>EDIT</Button>
                    )} */}

                    {(auth.userId === props.creatorId || auth.userId === "60205515b75e62f9ac29022a") && (
                    <Button danger onClick={showDeleteWarningHandler}>
                        DELETE
                    </Button>
                    )}
                    {( auth.userId === "60205515b75e62f9ac29022a") && (
                    <Button danger onClick={acceptHandler}>
                        ACCEPT
                    </Button>
                    )}
                </div>
            </div>
        </React.Fragment>
    )
}

export default CheckComponent;