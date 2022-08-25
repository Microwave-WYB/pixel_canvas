import './App.css';
import React, { useState, useEffect, useContext } from "react";
import PCElement from './lib/PCElement';
import PCBoard from './lib/PCBoard';

function App() {
  // Hooks
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  let ui;
  useEffect( () => {
    ui = new PCElement(0, 0, windowSize[0], windowSize[1], [], "ui");
    let center = [windowSize[0] / 2, windowSize[1] / 2];
    const board = new PCBoard(
      parseInt(center[0] - 400 / 2),
      parseInt(center[1] - 400 / 2),
      400,
      400,
    );
    ui.pushChild(board);
    ui.renderAll();
    window.onresize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
      ui.renderAll();
    }
  });


  return (
    <div className="App">
      <canvas
        id="ui"
        width={windowSize[0]}
        height={windowSize[1]}
        onClick={(e) => ui.onClick(e)}
        onMouseDown={((e) => ui.onMouseDown(e))}
        onMouseUp={((e) => ui.onMouseUp(e))}
      ></canvas>
    </div>
  );
}

export default App;
