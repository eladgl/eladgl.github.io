import React, { useState } from 'react';
import styled from 'styled-components';
import AvatarModal from './avatarModal';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
`;

const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid white;
  display: flex;
  margin-right: 10px;
  cursor: pointer;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Lbl = styled.p`
  color: #FFFFFF;
  font-size: 1.5em;
  margin: 0;
`;

const NameLabel = styled(Lbl)`
  font-size: 0.9em;
  font-weight: bold;
`;

const User = ({ user }) => {
  const { fname, lname, profilePic } = user;
  const [showModal, setShowModal] = useState(false);
  const userImageSrc = "https://thispersondoesnotexist.com/";
  const [loadedUserImage, setLoadedUserImage] = useState(null);

  const handleAvatarClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageLoad = () => {
    setLoadedUserImage(userImageSrc);
  };

  return (
    <Container>
      <UserAvatar onClick={handleAvatarClick}>
        <AvatarImage
          src={loadedUserImage || userImageSrc}
          alt="user"
          onLoad={handleImageLoad}
        />
      </UserAvatar>
      <UserInfo>
        <NameLabel>{fname + ' ' + lname}</NameLabel>
      </UserInfo>
      {showModal && (
        <AvatarModal src={loadedUserImage || userImageSrc} onClose={handleCloseModal} />
      )}
    </Container>
  );
};


export default User;
