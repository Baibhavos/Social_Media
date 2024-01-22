import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import { useMemmo } from "react";
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themeSettings } from './theme';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemmo(() => createTheme(themeSettings(mode)), [mode]);
  return (
     <div className="App">
        <BrowserRouter>
           <ThemeProvider theme={theme}>
            <CssBaseline />
              <Routes>
                 <Route path="/" element={<LoginPage />} />
                 <Route path="home" element={<HomePage />} />
                 <Route path="/profile/:userId" element={<ProfilePage />} />
              </Routes>
           </ThemeProvider>
        </BrowserRouter>
     </div>
  );
}

export default App;
