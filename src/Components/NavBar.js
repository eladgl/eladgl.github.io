import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../actions/user';
import { useSelector, useDispatch } from 'react-redux';
import { logoutClient } from '../client';

const StyledNav = styled.nav`
  justify-content: center;
  width:100%;
  border-bottom: 1px solid salmon;
  border-image: linear-gradient(45deg, sandybrown, salmon) 1;
  background: linear-gradient(to right, #242582, #a341e1); 
  padding: 10px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const StyledLink = styled(Link)`
  color: #f64c72;
  font-size:1.2em;
  text-decoration: none;
  padding: 0 15px;
  transition: color 0.5s, background-color 0.5s;

  &:hover {
    color: #f6fc82;
    background-color: rgba(0, 0, 0, 1);
  }

  &:visited {
    color: #f64c72;
  }
`;

const NavBar = () => {

  const isLogged = useSelector(state => state.isLogged);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();


  const handleLogout = () => {
    if (user) {
      dispatch(logout(user));
      logoutClient(user);
    }
  }



  return (
    <StyledNav>
      <StyledLink to="/">Home</StyledLink>
      {isLogged === false
        ?
        (
          <Fragment>
            <StyledLink to="/Login">Login</StyledLink>
            <StyledLink to="/Register">Sign Up</StyledLink>
          </Fragment>
        )
        :
        (
          <StyledLink to="/" onClick={handleLogout}>Logout</StyledLink>
        )}
    </StyledNav >
  );
};

export default NavBar;
