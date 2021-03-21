import React from 'react';

import Card from '../../custom/components/Card';
import ProjectItem from './ProjectItem';
import Button from '../../custom/components/FormElements/Button';

const ProjectList = props => {

    if(props.items.length === 0){
        return(
            <div>
                <Card>
                    <h2>Nije moguce pronaci projekte. Zelite da objavite?</h2>
                    <Button to="/submitpost">Objavi projekat</Button>
                </Card>
            </div>
        );
    }

    return(
        <div className="container">
            {props.items.map(project => ( 
                <ProjectItem 
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


export default ProjectList;