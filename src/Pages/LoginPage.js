//LoginForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { makeLoginRequest } from '../client';
import { useNavigate } from 'react-router-dom';
import * as con from '../Constants.js';
import { login } from '../actions/user';


// const Background = styled.div`
//   background-color: #242582;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const LoginPageWrapper = styled.div`
    display: flex;
    position: fixed;
    left:50%;
    top:50%;
    width:70%;
    height:70%;
    border:1px solid black;
    transform: translate(-50%, -50%);
    align-items:center;
    align-content: center;
    justify-content: center;
    background-color: #242582;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    max-width: 600px;
`;

// const VerticalWrapper = styled.div`
//     display:flex;
//     flex-direction:column;
//     width:100%;
//     height:100%;
//     align-items:center;
// `;

const Form = styled.form`
    display: flex;
    width:50%;
    height:50%;
    align-items:center;
    align-content: center;
    justify-content: center;
    max-width: 500px;
    table {
        border : 4px solid black;
    }
    tr, td {
        align-content: center;
    }


`;

const Label = styled.p`
    font-size:1.5em;
    color:#FFFFFF;
    flex:1;
    
`;

const ErrorLabel = styled(Label)`
    color:red;
    white-space: nowrap;
    font-weight: bold;
`;

const Input = styled.input`
    border:0;
    border-bottom: 2px solid white;
    color:#FFFFFF;
    font-size: 1.2em;
    background-color: transparent;
    flex:1;
    

    &:focus {
        outline: none;
        border:0;
        border-bottom: 2px solid #99738E;
    };
`;

const LoginButton = styled(Input)`
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

const CenteredCell = styled.td`
  text-align: center;
`;

const LoginPage = (props) => {

    const [username, setUsername] = useState("elad");
    const [password, setPassword] = useState("123456");
    const [isLogged, setLogged] = useState(0);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const showMessage = () => {
        return (
            <ErrorLabel>
                User already logged in
            </ErrorLabel>
        );
    };

    const handleLogin = (e) => {
        e.preventDefault();

        makeLoginRequest(username, password).then((result) => {
            try {
                console.log(result.data[0]);
                if (result.data[0].isLogged === 1) {
                    console.log("user is logged in");
                    setLogged(1);
                    return;
                }
                //console.log(result.data[0]);
                dispatch(login(result.data[0].username));

                if (result.data[0].role === con.PATIENT) {
                    console.log("Clicked patient");
                    setLogged(1);
                    navigate(con.PATIENT_PATH, { state: { userType: con.PATIENT, user: result.data[0] } });
                }
                else if (result.data[0].role === con.PHYSO) {
                    console.log("Clicked physio");
                    setLogged(1);
                    navigate(con.PHYSO_PATH, { state: { userType: con.PHYSO, user: result.data[0] } });
                }
            } catch (error) {
                console.log("LoginForm.js fail to handle login: ", error);
            }
        });
    };

    const userNameInput = () => {
        return (
            <tr>
                <td>
                    <Label>Username: </Label>
                </td>
                <td>
                    <Input
                        placeholder='username'
                        value={username}
                        onChange={handleUsernameChange} />
                </td>
            </tr>
        );
    };

    const passwordInput = () => {
        return (
            <tr>
                <td>
                    <Label>
                        Password:
                    </Label>
                </td>

                <td>
                    <Input
                        placeholder='password ****'
                        value={password}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                </td>
            </tr>
        );
    };

    const submitInput = () => {
        return (
            <tr>
                <CenteredCell colSpan="2">
                    <LoginButton
                        type="submit"
                        value="Login"
                        onClick={handleLogin}
                    />
                </CenteredCell>
            </tr>
        );
    };

    const loginTable = () => {
        return (
            <table>
                <tbody>
                    {userNameInput()}
                    {passwordInput()}
                    {submitInput()}
                </tbody>
            </table>
        );
    };

    return (
        <LoginPageWrapper>
            <Form>
                {loginTable()}
                {isLogged === 1 ? showMessage() : ""}
            </Form>
           
        </LoginPageWrapper>
    );
};

export default LoginPage;