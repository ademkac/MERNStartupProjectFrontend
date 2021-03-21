import React, { useContext, useState } from 'react';
import Button from '../../custom/components/FormElements/Button';
import Modal from '../../components/Modal';
import ErrorModal from '../../custom/components/ErrorModal';
import LoadingSpinner from '../../custom/components/LoadingSpinner';
import {useHttpClient} from '../../reducers/http-hook';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../reducers/auth-context';
import { Alert } from 'react-bootstrap';



const CheckJobComponent = (props) => {

    const auth = useContext(AuthContext)
    const [show, setShow] = useState(false)
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal]= useState(false);

    const cancelDeleteHandler = () => {
        setShowConfirmModal(false)
    }

     const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);
    } 

    const acceptHandler = async () => {
        try {
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/api/jobs`,
                'POST',
                JSON.stringify({
                    user: props.creatorId,
                    link: props.link,
                    poruka: props.poruka,
                    slika: props.slika,
                    kompanija: props.kompanija,
                    tip: props.tip,
                    radnoVreme: props.radnoVreme,
                    lokacija: props.lokacija,
                    datum: props.datum
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
                `${process.env.REACT_APP_BACKEND_URL}/api/provera/${props.id}`,
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
        <div className="col-md-4">
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showConfirmModal}
                onHide={cancelDeleteHandler}
                title="Are you sure?"
                body={
                    <p>
                Do you want to proceed and delete this job? Please note that it
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
                <p>You have successfully added job in database! Please delete the job you added .</p>
            </Alert>
                    
                    {isLoading && <LoadingSpinner asOverlay />}
                        <div className="card p-3">
                            <div className="d-flex flex-row mb-3"><img src={`${process.env.REACT_APP_BACKEND_URL}/${props.slika}`} width="70" alt="Trebala da bude slika" />
                                <div className="d-flex flex-column ml-2"><span>{props.tip}</span><span className="text-black-50">{props.kompanija}</span><span className="ratings"><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i></span></div>
                            </div>
            <div className="cut-text">{props.opis}</div> 
                            <div className="d-flex justify-content-between install mt-3"><span>{props.datum}</span><span className="text-primary"><Link to={`/jobs/${props.id}`}> View&nbsp;<i  className="fa fa-angle-right"></i></Link></span></div>
                        </div>
                        <div className="place-item__actions">
                        {( auth.userId === "60205515b75e62f9ac29022a") && (
                            <Button danger onClick={acceptHandler}>
                                ACCEPT
                            </Button>
                            )}
                            {(auth.userId === props.creatorId || auth.userId === "60205515b75e62f9ac29022a") && (
                            <Button danger onClick={showDeleteWarningHandler}>
                                DELETE
                            </Button>
                            )}
                        </div>
                        </div>
    )
}

export default CheckJobComponent;