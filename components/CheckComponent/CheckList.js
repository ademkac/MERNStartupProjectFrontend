import React from 'react';

import Card from '../../custom/components/Card';
import CheckComponent from './CheckComponent';

const CheckList = props => {

    if(props.items.length === 0){
        return(
            <div>
                <Card>
                    <h2>
                    There are currently no new projects.
                    </h2>
                    
                </Card>
            </div>
        );
    }

    return(
        <div className="container">
            {props.items.map(project => ( 
                <CheckComponent 
                key={project.id}
                id={project.id}
                slika={project.slika}
                naslov={project.naslov}
                poruka={project.poruka}
                mail={project.mail}
                creatorId={project.user}
                onDelete={props.onDeleteProject}
                />
            ))}
        </div>
    )
}


export default CheckList;