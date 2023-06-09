import { useRef, useLayoutEffect } from "react";

import init, { Universe,  CreationStrategy } from "collinsc-wasm-game-of-life";
export { CreationStrategy } from "collinsc-wasm-game-of-life";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#00A7E1"
const width = 64;
const height = 64;
const gridSz = width * height / 8;
let wasm: any | null = null
let loadingWasm = 0;

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

export function GameOfLife(strategy: CreationStrategy){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  let gameRef = useRef<Universe | null>(null)
  let cellsRef = useRef<Uint8Array | null>(null)
  let isInitRef = useRef(false)
  const requestRef = useRef(0)
  if (wasm === null && loadingWasm === 0) {
    loadingWasm = 1;
    init().then((initialized) => {
      wasm = initialized;
      loadingWasm = 2;
    })
  }

  useLayoutEffect( () => {    
    let ctx: CanvasRenderingContext2D | null = null
    if (canvasRef.current) {
      canvasRef.current.width = (CELL_SIZE + 1) * height + 1
      canvasRef.current.height = (CELL_SIZE + 1) * width + 1
      ctx = canvasRef.current!.getContext('2d');
    }
    const frame = () => {
      drawGrid(ctx)

      if (loadingWasm < 2){
        drawCells(ctx, new Uint8Array(gridSz), null)
      } else if (!isInitRef.current) {
        gameRef.current = Universe.new(width, height)
        gameRef.current.init(strategy)
        const cellsPtr = gameRef.current.cell_ptr()
        cellsRef.current = new Uint8Array(wasm.memory.buffer, cellsPtr, gridSz);
        drawCells(ctx, cellsRef.current, gameRef.current)
        isInitRef.current = true;
      } else {
        gameRef.current!.tick();
        drawCells(ctx, cellsRef.current, gameRef.current!)
      }
      requestRef.current = requestAnimationFrame(frame)
    }
    requestRef.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(requestRef.current);
  }, [strategy]);
  return (<canvas ref={canvasRef} />)
}
