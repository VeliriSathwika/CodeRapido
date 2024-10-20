import React, { useState } from 'react';
import Square from './square';


const GRID_SIZE = 5;
const PARTICLE_LIMIT = 4;

function App() {
  
  const initialGrid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill({ particles: 0, player: null }));
 

  
  const [grid, setGrid] = useState(initialGrid);
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const[score1,setScore1]=useState(0);
  const[score2,setScore2]=useState(0);
  
  const handleSquareClick = (row, col) => {
    let newGrid = grid.map(row => row.map(square => ({ ...square })));

    let square = newGrid[row][col];
  
    
    if (square.player && square.player !== currentPlayer) {
     
      return;
    }
  
    
    
    square.particles += 1;
    square.player = currentPlayer;

   
    if (square.particles >= PARTICLE_LIMIT) {
        
        if (square.player === "Player 1") {
            console.log("byei");
            setScore1(prevScore1 => prevScore1 + 1); 
                }
        
        if (square.player === "Player 2") {
            setScore2(prevScore2 => prevScore2 + 1);
        }
        
       
      
    
      handleCollapse(newGrid, row, col);
    }
    
   
    setGrid(newGrid);
    setCurrentPlayer(currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1');
    // console.log(currentPlayer);
  };
  
  const handleCollapse = (newGrid, row, col) => {
    let square = newGrid[row][col];
    
   
    square.particles = 0;
    square.player = null;
    
    const adjacentSquares = getAdjacentSquares(row, col);
   
    adjacentSquares.forEach(([r, c]) => {
      newGrid[r][c].particles += 1;
      newGrid[r][c].player = currentPlayer;
      
      if (newGrid[r][c].particles >= PARTICLE_LIMIT) {
        handleCollapse(newGrid, r, c);  
      }
    });
  };

  const getAdjacentSquares = (row, col) => {
    const adjacent = [];
    if (row > 0) adjacent.push([row - 1, col]);
    if (row < GRID_SIZE - 1) adjacent.push([row + 1, col]);
    if (col > 0) adjacent.push([row, col - 1]);
    if (col < GRID_SIZE - 1) adjacent.push([row, col + 1]);
    return adjacent;
  };

  return (
    <div className="game-container">
      <h1>Quantum Squares</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => 
          row.map((square, colIndex) => (
            <Square
              key={`${rowIndex}-${colIndex}`}
              particles={square.particles}
              player={square.player}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            
             

            />
          ))
        )}
      </div>
      <div className="player-info">
      
        Current Player: {currentPlayer}
        <br />
        <br />
        Score of Player 1: {score1} 
        <br />
        <br />
        Score of Player 2: {score2} 
      </div>
    </div>
  );
}

export default App;
