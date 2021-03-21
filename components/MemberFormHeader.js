import React from 'react';
import {Container} from 'react-bootstrap';

const MemberFormHeader = () => {
    return(
        <Container>
            <h3 style={{textAlign: 'center', fontWeight: 'bold'}}>StartupSite</h3>
            <p style={{textAlign: 'center'}}>StartupSite Insider: Annual Membership</p>
            <p style={{textAlign: 'center', fontWeight: 'bold'}}>99.00 EUR</p>
        </Container>
    )
}

export default MemberFormHeader;