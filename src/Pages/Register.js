import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../Constants.js';
import { makeRegisteration } from '../client.js';

const Background = styled.div`
  background-color: #242582;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  //background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
  width:50%;
  border-radius: 15px;
  overflow: auto;
`;

const InlineInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  
`;

const Label = styled.label`
  color: white;
  margin-bottom: 5px;
  width:20%;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  //padding: 10px;
  color: white;
  border: none;
  border-bottom: 2px solid white;
  background-color: transparent;
  outline: none;
  transition: border-bottom 0.3s ease;

  &:focus {
    border-bottom: 2px solid #f64c72;
  }
`;

const Button = styled.button`
  background-color: #f64c72;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  &:active {
        transform: scaleY(0.9) scaleX(0.9);

    };

    &:hover {
        background-color: #ff4cff;
    };
`;

const StyledSelect = styled.select`
    width: 100%;
    color: white;
    border: none;
    border-bottom: 2px solid white;
    background-color: transparent;
    outline: none;
    transition: border-bottom 0.3s ease;

    &:focus {
        border-bottom: 2px solid #f64c72;
    }

    option {
        color:black;
    }
`;

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'patient',
        fname: '',
        lname: '',
        age: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registata:');
        // Perform validation and call the register function with formData
        if (validateForm()) {
            // Call your registration function here, passing formData
            console.log('Registration data:', formData);
            //const reg = formData;
            const { username, password, age, role, fname, lname, image } = formData;
            console.log("response is: ", makeRegisteration(username, password, age, role, fname, lname, image));
            navigate("../" + LOGIN);
        }
    };

    const validateForm = () => {
        // return (
        //     validateUsername(formData.username.trim()) &&
        //     validatePassword(formData.password.trim()) &&
        //     (formData.role.trim() === 'patient' || formData.role.trim() === 'physiotherapist') &&
        //     validateName(formData.fname.trim()) &&
        //     validateName(formData.lname.trim()) &&
        //     validateAge(formData.age.trim())
        // );
        return true;
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z0-9]{10}$/;
        return regex.test(username) && username !== '';
    }

    const validateAge = (age) => {
        const ageNumber = Number(age);
        return !isNaN(ageNumber) && ageNumber >= 0 && ageNumber <= 120 && validateAge !== '';
    };

    const validatePassword = (password) => {
        // Define a single regex pattern with positive lookahead assertions.
        const passwordRegex = /.{1,8}$/;

        // Test the password against the combined pattern.
        return passwordRegex.test(password) && password !== '';
    };

    const validateName = (name) => {
        const regex = /^[a-zA-Z]{20}$/;
        return regex.test(name) && name !== '';
    }

    return (
        <Background>
            <FormContainer>
                <InlineInputWrapper>
                    <Label>Username:</Label>
                    <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>Password:</Label>
                    <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>Role:</Label>
                    <StyledSelect
                        name="role"
                        value={formData.role}
                        onChange={handleChange}>
                        <option value="patient">Patient</option>
                        <option value="physiotherapist">Physiotherapist</option>
                    </StyledSelect>
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>First Name:</Label>
                    <Input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                    />
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>Last Name:</Label>
                    <Input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                    />
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>Age:</Label>
                    <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </InlineInputWrapper>
                <InlineInputWrapper>
                    <Label>Select an image:</Label>
                    <Input type="file" name="image" id="image" accept="image/*" onChange={handleChange} />
                </InlineInputWrapper>
                <Button onClick={handleSubmit}>Register</Button>
            </FormContainer>
        </Background>
    );
};

export default Register;
