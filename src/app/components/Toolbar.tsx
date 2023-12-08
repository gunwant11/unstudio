import { Circle, Eraser, ImagePlus, MousePointer2, PenTool, Square, Type } from 'lucide-react';
import React, { useEffect, useRef } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { ILayer } from './SideDrawer';
import Konva from 'konva';

interface Props {
  stageRef: any,
  activeLayer: any
}

function Toolbar({ stageRef,  activeLayer }: Props) {
  const [color, setColor] = useColor("rgb(86 30 203)");
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [activeTool, setActiveTool] = React.useState('pen');
  
  const colorPickerRef = useRef(null);

  const isDrawing = React.useRef(false);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    let lastLine = new Konva.Line({
      stroke: '#df4b26',
          strokeWidth: 5,
        
          lineCap: 'round',
          lineJoin: 'round',
          // add point twice, so we have some drawings even on a simple click
          points: [pos.x, pos.y, pos.x, pos.y],
        });
    activeLayer.add(lastLine);
  };

 
  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  //   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];

  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = function (e) {
  //       const imgURL = e.target?.result as string;
  //       addImage(imgURL);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const addRect = (canvas?: fabric.Canvas) => {
  //   const rect = new fabric.Rect({
  //     height: 200,
  //     width: 200,
  //     stroke: color.hex,
  //     fill: "transparent",
  //   });
  //   activeLayer.object.addWithUpdate(rect);
  //   canvas?.requestRenderAll();
  // };

  // const addCircle = (canvas?: fabric.Canvas) => {
  //   const circle = new fabric.Circle({
  //     radius: 50,
  //     stroke: color.hex,
  //     fill: "transparent",
  //   });
  //   canvas?.add(circle);
  //   canvas?.requestRenderAll();
  // }

  // const draw = (canvas: fabric.Canvas) => {
  //   const pen = new fabric.PencilBrush(canvas);
  //   canvas.freeDrawingBrush = pen
  //   canvas.freeDrawingBrush.width = 10
  //   canvas.freeDrawingBrush.color = color.hex
  //   canvas.isDrawingMode = true;
  //   canvas?.requestRenderAll();
  // }



  // const addText = (canvas: fabric.Canvas) => {
  //   const text = new fabric.Textbox('Text', {
  //     left: 50,
  //     top: 50,
  //     width: 150,
  //     fontSize: 20,
  //     textAlign: 'center'
  //   });
  //   canvas.add(text);
  //   canvas?.requestRenderAll();
  // }

  // const eraseElents = (canvas: fabric.Canvas) => {
  //   const erase = new fabric.EraserBrush(canvas);
  //   canvas.freeDrawingBrush = erase
  //   canvas.freeDrawingBrush.width = 10
  //   canvas.isDrawingMode = true;

  //   canvas?.requestRenderAll();
  // }

  // const select = (canvas : fabric.Canvas) =>{
  //   canvas.isDrawingMode = false;
  // }


  // const addImage = (imgURL: string) => {
  //   var pugImg = new Image();
  //   pugImg.onload = function (img) {
  //     var image = new fabric.Image(pugImg, {
  //       left: 50,
  //       top: 50,
  //       angle: 0,
  //       opacity: 1,
  //       scaleX: 0.3,
  //       scaleY: 0.3,
  //     });
  //     canvas.add(image);
  //   }
  //   pugImg.src = imgURL;

  // }
  

  return (
    <div className=' bg-zinc-900 w-20 m-1 rounded-xl flex  flex-col  p-3 gap-3 '>
      <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
          <MousePointer2 />
        <span className='text-[10px]'>
Cursors</span>
      </button> <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col ' >
        <PenTool />
        <span className='text-[10px]'>Pen</span>
      </button>
      <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
      <Eraser />
        <span className='text-[10px]'>
          Eraser
        </span>
      </button>
      <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
       <Square />
        <span className='text-[10px]'>Square</span>
      </button>
      <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
        <Circle />
        <span className='text-[10px]'>Circle</span>
      </button>
      <button className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
          <Type />
        <span className='text-[10px]'>Text</span>
      </button>
      <button className=' relative h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '>
        <span className='absolute min-w-[360px] left-[75px] z-10' ref={colorPickerRef}>
          {showColorPicker &&
            <ColorPicker
              color={color}
              onChange={setColor} />}
        </span>
        <span className='text-[10px]'>Color</span>
      </button>
      <input type="file"       style={{ display: 'none' }}
        id="imageInput"/>
      <label   htmlFor="imageInput" className=' h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col ' 
     >
       <ImagePlus />
        <span className='text-[10px]'>Image</span>
      </label>

    </div>
  )
}

export default Toolbar