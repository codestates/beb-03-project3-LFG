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
  margin-bottom: 3rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  padding: 2rem;
  background-color: whitesmoke;
  position: relative;

  & > div:first-child {
    padding-bottom: 3rem;
    border-bottom: 1px solid gray;
  }

  & > div:last-child {
    font-size: 0.8rem;
    position: absolute;
    right: 0;
    top: -2rem;
  }

  & > div {
    & > div:first-child {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
    }
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
  & > div {
    margin-top: 1.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: space-around;
`;

const Vote = styled(Button)`
  background-color: aliceblue;
  width: 10rem;
  transition: all 0.3s ease;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.75);

  &:hover {
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
    opacity: 1;
  }
`;

const NFTHolderVote = () => {
  const { id } = useParams();
  const { user, setShowAlert, setAlertState } = useOutletContext();
  const [agenda, setAgenda] = useState(null);
  const [tokenIds, setTokenIds] = useState([]);
  const [possibleTokenIds, setPossibleTokenIds] = useState([]);
  const [prosCons, setProsCons] = useState({ pros: 0, cons: 0 });
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    getAgendaInformation(
      id,
      user,
      setAgenda,
      setTokenIds,
      setProsCons,
      setIsClosed,
      setPossibleTokenIds
    );
  }, [id, user]);

  return (
    <Div>
      {agenda === null ? (
        <LoadingSpinner />
      ) : (
        <>
          <Description>
            <div>Proposal - #{id}</div>
          </Description>
          <VoteWrapper>
            <div>
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
              <div>
                {isClosed ? (
                  <div>Closed</div>
                ) : (
                  <ButtonWrapper>
                    <Vote
                      onClick={async () => {
                        if (possibleTokenIds.length === 0) {
                          setAlertState((prev) => {
                            return {
                              message: "you don't have oasis nft",
                              status: "FAILED",
                            };
                          });
                          setShowAlert(true);
                        } else {
                          await vote(tokenIds, agenda.agendaAddress, 1, user);
                          window.location.reload();
                        }
                      }}
                    >
                      Pros
                    </Vote>
                    <Vote
                      onClick={async () => {
                        if (possibleTokenIds.length === 0) {
                          setAlertState((prev) => {
                            return {
                              message: "you don't have oasis nft",
                              status: "FAILED",
                            };
                          });
                          setShowAlert(true);
                        } else {
                          await vote(tokenIds, agenda.agendaAddress, 0, user);
                          window.location.reload();
                        }
                      }}
                    >
                      Cons
                    </Vote>
                  </ButtonWrapper>
                )}
              </div>
            </div>
            <VoteDescription>
              <h2>{agenda.title}</h2>
              <div>{agenda.description}</div>
            </VoteDescription>
            <div>Possible Oasis NFTS to vote: {possibleTokenIds.length}</div>
          </VoteWrapper>
        </>
      )}
    </Div>
  );
};

export default NFTHolderVote;
