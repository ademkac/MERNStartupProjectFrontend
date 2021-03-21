import React from 'react';
import { Link } from 'react-router-dom';

import './InfoBar.css';


const InfoBar = ({room}) => {
    return(
        <div className="infoBar">
        <div className="leftInnerContainer">        
           <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
           <Link to='/'> <i className="fas fa-times-circle"></i></Link>
        </div>
    </div>
    )
}

export default InfoBar