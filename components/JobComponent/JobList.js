import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../custom/components/FormElements/Button';
import JobComponent from './JobComponent';

const JobList = props => {

    if(props.items.length === 0){
        return(
            <div className="center">
              
                    <h2>Nije moguce pronaci projekte. Zelite da objavite?</h2>
                    <Link to="/post-a-job">
                    <Button>Objavi projekat</Button>
                    </Link>
                
            </div>
        );
    }



    return(
        <div className="container mt-5">
            <div className="row">
                {props.items.map((job) => (
                    <JobComponent
                    key={job.id}
                    id={job.id} 
                    slika={job.slika}
                    tip={job.tip}
                    kompanija={job.kompanija}
                    opis={job.poruka}
                    datum={job.datum}
                    creatorId={job.user}
                    onDelete={props.onDeleteJob}
                    />
                ))}
            </div>
        </div>
    )
}


export default JobList;