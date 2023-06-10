import { useRef, useEffect, useState} from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import ButtonGroup from '@mui/material/ButtonGroup';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import BrushIcon from '@mui/icons-material/Brush';


import init, { Universe,  CreationStrategy, DrawObject } from "collinsc-wasm-game-of-life";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#00A7E1"
const width = 64;
const height = 64;
const gridSz = width * height / 8;
const shape_map = [DrawObject.Spaceship, DrawObject.Spaceship, DrawObject.Glider, DrawObject.Pulsar]

function drawGrid(ctx: CanvasRenderingContext2D | null) {
  if (ctx != null) {
    ctx.beginPath()
    ctx.strokeStyle = GRID_COLOR
    // Vertical lines.
    for (let i = 0; i <= width; i++) {
      ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
      ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
    }
    // Horizontal lines.
    for (let j = 0; j <= width; j++) {
      ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
      ctx.lineTo((CELL_SIZE + 1) * height + 1, j * (CELL_SIZE + 1) + 1);
    }
    ctx.stroke()
  }
}

function drawCells(ctx: CanvasRenderingContext2D | null, cells: Uint8Array | null, game: Universe | null){
  if (ctx != null && cells != null) {
    ctx.beginPath();
    let n: number, isSet: boolean
    for (let row = 0; row < width; row++) {
      for (let col = 0; col < height; col++) {
        n = row * width + col;
        isSet = (cells[Math.floor(n / 8)] & (1 << (n % 8))) !== 0
        ctx.fillStyle = isSet === false
        ? DEAD_COLOR
        : ALIVE_COLOR
        ctx.fillRect(
          col * (CELL_SIZE + 1) + 1,
          row * (CELL_SIZE + 1) + 1,
          CELL_SIZE,
          CELL_SIZE
          )
      }
    }
    ctx.stroke()
  }
}

export function GameOfLife(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let canvasInitRef = useRef(false) 
  let isDown = useRef(false)
  let lastRow = useRef(-1)
  let lastCol = useRef(-1)
  let strategyRef = useRef(CreationStrategy.Deterministic)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [paused, setPaused] = useState(false)
  const [isInit, setIsInit] = useState(false)
  const [brush, setBrush] = useState('0');
  let brushRef = useRef('0')
  let loadingWasm = useRef(0)
  let wasm = useRef<any|null>(null)
  

  function ResetButton() {
    const [open, setOpen] = React.useState(false);
    const resetOptions = ['Reset Default', 'Reset Random', 'Clear'];
    const resetCodes = [CreationStrategy.Deterministic, CreationStrategy.FiftyFifty, CreationStrategy.Empty]

    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleClick = () => {
      strategyRef.current = resetCodes[selectedIndex]
      setIsInit(false)
    };

    const handleMenuItemClick = (
      event: React.MouseEvent<HTMLLIElement, MouseEvent>,
      index: number,
      ) => {
      setSelectedIndex(index);
      setOpen(false);
    };

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
      if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
        ) {
        return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button"
        color="secondary">
      <Button onClick={handleClick}>{resetOptions[selectedIndex]}</Button>
      <Button
        size="small"
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={handleToggle}
        >
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
    <Popper
      sx={{zIndex: 1}}
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
      >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
            placement === 'bottom' ? 'center top' : 'center bottom',
          }}
          >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu" autoFocusItem>
              {resetOptions.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  >
                  {option}
                </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
        )}
      </Popper>
    </React.Fragment>
    );
}

let gameRef = useRef<Universe | null>(null)
let cellsRef = useRef<Uint8Array | null>(null)
const requestRef = useRef(0)
useEffect(()=>{
  if (wasm.current === null && loadingWasm.current === 0) {
    loadingWasm.current = 1;
    init().then((initialized) => {
      wasm.current = initialized;
      loadingWasm.current = 2;
      gameRef.current = Universe.new(width, height)
      const cellsPtr = gameRef.current.cell_ptr()
      cellsRef.current = new Uint8Array(wasm.current.memory.buffer, cellsPtr, gridSz);
    })
  }
}, [])

useEffect( () => {    
  if (canvasRef.current && !canvasInitRef.current) {
    canvasInitRef.current = true;
    let canvas = canvasRef.current
    canvas.width = (CELL_SIZE + 1) * height + 1
    canvas.height = (CELL_SIZE + 1) * width + 1
    const draw = (clientX: number, clientY: number, isDrag: boolean) => {
      if (!isDown.current || !canvasRef.current || !gameRef.current) 
        return;
      let doDraw = false
      let canvas = canvasRef.current
      const boundingRect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / boundingRect.width;
      const scaleY = canvas.height / boundingRect.height;
      const canvasLeft = (clientX - boundingRect.left) * scaleX;
      const canvasTop = (clientY - boundingRect.top) * scaleY;
      const row = Math.min(Math.floor(canvasTop / (CELL_SIZE + 1)), height - 1);
      const col = Math.min(Math.floor(canvasLeft / (CELL_SIZE + 1)), width - 1);
      doDraw = !isDrag
      switch (brushRef.current) {
        case "0":
          doDraw = !isDrag || !(row === lastRow.current && col === lastCol.current)
          if (doDraw) {
            gameRef.current!.toggle_cell(row, col)
            lastRow.current=row
            lastCol.current=col
          }
        break;
        case "1":
        case "2":
        case "3":
          if (doDraw) {
            let idx = parseInt(brushRef.current)
            let shape = shape_map[idx];
            gameRef.current!.draw_object(shape, row, col)
          }
        break;
      }

    }
    canvas.onmousedown=(e) => { isDown.current = true; draw(e.clientX, e.clientY, false) }
    canvas.onmousemove=(e) => { draw(e.clientX, e.clientY, true) }
    canvas.onmouseup=(e) => { isDown.current =false}
    canvas.onmouseout=(e) => { isDown.current =false}
  }
}, []);


useEffect( () => {    
  let ctx: CanvasRenderingContext2D | null = null
  if (canvasRef.current) {
    ctx = canvasRef.current.getContext("2d")
  }
  const frame = () => {
    drawGrid(ctx)
    if (loadingWasm.current < 2){
      drawCells(ctx, new Uint8Array(gridSz), null)
    } else {
      if (!isInit) {
        gameRef.current!.init(strategyRef.current)
        setIsInit(true);
      } 
      if (!paused) {
        gameRef.current!.tick();
      }
      drawCells(ctx, cellsRef.current, gameRef.current)
    }
    requestRef.current = requestAnimationFrame(frame)
  }
  requestRef.current = requestAnimationFrame(frame)
  return () => cancelAnimationFrame(requestRef.current);
}, [ paused, isInit]);
const handlePlayPauseClick = (event: React.MouseEvent<HTMLElement>) => {
    setPaused(!paused)
};
const brushChange = (event: SelectChangeEvent) => {
  setBrush(event.target.value);
  brushRef.current = event.target.value;
};
return (
  <Box  >
    <CssBaseline/>
    <AppBar position="static" style={{backgroundColor: "primary"}}>
    <div  style = {{display: 'flex',
          alignItems: 'center' }}>
      <BrushIcon sx={{mx: 2}}/>
      <Select
        variant="standard"
        value={brush}
        label="Brush"
        onChange={brushChange}
        color = "primary"
        sx={{ flexGrow: 1 }}
        >
        <MenuItem value={"0"}>Click & Drag</MenuItem>
        <MenuItem value={"1"}>Spaceship</MenuItem>
        <MenuItem value={"2"}>Glider</MenuItem>
        <MenuItem value={"3"}>Pulsar</MenuItem>
      </Select>
      </div>
    </AppBar>
    <Box component="main" >
      <canvas ref={canvasRef} />
    </Box>
    <Box textAlign="center">
      <ResetButton/>
      <Fab sx={{ml: 12, mr: 2}} 
        aria-label="toggle play pause" 
        color={paused?  "success" : "secondary"} 
        onClick={(e) => handlePlayPauseClick(e)}>
        {paused ?  <PlayArrowIcon/> : <PauseIcon/>}
      </Fab>
    </Box>
  </Box>
  )
}
