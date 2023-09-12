import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import { getTrainingData } from '../client';
import { useSelector, useDispatch } from 'react-redux';
import { show_data } from '../actions/user';

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Choices = styled.select`
  width: 50%;
  height:35px;
  background: transparent;
  text-align: center;
  color: #f64c72;
  font-size:1.2em;
  font-weight: bold;
  padding-left: 5px;
  font-size: 14px;
  border:linear-gradient(45deg, sandybrown, salmon) 1;
  margin-left: 10px;

  transition: color 1s, background-color 1s;

  &:hover {
    color: #f6fc82;
    background-color: rgba(0, 0, 0, 1);
  }
       option {
         color: #f64c72;
         font-weight: small;
         display: flex;
         white-space: pre;
         min-height: 20px;
         padding: 0px 2px 1px;
       }
`;

const GetDataButton = styled.button`
  margin-top: 10px;
  width: 50%;
  height:35px;
  background: transparent;
  text-align: center;
  color: #f64c72;
  font-size:1.2em;
  font-weight: bold;
  padding-left: 5px;
  font-size: 14px;
  border:linear-gradient(45deg, sandybrown, salmon) 1;
  margin-left: 10px;

  transition: color 1s, background-color 1s;

  &:hover {
    color: #f6fc82;
    background-color: rgba(0, 0, 0, 1);
  }
`;

const MyCalendar = ({uploadGetData}) => {
  const [date, setDate] = useState(new Date());
  const [choice, setChoice] = useState("gripArray");
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // You can add your custom logic here when a date is selected.
  };

  const handleSelectChange = (e) => {
    setChoice(e.target.value);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleGetData = async () => {
    try {
      // Make an API request to get training data
      const { status, data } = await getTrainingData(formatDate(date), user, choice); // Replace 'selectedDate' and 'userTrainingId' with actual values from your Redux store
      uploadGetData(choice, formatDate(date));
      if (status === 200) {
        // Handle the retrieved data (e.g., update your state with the data)
        //console.log('Training data:', data);
        dispatch(show_data(data));
      } else {
        // Handle errors (e.g., show an error message)
        console.error('Failed to retrieve training data');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <Container>
      <Calendar
        onChange={handleDateChange}
        value={date}
      />
      <Choices onChange={handleSelectChange}>
        <option value="gripArray">Grip Pressure</option>
        <option value="velocityArray">Speed</option>
        <option value="accelerationArray">Acceleration</option>
        <option value="distance">Distance Covered</option>
        <option value="weightArray">Weight Pressure</option>
      </Choices>
      <GetDataButton onClick={handleGetData}>
      Get Graph Data
      </GetDataButton>
    </Container>
  );
};

export default MyCalendar;
