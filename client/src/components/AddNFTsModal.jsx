import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Rootdiv, SearchIcon, getMetadata } from "../common";
import CollectionList from "./CollectionList";
import axios from "axios";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(255, 255, 255, 0.7);
`;

const Main = styled.div`
  background-color: var(--main-theme);

  display: flex;
  flex-direction: column;

  width: 1000px;
  height: 770px;
  border-radius: 1rem;
  padding: 0.75rem;
`;

const Title = styled(Rootdiv)`
  gap: 1rem;
  justify-content: center;
  align-items: center;

  & > div:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
  margin-bottom: 1rem;
`;

const SearchDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
`;

const InputWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  margin-bottom: 1rem;
`;
const CollectionInput = styled.input.attrs((props) => ({
  value: props.value,
  onChange: props.onChange,
  placeholder: "Search for Collection..",
}))`
  width: 100%;
  outline: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding-left: 3rem;
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 35px;
  width: 35px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Collections = styled.div`
  border-radius: 1rem;
  border: 1px solid tomato;
  flex: 1 1 0;

  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  justify-content: center;
`;

const AddNFTsModal = ({
  isOpen,
  setIsOpen,
  setConditions,
  selectedNFTs,
  user,
  counterParty,
  isReceive,
}) => {
  const [collection, setCollection] = useState("");
  const [myNFTs, setMyNFTs] = useState([]);
  const [colls, setColls] = useState({}); // 소유하고있는 NFT 리스트
  const [selected, setSelected] = useState([]); // 선택된 NFT 리스트

  useEffect(() => {
    const get = async () => {
      const {
        data: { myNftList },
      } = await axios.post("http://127.0.0.1:4002/myPage", {
        userAddress: isReceive ? counterParty : user,
      });

      const promises = myNftList.map((d) => getMetadata(d.tokenURI));
      Promise.all(promises).then((resolve) => {
        setMyNFTs((prev) =>
          resolve.map((data, idx) => {
            return {
              ...data.data,
              ...myNftList[idx],
            };
          })
        );
      });
    };
    get();
  }, [user, isReceive, counterParty]);

  useEffect(() => {
    const data = {};
    myNFTs.forEach((val) => {
      if (data[val.projectName]) {
        data[val.projectName].push(val);
      } else {
        data[val.projectName] = [];
        data[val.projectName].push(val);
      }
    });
    setColls((prev) => data);
  }, [myNFTs]);

  return (
    <Wrapper
      onClick={() => {
        if (isOpen) setIsOpen(false);
      }}
    >
      <Main onClick={(e) => e.stopPropagation()}>
        <Title>
          <div>Select NFTs</div>
          <div>Browse and search NFTs, click to select</div>
        </Title>
        <SearchDiv>
          <div>Search</div>
          <InputWrapper>
            <CollectionInput
              value={collection}
              onChange={(e) => setCollection(e.target.value)}
            />
            <IconWrapper>
              <SearchIcon />
            </IconWrapper>
          </InputWrapper>
          <Collections>
            {Object.keys(colls).map((key, idx) => (
              <CollectionList
                key={idx}
                colls={colls[key]}
                setSelected={setSelected}
                selectedNFTs={selectedNFTs}
              />
            ))}
          </Collections>
        </SearchDiv>
        <ButtonWrapper>
          <Button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              setConditions((prev) => {
                return {
                  ...prev,
                  nfts: [...selected],
                };
              });
            }}
          >
            Select NFTs
          </Button>
        </ButtonWrapper>
      </Main>
    </Wrapper>
  );
};

export default AddNFTsModal;
