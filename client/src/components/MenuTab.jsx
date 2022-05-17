import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
  margin-top: 1rem;
`;
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

const MenuTab = ({ menus, tabs, setTabs }) => {
  return (
    <TabWrapper>
      <Tabs>
        {menus.map((tab, idx) => (
          <Tab
            key={idx}
            className={`${tabs === idx ? "focused" : ""}`}
            onClick={() => {
              setTabs((prev) => idx);
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
