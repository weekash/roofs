import { useImage } from "../../context/ImageContext";
import useCanvas from "../../hooks/useCanvas";
import "./Canvas.css"

export default function Canvas() {
  const { canvasRef, addPoint, reset, redraw } = useCanvas();
  const { imageData } = useImage()
  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        onClick={addPoint}
      />
      {imageData && <div className="canvas-controls">
        <i className="lni lni-eraser" onClick={redraw}></i>
        <i className="lni lni-spinner-arrow" onClick={reset}></i>
      </div>}
    </div>
  )
}
