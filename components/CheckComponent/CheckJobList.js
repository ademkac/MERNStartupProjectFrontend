import React from 'react';

import Card from '../../custom/components/Card';
import CheckJobComponent from './CheckJobComponent';

const CheckJobList = props => {

    if(props.items.length === 0){
        return(
            <div>
                <Card>
                    <h2>
                    There are currently no new jobs.
                    </h2>
                    
                </Card>
            </div>
        );
    }

    return(
        <div className="container">
            {props.items.map(project => ( 
                <CheckJobComponent 
                key={project.id}
                id={project.id}
                slika={project.slika}
                link={project.link}
                kompanija={project.kompanija}
                poruka={project.poruka}
                tip={project.tip}
                radnoVreme={project.radnoVreme}
                lokacija={project.lokacija}
                datum={project.datum}
                creatorId={project.user}
                onDelete={props.onDeleteProject}
                />
            ))}
        </div>
    )
}


export default CheckJobList;