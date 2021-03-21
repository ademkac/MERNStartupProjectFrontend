import React from 'react';
import {Carousel} from 'react-bootstrap';
import CardComponent from '../components/Card';
import {LinkContainer} from 'react-router-bootstrap'


const CarouselEventsComponent = (props) => {

    if(props.items.length === 0){
        return(
            <div>
                <h2>Trenutno nema dogadjaja</h2>
            </div>
        )
    }

    return(
        <Carousel  style={{maxHeight: 300}}>
            {props.items.map(item=>
                (
                    <LinkContainer key={item.id} to={`/events/${item.id}`}>
                <Carousel.Item  id={item.id} key={item.id}>
                    <CardComponent
                    style={{ width: '100%', height: 300 , cursor: 'pointer'  }}
                    src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`}
                    title={item.naslov}
                    text={item.datum}
                    slikaStyle={{width: '100%', height: '100%'}}
                    path={`/events/${item.id}`}
                    />
                </Carousel.Item>
                </LinkContainer>
                )
            )}
            

        </Carousel>
    )
}

export default CarouselEventsComponent;