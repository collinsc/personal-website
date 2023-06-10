import React, {ReactNode} from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { GameOfLife } from './gameOfLife';

import openDyslexicImage from './open_dyslexic_sample.png';
import rmcImage from './rmc_group.jpg';


interface Props {
  children?: ReactNode
}

function CenterDarkBox( { children, ...props }: Props) {
  return (
    <Box sx = {{ 
      "bgcolor": "primary.main",
      "color":"text.primary",
      "textAlign": "center",
      py: 1,
      px: 0,
      //minWidth: '450px'
    }} {...props} >
    <Container >
    {children}
    </Container>
    </Box>)
}

function LightBox({ children, ...props }: Props) {
  return (
    <Box sx = {{ 
      "bgcolor": "secondary.main",
      "color": "text.secondary",
      py: 1,
      px: 0,
     // minWidth: '450px'
    }} {...props}>
    <Container >
      {children}
    </Container>
    </Box>)
}


function Title() {
  return(
    <CenterDarkBox>
      <Typography variant="h2">Collin Conway</Typography>
      <Typography variant="subtitle1" sx={{fontStyle: 'italic'}}>
        Seasoned Software Engineer, data hound and bug hunter relocating to New England.
      </Typography>
    </CenterDarkBox>)
}

function AboutMe() {
  return(
    <LightBox>
      <Typography variant="h4">About Me</Typography>
      <Typography>
        I am originally from the Pacific Northwest, but I am relocating to New England live closer to family.
        Professionally I have 5 years of experience writing high performance systems software for electronics manufacturing systems.
        My hobbies are: board games, cooking, camping, and playing guitar.
        My career interests include: data, robots, minimal interface design, designing testable code, and rooting out complex issues.
      </Typography>
    </LightBox>
    )
}

function Resume() {
  return(
    <div>
    <LightBox>
      <Typography>Right now I am actively looking for work in the greater Boston area.</Typography>
    </LightBox>
    <LightBox>
      <Center>
        <Link variant="h6" color="primary" href="./Resume-SwEngineer-CollinConway.pdf" >Resume Download (pdf)</Link>
      </Center>
    </LightBox>
    </div>
  )
}

function Contact() {
  return(
    <CenterDarkBox>
    <Typography variant="h4">Contact</Typography>
    <Breadcrumbs aria-label="breadcrumb"   sx={{
      "& ol": {
        justifyContent: "center",
        margin: "auto"
      }
    }}>

    <Link  color="inherit" href="mailto: collinsconway@gmail.com">
    collinsconway@gmail.com
    </Link>
    <Link  color="inherit" href="https://github.com/collinsc">
    Github
    </Link>
    <Link  color="inherit" href="https://www.linkedin.com/in/collin-s-conway">
    LinkedIn
    </Link>
    </Breadcrumbs>
    </CenterDarkBox>
    )
}

function ProjectCard({ children, ...props }: Props) {
  return(<Grid item xs={6}  
    sx={{
      minWidth: '380px'
  }}>
    <Paper sx={{
      p: 2,
      "color":"primary.main",
      height: "100%",
      alignItems: "center",
    }}>
      {children}
    </Paper>
  </Grid>)
}

function Center({ children, ...props }: Props) {
  return(<div       style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
      {children}
    </div>)
}

function ProjectCopy(name: string, link: string, desc: string) {
  return(<div>
      <Typography variant="h6">{name}</Typography>
      <Typography >{desc}</Typography>
      <Link  color="inherit" href={link}>Github</Link>
    </div>)
}

function Projects() {
  return (
    <LightBox>
    <Typography variant="h4">Projects</Typography>
    <Grid container spacing={2} sx={{"alignItems":"baseline", "justifyContent": "space-evenly"}}>
      <ProjectCard>
        {ProjectCopy("Game of Life (2023)",
          "https://github.com/collinsc/wasm-game-of-life", 
          `Interactive life in your browser, real fast. (Rust, WASM, React)`)}
        <Center>
          {GameOfLife()}
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("Open Dyslexic Reader View (2022)",
          "https://github.com/collinsc/OpenDyslexic-ReaderView", 
          "Customized chrome reader view to display the best font on the web. (Node.js)")}
        <Center>
          <img className="cardImg" src={openDyslexicImage} alt="Custom fonts displaying in chrome reader view plugin."/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("AB Pruning Tic Tac Toe (2021)",
          "https://github.com/collinsc/TicTacToe", 
          "Unbeatable tic tac toe AI, with nice ui. (C#, F#)")}
        <Center>
          <img className="cardImg" src="./tic_tac_toe.gif" alt="Gif of tic tac toe game, ai winning."/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("Moustache Maker (2019)",
          "https://github.com/collinsc/MoustacheMaker", 
          "Facial recognition app to draw moustaches. (Python, OpenCV)")}
        <Center>
          <img className="cardImg" src="./moustache.gif"
          alt="Short video displaying facial recognition software drawing moustaches on faces."/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("Nasa RMC Entry (2018)",
          "https://github.com/TrickfireRobotics/NasaRmc2018", 
          "Lead programmer for nasa robotic mining competition entry. (c++, ROS)")}
        <Center>
          <img className="cardImg" src={rmcImage} alt="Screenshot of robotics team at nasa robotic mining competition."/>
        </Center>
      </ProjectCard>
    </Grid>
    </LightBox>);
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
      default: '#61828A'
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    {Title()}
    {AboutMe()}
    {Resume()}
    {Projects()}
    {Contact()}

    </ThemeProvider>
    );
}

export default App;
