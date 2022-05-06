import React, { useState } from "react";
import styled from "styled-components";

const TabWrapper = styled.div``;
const Tabs = styled.ul`
  display: flex;
  .focused {
    border-bottom-color: black;
  }
`;
const Tab = styled.li`
  cursor: pointer;
  padding: 1.5rem 0.8rem 1.5rem 0.8rem;
  border-bottom: 2px solid gray;

  &: hover {
    background-color: salmon;
  }
`;

const MenuTab = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const tabArr = [
    { name: "LISTINGS" },
    { name: "HISTORY" },
    { name: "MY LISTED LOANS" },
    { name: "MY FUNDED LOANS" },
    { name: "HELP / FAQ" },
  ];

  return (
    <TabWrapper>
      <Tabs>
        {tabArr.map((tab, idx) => (
          <Tab
            key={idx}
            className={`${currentTab === idx ? "focused" : ""}`}
            onClick={() => {
              setCurrentTab(idx);
            }}
          >
            {tab.name}
          </Tab>
        ))}
      </Tabs>
    </TabWrapper>
  );
};

export default MenuTab;
