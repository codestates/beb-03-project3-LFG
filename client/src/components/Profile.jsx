import React from "react";
import styled from "styled-components";
import { MenuTab } from "../common/styles";
import ContentPasteGoIcon from "@mui/icons-material/ContentPasteGo";
import EditIcon from "@mui/icons-material/Edit";

const ProfileWrapper = styled.div`
  margin: auto;
  margin-top: 100px;
  background-color: var(--main-theme);
  width: 85%;

  border-radius: 1rem;

  margin-bottom: 3rem;

  overflow: hidden;
`;

const ProfileDiv = styled.div`
  padding: 1rem;
`;

const Avatar = styled.img.attrs({
  src: "/profile.png",
  alt: "profile",
})`
  width: 128px;
  border-radius: 1rem;

  @media (min-width: 1000px) {
    width: 11rem;
  }
`;

const UserInfo = styled.div``;
const Name = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > svg {
    cursor: pointer;
  }
`;
const Description = styled.div`
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  & > svg {
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
`;
const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 3rem;
  padding: 0.75rem;
  font-family: "Knewave-Regular";
  display: flex;
  align-items: center;
  opacity: 0.9;
  transition: 0.1s all ease-in;

  &:hover {
    opacity: 1;
  }
`;
const CopyProfileBtn = styled(Button)`
  background-color: salmon;
`;

const JoinDiscordBtn = styled(Button)`
  margin-left: 1rem;
  background-color: tomato;

  & > img {
    margin-right: 0.5rem;
  }
`;

const Discord = styled.img.attrs({
  src: "/Discord-Logo-White.svg",
  alt: "discord",
})`
  width: 20px;
`;

const ConnectDiscord = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
`;
const DiscordWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: gray;
  border-radius: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConnectBtn = styled(Button)``;
const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: salmon;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  & > div {
    background-color: salmon;
    margin-top: 0;
  }
`;

const Profile = () => {
  const tabArr = [
    { name: "MY NFTS" },
    { name: "LISTED NFTS" },
    { name: "OPEN TRADES" },
    { name: "INCOMING OFFERS" },
    { name: "MY LISTED LOANS" },
    { name: "FUNDED LOANS" },
  ];

  return (
    <ProfileWrapper>
      <ProfileDiv>
        <Avatar />
        <UserInfo>
          <Name>
            Username
            <EditIcon />
          </Name>
          <Description>
            Description <EditIcon />
          </Description>
          <ButtonWrapper>
            <CopyProfileBtn>
              <ContentPasteGoIcon
                style={{ color: "white", marginRight: "0.5rem" }}
              />
              Copy my profile link
            </CopyProfileBtn>
            <JoinDiscordBtn>
              <Discord />
              Join LFG discord
            </JoinDiscordBtn>
          </ButtonWrapper>
          <ConnectDiscord>
            <DiscordWrapper>
              <Discord />
            </DiscordWrapper>
            <ConnectBtn>Connect Discord</ConnectBtn>
          </ConnectDiscord>
        </UserInfo>
      </ProfileDiv>
      <MenuWrapper>
        <MenuTab menus={tabArr} />
      </MenuWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
