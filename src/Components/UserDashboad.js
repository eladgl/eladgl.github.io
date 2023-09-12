import React, {useState} from 'react';
import styled from 'styled-components';
import User from './User';
import PatientDashboard from './PatientComponents/PatientDashboard';
import MyCalendar from './myCalendar';
import { makeTrainLogout } from '../client';

const HorizontalWrapper = styled.div`
    width: 100%;
    height: 95vh;
    display: flex;
    flex-direction: row;

    background-color: #242582;
`;

const VerticalWrapper = styled.div`
    width: 50%;
    height: 95vh;

    flex-direction: row;
    border: 1px solid black;
    justify-content: space-between; /* Add this line */
`;

const UserDashboard = ({ user }) => {
    //console.log(user);
    const [graphData, setGraphData] = useState({
        title: "gripArray",
        date : ""
    });

    const handleClick = () => {
        console.log(makeTrainLogout("user1",230,"2023-09-04"));
    };

    const handleChooseDataType = (graphTitle, graphDate) => {
        setGraphData({
            title : graphTitle === undefined ? "gripArray" : graphTitle,
            date: graphDate === undefined ? "yyyy-mm-dd" : graphDate
        });
    };

    return (
        <HorizontalWrapper>
            <VerticalWrapper>
                <User user={user} />
                <MyCalendar 
                    uploadGetData={handleChooseDataType}/>
            </VerticalWrapper>
            <VerticalWrapper>
                <PatientDashboard graphData={graphData}/>
            </VerticalWrapper>
            
            
        </HorizontalWrapper>
    );
};

export default UserDashboard;


//<button onClick={handleClick}>Click here</button>