import { useRef, useEffect } from "react";

import init, { Universe,  CreationStrategy } from "collinsc-wasm-game-of-life";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#00A7E1"
const width = 64;
const height = 64;

function drawGrid(ctx: CanvasRenderingContext2D) {
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

function drawCells(ctx: CanvasRenderingContext2D, cells: Uint8Array){
    ctx.beginPath();
    let n
    let mask
    let isSet
    for (let row = 0; row < width; row++) {
      for (let col = 0; col < height; col++) {
        n = row * width + col;
        mask = 1 << (n % 8);
        isSet = (cells[Math.floor(n / 8)] & mask) === mask;
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

export function GameOfLife(){
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  useEffect( () => {
    let frameId: number
    init().then((wasm) => {
      if (canvasRef.current) {
        canvasRef.current.width = (CELL_SIZE + 1) * height + 1
        canvasRef.current.height = (CELL_SIZE + 1) * width + 1
        let game = Universe.new(width, height)
        game.init(CreationStrategy.Deterministic)
        const cellsPtr = game.cell_ptr()
        const cells = new Uint8Array(wasm.memory.buffer, cellsPtr, width * height / 8);
        const ctx = canvasRef.current.getContext('2d')!;
        const frame = () => {
          game.tick()
          drawGrid(ctx)
          drawCells(ctx, cells)
          frameId = requestAnimationFrame(frame)
        }
        drawGrid(ctx)
        drawCells(ctx, cells)
        frameId = requestAnimationFrame(frame)        
      }
    });
    return () => cancelAnimationFrame(frameId)
  }, [])
  return (<canvas ref={canvasRef} />)
}
