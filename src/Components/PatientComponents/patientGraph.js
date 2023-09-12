import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReferenceLine, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart } from 'recharts';
import styled from 'styled-components';
import {Titles, graphXAxis, UNITS} from '../../constants/patient';

const Title = styled.h1`
  color: #f64c72;
  text-align: center; /* Center the title horizontally */
`;

const SubTitle = styled.h3`
  color: #f64c72;
  text-align: center; /* Center the title horizontally */
`;

const Container = styled.div`
  width:100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the chart and title vertically */
`;

const PatientGraph = ({graphData}) => {
  const dataFromRedux = useSelector((state) => state.data);
  const [chartData, setChartData] = useState([]);
  //console.log("dataFromRedux ", dataFromRedux);
  useEffect(() => {
    // Extract and format data when 'dataFromRedux' changes
    if (dataFromRedux) {
      const timeSamplingArray = dataFromRedux[0]?.timeSamplingArray?.split(',').map(parseFloat) || [];
      //console.log('timeSamplingArray ', timeSamplingArray);
      const gripArray = dataFromRedux[0]?.gripArray?.split(',').map(parseFloat) || [];
      const accelerationArray = dataFromRedux[0]?.accelerationArray?.split(',').map(parseFloat) || [];
      const velocityArray = dataFromRedux[0]?.velocityArray?.split(',').map(parseFloat) || [];
      const distanceArray = dataFromRedux[0]?.distance?.split(',').map(parseFloat) || [];
      const weightArray = dataFromRedux[0]?.weightArray?.split(',').map(parseFloat) || [];

      // Create an array of objects with 'name' and 'uv' properties for the chart
      const formattedData = timeSamplingArray.map((time, index) => ({
        name: time.toFixed(2), // Format time as needed
        grip: gripArray[index],
        acceleration: accelerationArray[index],
        velocity: velocityArray[index],
        distance: distanceArray[index],
        weight: weightArray[index],
      }));

      setChartData(formattedData);
    }
  }, [dataFromRedux]);
  console.log(typeof graphData.date);
  return (
    <Container>
      <Title>{Titles[graphData.title]}</Title>
      <SubTitle>Showing data for {graphData.date}</SubTitle>
      <ResponsiveContainer width="90%" height="80%">
        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" />
          <YAxis unit={UNITS[graphData.title]}/>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <ReferenceLine x={2} stroke="green" label="Min PAGE" />
          <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
          <Area type="monotone" dataKey={graphXAxis[graphData.title]} stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default PatientGraph;
