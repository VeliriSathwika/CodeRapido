
import React from 'react';

const Square = ({ particles, player, onClick}) => {
 
  const getSquareClass = () => {
  
    return 'square';
  };

  return (
    <div className={getSquareClass()} onClick={onClick}>
        {particles > 0 && player=="Player 2" ? `${particles}B ` : ""}
      {particles > 0 && player=="Player 1" ? `${particles}R ` : ""}
    

    </div>
  );
};

export default Square;
