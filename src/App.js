import './App.css';
import { useState, useMemo } from "react";
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode
        }
      }),
    [mode]
  );
  return (
    <NoteState>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <div className="App">
          <Navbar/>
          <IconButton sx={{ width: '2em', position: 'fixed', bottom: '1em', right: '1em' }} onClick={() => setMode(mode === "light" ? "dark" : "light")} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Routes>
              <Route exact path="/home" element={<Home/>}/>
              <Route exact path="/about" element={<About/>}/>
              <Route exact path="/login" element={<Login />}/>
              <Route exact path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </ThemeProvider>
    </NoteState>
  );
}

export default App;
