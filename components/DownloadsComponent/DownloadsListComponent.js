import React from 'react';
import DownloadsComponent from './DownloadsComponent';


const DownloadsListComponent = (props) => {

    if(props.items.length === 0) {
        return(
            <div className="center">
                <h2>Trenutno nema dostupnih kurseva</h2>
            </div>
        );
    }

    return(
        <div className="container">
        {props.items.map(download=>(
            <DownloadsComponent
            key={download.id}
            id={download.id}
            image={download.image}
            naslov={download.naslov}
            opis={download.opis}
            zahtevi={download.zahtevi}
            link={download.link}
             />
        ))}
        </div>
    )

}

export default DownloadsListComponent;