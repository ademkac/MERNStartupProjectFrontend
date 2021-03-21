import React from 'react';
import { Link } from 'react-router-dom';
import '../ProjectsComponents/ProjectItem.css'

const DownloadsComponent = (props) => {

    

    return(
        <React.Fragment >
            <div className="row" style={{marginBottom: '2rem'}}>
                <div className="col-md-7">
                    <img style={{width: 700, height: 300}} className="img-fluid rounded mb-3 mb-md-0" src={`${process.env.REACT_APP_BACKEND_URL}/${props.image}`} alt=""/>
                </div>
                <div className="col-md-5">
                    <h3>{props.naslov}</h3>
                    <p>{props.opis}</p>
                    <h5 className="my-3">Requirements: </h5>
                    <p>{props.zahtevi}</p>
                </div>
                <div style={{marginLeft: '0.5rem'}} className="row center">
                    <a style={{marginRight: '0.8rem'}} target="_blank" rel="noopener noreferrer" className="button" href={props.link}>BUY NOW</a>  
                    <Link to='/membership'>
                        <button className="button button-primary">Free for Members</button>
                    </Link>
                </div>
            </div>

        </React.Fragment>
        
            
    )
}

export default DownloadsComponent;