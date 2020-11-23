import React from 'react';
import { Container } from 'semantic-ui-react';
import CertHeader from './header';
import CertFooter from './footer';


export default (props) => {
    return (
        <Container>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
                <CertHeader />
                    {props.children}
                <CertFooter />
        </Container>
    );
};


