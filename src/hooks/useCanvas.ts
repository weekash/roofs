import { useState, useRef, useEffect } from 'react';
import { useImage } from '../context/ImageContext';

interface Point {
    x: number;
    y: number;
}


export default function useCanvas() {
    const { imageData, setExportedImageData, setImageData } = useImage()
    const [points, setPoints] = useState<Point[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const addPoint = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const point = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        setPoints(prevPoints => [...prevPoints, point]);
    }

    const reset = () => {
        setPoints([]);
        setImageData('')
    };

    const drawImage = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        context.clearRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.onload = () => {
            context.drawImage(img, 0, 0);
        };
        img.src = imageData;
    }


    const isWithinProximity = (point1: Point, point2: Point, radius: number = 5): boolean => {
        const { x: x1, y: y1 } = point1;
        const { x: x2, y: y2 } = point2;

        const distance = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        return distance <= radius;
    };

    const exportFigure = (canvas: HTMLCanvasElement) => {
        if (points.length < 3) {
            console.log('Closed figure not detected.');
            return;
        }

        if (!isWithinProximity(points[0], points[points.length - 1])) {
            console.log('Not closed yet')
            return;
        }

        const clippedCanvas = document.createElement('canvas');
        clippedCanvas.width = canvas.width;
        clippedCanvas.height = canvas.height;
        const clippedContext = clippedCanvas.getContext('2d');
        if (!clippedContext) return;

        clippedContext.beginPath();
        points.forEach((point, index) => {
            if (index === 0) {
                clippedContext.moveTo(point.x, point.y);
            } else {
                clippedContext.lineTo(point.x, point.y);
            }
        });
        clippedContext.closePath();
        clippedContext.clip();

        const img = new Image();
        img.onload = () => {
            clippedContext.drawImage(img, 0, 0);
            const exportedImage = clippedCanvas.toDataURL('image/png');
            setExportedImageData(exportedImage);
        };
        img.src = imageData;
    };

    function drawDots(context: CanvasRenderingContext2D) {

        // Draw circles at each point
        const currentPoint: Point = points[points.length - 1]

        context.fillStyle = '#020202';
        context.beginPath();
        context.arc(currentPoint.x, currentPoint.y, 4, 0, Math.PI * 2);
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = 'white';
        context.stroke();
    }

    function redraw() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context || !points.length) return;
        setPoints([])
        drawImage()
    }


    function drawLine(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.strokeStyle = "#f53b78"
        context.lineWidth = 4
        const prevPoint: Point = points[points.length - 2]
        const currentPoint: Point = points[points.length - 1]
        if (prevPoint) {
            context.moveTo(prevPoint.x, prevPoint.y)
        }
        context.lineTo(currentPoint.x, currentPoint.y);
        context.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth - 50
        canvas.height = window.innerHeight - 180
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context || !points.length) return;
        drawDots(context)
        drawLine(context)
        exportFigure(canvas)

    }, [points]);

    useEffect(() => {
        drawImage()
    }, [imageData])

    return { canvasRef, reset, addPoint, redraw };

}