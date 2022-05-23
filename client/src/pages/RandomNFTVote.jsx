import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../common";

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

let dummy = [
  {
    image:
      "https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/0.png",
    projectName: "Azuki",
    vote: 2,
  },
  {
    image:
      "https://dweb.link/ipfs/bafybeibnzhc7vp4hnfcocw7s2jej2tj5xqpwseyz3ifylismh47cr45rhm",
    projectName: "BAYC",
    vote: 9,
  },
];

const RandomNFTVote = () => {
  const [totalVote, setTotalVote] = useState(0);

  useEffect(() => {
    setTotalVote((prev) => {
      return dummy.reduce((acc, curr) => acc + curr.vote, 0);
    });
  });

  const calrate = (val, total) => {
    return ((val / total) * 100).toFixed(2);
  };

  return (
    <Div>
      <Description>RandomNFTVote</Description>
      <Votes>
        {dummy.map((data, idx) => (
          <Vote>
            <Img fig={data.image} />
            <Info>
              <div>
                <div>{data.projectName}</div>
                <div>{calrate(data.vote, totalVote)} %</div>
              </div>
              <VoteBtn>Vote</VoteBtn>
            </Info>
          </Vote>
        ))}
      </Votes>
    </Div>
  );
};

export default RandomNFTVote;
