import React from 'react';
import styled from 'styled-components';
import PatientGraph from './patientGraph';

const HorizontalWrapper = styled.div`
    width:100%;
    height:95vh;
    display:flex;
    flex-direction:row;
`;

 const PatientDashboard = ({user, graphData}) =>{
    return(
        <HorizontalWrapper>
            {user}
            <PatientGraph graphData={graphData}/>
        </HorizontalWrapper>
    );
};

export default PatientDashboard;