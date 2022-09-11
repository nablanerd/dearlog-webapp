import React from 'react';

function AudioStopButton({onClick, config}) {

    const {cy, rix, riy} = config
    
    return (
        <svg onClick={onClick} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy={cy} r="20" fill="grey"/>
        <rect width="20" height="20" x={rix+20} y={riy} fill="#171717" />
      </svg>
    );
}

export default AudioStopButton;