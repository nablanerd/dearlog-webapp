import React from 'react';

function AudioRecordButton({onClick, config}) {

    const {cy} = config

    
    return (


        <svg onClick={onClick} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy={cy} r="20" fill="grey"/>
        <circle cx="50" cy={cy} r="10" fill="red"/>
        </svg>

    );
}

export default AudioRecordButton;