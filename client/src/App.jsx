import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import styled from "styled-components";

const Rootdiv = styled.main`
  display: flex;
  flex-direction: column;

  height: 300vh;
`;

const App = () => {
  return (
    <Rootdiv>
      <Navigation />
      <Home />
      <Footer />
    </Rootdiv>
  );
};

export default App;
