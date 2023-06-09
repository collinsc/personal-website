import React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';
import { GameOfLife } from './gameOfLife';

function Title() {
  return(<div>
      <Typography variant="h2">Collin Conway</Typography>
      <Typography variant="subtitle1">Software Engineer with a large hat closet and an eye for quality relocating to New England</Typography>
    </div>)
}

function AboutMe() {
  return(
    <div>
      <Typography variant="h4">About Me</Typography>
      <Typography>I am originally from the pacific northwest, but I am relocating to New England live closer to family.
      Professionally I have 5 years of experience writing high performance systems software for electronics manufacturing systems.
      My interests include data, robots, scripting languages, and rooting out complex issues.</Typography>
    </div>
    )
}

function Contact() {
  return(
    <div>
      <Typography variant="h4">Contact</Typography>
      <Breadcrumbs aria-label="breadcrumb"   sx={{
            "& ol": {
              justifyContent: "center",
              margin: "auto"
            }
          }}>
        <Link href="static/collin_conway_resume.pdf" download>
          Resume
        </Link>
        <Link href="mailto: collinsconway@gmail.com">
          collinsconway@gmail.com
        </Link>
        <Link href="https://github.com/collinsc">
          Github
        </Link>
        <Link href="https://www.linkedin.com/in/collin-s-conway">
          LinkedIn
        </Link>
      </Breadcrumbs>
    </div>
    )
}

function App() {
  const theme = createTheme({
      palette: {
        primary: {
          main: '#61828A',
        },
        secondary: {
          main: '#ABC3CD',
        },
        text: {
          primary: '#A9CCCF',
          secondary: '#DFE9EB'
        },
        background: {
          default: '#ABC3CD'
        }
      },

    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx = {{ 
        "bgcolor": "primary.main",
        "color":"text.primary",
        "textAlign": "center"
      }}>
        <Container >
          {Title()}
        </Container>
      </Box>
      <Box sx = {{ 
        "bgcolor": "secondary.main",
        "color": "text.secondary"
      }}>
        <Container>
          {AboutMe()}
        </Container>
        <Container>
          {GameOfLife()}
        </Container>
        <Container>
          {Contact()}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
