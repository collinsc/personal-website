import { useRef, useEffect } from "react";

import init, { Universe,  CreationStrategy } from "collinsc-wasm-game-of-life";

const CELL_SIZE = 5; // px
const GRID_COLOR = "#CCCCCC"
const DEAD_COLOR = "#FFFFFF"
const ALIVE_COLOR = "#00A7E1"

function drawGrid(ctx: CanvasRenderingContext2D, game: Universe) {
      ctx.beginPath()
      ctx.strokeStyle = GRID_COLOR
      // Vertical lines.
      for (let i = 0; i <= game.width(); i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * game.height() + 1)
      }
      // Horizontal lines.
      for (let j = 0; j <= game.height(); j++) {
        ctx.moveTo(0,                           j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * game.width() + 1, j * (CELL_SIZE + 1) + 1);
      }
      ctx.stroke()
}

function drawCells(ctx: CanvasRenderingContext2D, game: Universe){
    ctx.beginPath();
    for (let row = 0; row < game.height(); row++) {
      for (let col = 0; col < game.width(); col++) {
        ctx.fillStyle = game.is_alive(row,col) === false
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
    init().then(() => {
      if (canvasRef.current) {
        let game = Universe.new(CreationStrategy.Deterministic)
        canvasRef.current.height = (CELL_SIZE + 1) * game.height() + 1
        canvasRef.current.width = (CELL_SIZE + 1) * game.width() + 1
        const ctx = canvasRef.current.getContext('2d')!;
        const frame = () => {
          game.tick()
          drawGrid(ctx, game)
          drawCells(ctx, game)
          frameId = requestAnimationFrame(frame)
        }
        drawGrid(ctx, game)
        drawCells(ctx, game)
        frameId = requestAnimationFrame(frame)        
      }
    });
    return () => cancelAnimationFrame(frameId)
  }, [])
  return (<canvas ref={canvasRef} />)
}
