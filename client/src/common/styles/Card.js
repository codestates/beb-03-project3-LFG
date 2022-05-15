import styled from "styled-components";

const CardWrapper = styled.div`
  background-color: var(--main-theme);
  border-radius: 1.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;

  cursor: pointer;
`;

const FigureWrapper = styled.div`
  border-bottom: 1px solid tomato;
  padding-bottom: 0.75rem;
`;
const Figure = styled.img.attrs({
  src: "/test/lfgcard.png",
})`
  width: 100%;
`;
const FigCaption = styled.div``;
const Title = styled.div`
  font-weight: bold;
`;
const Name = styled.div``;

export { CardWrapper, FigureWrapper, Figure, FigCaption, Title, Name };
