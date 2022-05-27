import React, { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../App";
import { Button, EditIcon, CreditScoreIcon } from "../../common";
import MenuTab from "../common/MenuTab";

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
  src: "/test/profile.png",
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

const Profile = ({ tabs, setTabs }) => {
  const { score } = useContext(UserContext);

  const tabArr = [
    { name: "MY NFTS" },
    { name: "MY LISTED LOANS" },
    { name: "FUNDED LOANS" },
    { name: "CREATED TRADES" },
    { name: "INCOMING OFFERS" },
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
          <ConnectDiscord>
            <DiscordWrapper>
              <CreditScoreIcon />
            </DiscordWrapper>
            <ConnectBtn>Vote Point: {score.votePoint}</ConnectBtn>
            <ConnectBtn>
              Contribution Score:{" "}
              {score.probability === "" ? 0 : score.probability} %
            </ConnectBtn>
          </ConnectDiscord>
        </UserInfo>
      </ProfileDiv>
      <MenuWrapper>
        <MenuTab menus={tabArr} tabs={tabs} setTabs={setTabs} />
      </MenuWrapper>
    </ProfileWrapper>
  );
};

export default Profile;
