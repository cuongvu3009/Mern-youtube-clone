import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utils/Theme';

import Menu from './components/Menu';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Video from './pages/Video';

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  const [darkMode, setDarkMode] = React.useState(true);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route index element={<Home type='random' />} />
              <Route path='/trends' element={<Home type='trend' />} />
              <Route
                path='/subscriptions'
                element={<Home type='subscription' />}
              />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/video/:id' element={<Video />} />
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </ThemeProvider>
  );
}

export default App;
