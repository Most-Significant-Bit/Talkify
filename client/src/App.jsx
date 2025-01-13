import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../utils/Themes";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Favourite from "./pages/Favourite";
import Search from "./pages/Search";
import DisplayPodcast from "./pages/DisplayPodcast";
import Profile from "./pages/Profile";
import PodcastDetails from "./pages/PodcastDetails"

const Container = styled.div`
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.bgLight};
  height: 100vh;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          {menuOpen && (
            <Sidebar
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
            />
          )}

          <Frame>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <Routes>
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/favourites" element={<Favourite/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/podcast/:id" element={<PodcastDetails/>}/>
              <Route path="/showpodcasts/:type" element={<DisplayPodcast/>}/>
            </Routes>
          </Frame>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
