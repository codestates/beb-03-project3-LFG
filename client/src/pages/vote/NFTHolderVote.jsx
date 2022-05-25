import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, getAgendaInformation, vote } from "../../common";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  padding: 1rem;
  margin-top: 95px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteWrapper = styled.div`
  padding: 2rem;
  background-color: whitesmoke;
  width: 800px;

  & > div:first-child {
    display: flex;
    gap: 3rem;
    justify-content: center;

    padding-bottom: 3rem;
    border-bottom: 1px solid gray;
  }
`;

const ProsCons = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.75);
  width: 50%;
  gap: 2rem;
  cursor: pointer;

  & > div:first-child {
    font-size: 1.2rem;
  }
`;

const VoteDescription = styled.div`
  margin-top: 3rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

const Vote = styled(Button)``;

const NFTHolderVote = () => {
  const { id } = useParams();
  const { user } = useOutletContext();
  const [agenda, setAgenda] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [prosCons, setProsCons] = useState({ pros: 0, cons: 0 });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    getAgendaInformation(
      id,
      user,
      setAgenda,
      setTokenIds,
      setProsCons,
      setIsClosed
    );
  }, [id, user]);

  return (
    <Div>
      {agenda === null ? (
        <LoadingSpinner />
      ) : (
        <>
          <Description>
            <div>{agenda.title}</div>
          </Description>
          <VoteWrapper>
            <div>
              <ProsCons>
                <div>Pros</div>
                <div>{prosCons.pros}</div>
              </ProsCons>
              <ProsCons>
                <div>Cons</div>
                <div>{prosCons.cons}</div>
              </ProsCons>
            </div>
            <VoteDescription>{agenda.description}</VoteDescription>
            {isClosed ? (
              <div>Closed</div>
            ) : (
              <ButtonWrapper>
                <Vote
                  onClick={async () => {
                    await vote(tokenIds, agenda.agendaAddress, 1, user);
                    window.location.reload();
                  }}
                >
                  Pros
                </Vote>
                <Vote
                  onClick={async () => {
                    await vote(tokenIds, agenda.agendaAddress, 0, user);
                    window.location.reload();
                  }}
                >
                  Cons
                </Vote>
              </ButtonWrapper>
            )}
          </VoteWrapper>
        </>
      )}
    </Div>
  );
};

export default NFTHolderVote;
