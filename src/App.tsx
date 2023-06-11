import React, {ReactNode} from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';
import theme from "./Theme"

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

const COL_1_SPACE=6
const COL_2_SPACE=6


function LightBox({ children, ...props }: Props) {
  return (
    <Box sx = {{ 
      "bgcolor": "secondary.main",
      "color": "background.default",
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

function AboutMeHeader(text:string){
  return(
    <React.Fragment>
      <Grid item xs={COL_1_SPACE}>
          <Typography variant="h6">{text}</Typography>
        </Grid>
        <Grid item xs={COL_2_SPACE}/>
    </React.Fragment>
    )
}

function AboutMeRow({ children, ...props }: Props){
  return(
    <React.Fragment>
      <Grid item xs={COL_1_SPACE}/>
      <Grid item xs={COL_2_SPACE}>
        {children}    
      </Grid >
    </React.Fragment>
    )
}

function AboutMe() {
  return(
    <LightBox>
      <Typography variant="h4">About Me</Typography>
      <Grid container spacing={1}>
        <Grid item xs ={5} sx={{ minWidth: '380px', p:2 }}>
          <Typography sx={{fontSize:"1.25rem"}}><i>
            I am originally from the Pacific Northwest, but I am relocating to New England live closer to family.<br/><br/>
            Professionally I have 5 years of experience writing high performance systems software for electronics manufacturing systems.<br/><br/>
            Currently I am looking for work in the greater Boston area. <br/></i>
          </Typography>
          <Center>
            <Paper sx={{m:2, backgroundColor:theme.palette.success.main}}>
              <Link sx={{p:2}} variant="h6" color="#FFFFFF" href="./Resume-SwEngineer-CollinConway.pdf" >Download Resume</Link>
            </Paper>
          </Center>
        </Grid>
        <Grid item xs={7}  
          sx={{
              minWidth: '380px',
              p:1,
          }}>
          <Paper>
            <Grid container spacing={1}   >
              {AboutMeHeader("Hobbies")}
              <AboutMeRow>
                <Typography>Board games, cooking, camping, music theory, and playing guitar.</Typography>
              </AboutMeRow>
              {AboutMeHeader("Languages")}
              <AboutMeRow>
                <Typography><b>Used daily in last position:</b> C#, C++</Typography>
              </AboutMeRow>
              <AboutMeRow>
                <Typography><b>Fluent:</b> Python, PowerShell,  Galil Motion, PMC</Typography>
              </AboutMeRow>
              <AboutMeRow>
                <Typography><b>Enough to be Dangerous:</b> Bash, XSLT, Typescript, Rust, F#, Java</Typography>
              </AboutMeRow>
              {AboutMeHeader("Technologies + Frameworks")}                
              <AboutMeRow>
                <Typography><b>Super User:</b> Git, Ranorex, Win32, WinForms, C++/CLI, Azure Devops Server</Typography>
              </AboutMeRow>
              <AboutMeRow>
                <Typography><b>Accomplished:</b> ROS, numpy, pandas, jupyter, WPF, Acronys, Nuget</Typography>
              </AboutMeRow>
              <AboutMeRow>
                <Typography><b>Tinkerer:</b> Node.js, React, VirtualBox, Postman, Docker</Typography>
              </AboutMeRow>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </LightBox>
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
      minWidth: '380px',
      p:1
  }}>
    <Paper >
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

function ProjectCopy(name: string, year:string, link: string, desc: string, techlist: string[]) {
  return(
    <Box sx={{pb:1}}>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
        pb: 1
        }}>
        <Link variant="h6" href={link} color="inherit">{name}</Link>
        <Typography variant="h6">{year}</Typography>
      </Box>
      <Box sx={{
        display: "flex",
        justifyContent: "space-between",
      }}>
      <Typography sx={{ pr:1}}>{desc}</Typography>
      <Typography sx={{ pl:1}}><i>{techlist.join("    ")}</i></Typography>
      </Box>
    </Box>)
}

function Projects() {
  return (
    <LightBox>
    <Typography variant="h4">Projects</Typography>
    <Grid container spacing={2}>
      <ProjectCard>
        {ProjectCopy("Game of Life", "2023",
          "https://github.com/collinsc/wasm-game-of-life", 
          "An interactive web assembly game of life.",
          ["Rust","WASM","React"]
          )}
        <Center>
          {GameOfLife()}
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("Open Dyslexic Reader View", "2022",
          "https://github.com/collinsc/OpenDyslexic-ReaderView", 
          "Customized chrome reader view to display my favorite font.",
          ["Node.js"])}
        <Center>
          <img className="cardImg" src={openDyslexicImage} alt="Custom css displaying in chrome reader view plugin. (Node.js) was used for programming"/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("AB Pruning Tic Tac Toe", "2021",
          "https://github.com/collinsc/TicTacToe", 
          "Unbeatable tic tac toe AI, with nice UI.",
          ["MVVM","C#","F#","WPF"])}
        <Center>
          <img className="cardImg" src="./tic_tac_toe.gif" alt="Gif of tic tac toe game, ai winning."/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("Moustache Maker", "2019",
          "https://github.com/collinsc/MoustacheMaker", 
          "Facial recognition app to draw moustaches.",
          ["Python","OpenCV","Flask"])}
        <Center>
          <img className="cardImg" src="./moustache.gif"
          alt="Short video displaying facial recognition software drawing moustaches on my face."/>
        </Center>
      </ProjectCard>
      <ProjectCard>
        {ProjectCopy("NASA RMC Capstone", "2018",
          "https://github.com/TrickfireRobotics/NasaRmc2018", 
          "Capstone at University of Washington for autonomous navigation of NASA Robotic Mining Competition entry.",
          ["C++","ROS","Python"])}
        <Center>
          <img className="cardImg" src={rmcImage} alt="Screenshot of robotics team at nasa robotic mining competition."/>
        </Center>
      </ProjectCard>
    </Grid>
    </LightBox>);
}

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Title/>
      <AboutMe/>
      <Projects/>
      <Contact/>
    </ThemeProvider>
    );
}

export default App;
