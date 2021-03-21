import React, { useContext, useEffect, useState } from 'react';
import {useHttpClient} from '../reducers/http-hook';
import ErrorModal from '../custom/components/ErrorModal';
import LoadingSpinner from '../custom/components/LoadingSpinner';
import ProjectList from '../components/ProjectsComponents/ProjectList';
import { AuthContext } from '../reducers/auth-context';


const ProjectsByUserIdScreen = () => {

    const auth = useContext(AuthContext)
    const [loadedProjects, setLoadedProjects] = useState();
    const {isLoading, error, sendRequest, clearError} = useHttpClient();


    useEffect(()=>{
        const fetchProjects = async () => {
            try {
                const responseData = await sendRequest(
                    `${process.env.REACT_APP_BACKEND_URL}/api/projects/user/${auth.userId}`
                );
                setLoadedProjects(responseData.projects);
            } catch (err) {
                
            }
        };
        fetchProjects();
    }, [sendRequest, auth]) 

    const projectDeletedHandler = deletedProjectId => {
        setLoadedProjects(prevProjects => 
            prevProjects.filter(project => project.id !== deletedProjectId))
    }

return(

    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && (
            <div className="center">
                <LoadingSpinner />
            </div>
        )}
        {!isLoading && loadedProjects && (
            <ProjectList items={loadedProjects} onDeleteProject={projectDeletedHandler} />
        )}
    </React.Fragment>
  
);

}

export default ProjectsByUserIdScreen;