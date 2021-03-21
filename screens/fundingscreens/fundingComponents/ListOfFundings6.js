import React from 'react';
import { Container } from 'react-bootstrap';
import FundingComponent from './FundingComponent';


const ListOfFundings6 = (props) => {

    const checkFunding = (funding) => {
        return funding.tip === "Covid startup";
    }


    return(
        <Container>
            {props.items.filter(checkFunding).map((item=>(
        <FundingComponent
        key={item.id}
        podtip={item.podtip}
        naslov={item.naslov}
        text={item.text}
        link={item.link} 
         />
    )))}
        </Container>
    )
}

export default ListOfFundings6;