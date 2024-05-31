import useCanvas from "../../hooks/useCanvas";
import "./Canvas.css"

export default function Canvas() {
  const { canvasRef, addPoint, reset, redraw } = useCanvas();
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onClick={addPoint}
      />
      <div className="canvas-controls">
      <i className="lni lni-eraser" onClick={redraw}></i>
      <i className="lni lni-spinner-arrow" onClick={reset}></i>
      </div>
    </div>
  )
}
