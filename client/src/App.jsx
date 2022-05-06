import Home from "./pages/Home";
import styled from "styled-components";
import Navigation from "./components/Navigation";

const Rootdiv = styled.main`
  display: flex;
  flex-direction: column;
`;

const App = () => {
  return (
    <Rootdiv>
      <Navigation />
      <Home />
    </Rootdiv>
  );
};

export default App;
