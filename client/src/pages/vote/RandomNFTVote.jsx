import React, { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import styled from "styled-components";
import { Button, getVault, voteToCandid } from "../../common";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Description = styled.div`
  padding: 1rem;
  margin-top: 95px;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  & > div:first-child {
    font-size: 1.5rem;
  }

  & > div:nth-child(2) {
    font-size: 1.1rem;
  }
`;

const Votes = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 1rem;
  width: 800px;
  gap: 1rem;
`;

const Vote = styled.div`
  display: flex;
  gap: 2rem;
  border-radius: 1rem;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  cursor: pointer;
  background-color: whitesmoke;
`;

const Img = styled.img.attrs((props) => ({
  src: props.fig,
}))`
  width: 10rem;
  height: 10rem;
`;

const Info = styled.div`
  flex: 1 1 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 3rem;
`;

const VoteBtn = styled(Button)`
  background-color: var(--main-theme);
  color: white;
  justify-content: center;
  width: 5rem;
`;

const RandomNFTVote = () => {
  const params = useParams();
  const [season, setSeason] = useState(null);
  const [totalVote, setTotalVote] = useState(0);
  const { user, score, setShowAlert, setAlertState } = useOutletContext();

  const calrate = (val, total) => {
    return ((val / total) * 100).toFixed(2);
  };

  useEffect(() => {
    getVault(params.id, setSeason);
  }, [params.id]);

  useEffect(() => {
    setTotalVote((prev) => {
      return season?.candidate.reduce((acc, curr) => acc + curr.vote, 0);
    });
  }, [season]);

  return (
    <Div>
      {season === null ? (
        <LoadingSpinner />
      ) : (
        <>
          <Description>
            <div>{season.title}</div>
            <div>{season.description}</div>
          </Description>
          <Votes>
            {season.candidate.map((data, idx) => (
              <Vote key={idx}>
                <Img fig={data.image} />
                <Info>
                  <div>
                    <div>{data.projectName}</div>
                    <div>{calrate(data.vote, totalVote)} %</div>
                  </div>
                  <VoteBtn
                    onClick={async () => {
                      if (score.votePoint === 0) {
                        setAlertState((prev) => {
                          return {
                            message: "you have no vote point!",
                            status: "FAILED",
                          };
                        });
                        setShowAlert(true);
                      } else {
                        await voteToCandid(season._id, data.nftAddress, user);
                        window.location.reload();
                      }
                    }}
                  >
                    Vote
                  </VoteBtn>
                </Info>
              </Vote>
            ))}
          </Votes>
        </>
      )}
    </Div>
  );
};

export default RandomNFTVote;
