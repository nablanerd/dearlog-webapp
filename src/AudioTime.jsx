import React from 'react';

function AudioTime({minutes, seconds}) {
    return (
       <div className="audiotime">
        {minutes !== undefined
            ? `${minutes <= 9 ? "0" + minutes : minutes}`
            : "00"}:
{seconds !== undefined
            ? `${seconds <= 9 ? "0" + seconds : seconds}`
            : "00"}</div>
    );
}

export default AudioTime;