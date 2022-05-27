import styled from "styled-components";

const Button = styled.button`
  border: none;
  outline: none;
  border-radius: 3rem;
  padding: 0.75rem;
  font-family: "FixedSys";
  display: flex;
  align-items: center;
  transition: 0.1s all ease-in;

  &: hover {
    opacity: 0.7;
  }
`;

export default Button;
