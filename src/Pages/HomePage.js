import React from 'react';
import styled from 'styled-components';

const HomePageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100vh;
  border: 1px solid black;
  background-color: #242582;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
`;

const AboutContainer = styled.div`
  width: 100%;
  background-color: transparent; /* Set the background color for the about container */
  padding: 50px;
  margin:10px;
  color: white;
`;

const AboutText = styled.p`
  font-size: 1em;
  color: white;
`;

const HomePage = () => {
  return (
    <HomePageWrapper>
      <AboutContainer>
        <h1 style={{textDecoration: 'underline' }}>About Our IoT Treadmill for Accessibility</h1>
        <AboutText>
          At MobilityMate, we are dedicated to promoting inclusivity and improving the lives of individuals with mobility challenges. Our IoT Treadmill for Accessibility is designed with a singular mission: to empower people with disabilities to lead healthier, more active lives.
        </AboutText>
        <h2 style={{textDecoration: 'underline' }}>Key Features:</h2>
        <AboutText>
          <ol>
            <li><strong>Adaptive Mobility:</strong> Our IoT treadmill is equipped with adaptive features that cater to a wide range of mobility challenges. Whether it's difficulty walking or limited hand mobility, our treadmill is designed to accommodate various needs.</li>
            <li><strong>Real-Time Monitoring:</strong> We understand the importance of tracking progress. That's why our treadmill comes with a suite of IoT sensors that monitor key metrics in real-time...</li>
          </ol>
        </AboutText>
        <AboutText>
          <strong>Join Us on the Journey:</strong><br />
          We invite you to join us on the journey towards a healthier, more accessible future. Our IoT Treadmill for Accessibility is more than just a piece of equipment; it's a tool for empowerment, independence, and improved well-being. Together, we can redefine what's possible and ensure that everyone, regardless of their mobility challenges, can enjoy the benefits of an active lifestyle.
        </AboutText>
        <AboutText>
          Discover the freedom of movement, embrace progress, and experience the joy of achievement with MobilityMate's IoT Treadmill for Accessibility.
        </AboutText>
      </AboutContainer>
    </HomePageWrapper>
  );
};

export default HomePage;