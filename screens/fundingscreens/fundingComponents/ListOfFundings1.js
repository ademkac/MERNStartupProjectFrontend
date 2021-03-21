import React from 'react';
import { Container } from 'react-bootstrap';
import FundingComponent from './FundingComponent';


const ListOfFundings1 = (props) => {

    const checkFunding = (funding) => {
        return funding.tip === "Startup funding non";
    }
    return(
        <Container>
            {props.items.filter(checkFunding).map(item=>(
                <FundingComponent
                key={item.id}
                podtip={item.podtip}
                naslov={item.naslov}
                text={item.text}
                link={item.link}
                 />
            ))}
        </Container>
    )
}

export default ListOfFundings1;