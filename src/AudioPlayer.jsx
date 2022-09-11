import React, { useState, useRef, useEffect } from 'react'
//import styles from "./AudioPlayer.module.css";

import "./AudioPlayerSample.css"

import { Play , Rewind , Pause, FastForward} from 'react-feather';

//import { BsArrowLeftShort } from "react-icons/bs"
//import { BsArrowRightShort } from "react-icons/bs"
//import { FaPlay } from "react-icons/fa"
//import { FaPause } from "react-icons/fa"

function AudioPlayerSample (props)  {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {

   const seconds = props.duration //Math.floor(audioPlayer.current.duration);
   setDuration(seconds);
   progressBar.current.max = seconds;

  
  }, 
  [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }

    
  }

  const whilePlaying = () => {
   // progressBar.current.value = audioPlayer?0 : audioPlayer.current.currentTime ;
    if(audioPlayer.current === null) return
   


   progressBar.current.value =audioPlayer.current.currentTime ;

    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);

    if(audioPlayer.current.currentTime > duration)
    setIsPlaying(false);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
  //  progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    progressBar.current.value = Number(progressBar.current.value - 30);
    changeRange();
  }

  const forwardThirty = () => {
    progressBar.current.value = Number(progressBar.current.value + 30);
    changeRange();
  }

  return (

    
    <div className="container_player">

    <audio ref={audioPlayer}  preload="metadata">
      <source src={props.audios[0]?props.audios[0]:props.url} type="audio/ogg" />
      <source src={props.audios[0]?props.audios[0]:props.url} type="audio/mpeg" />
    </audio>

<div>TITLE</div>
<div className="container_duration_current_progress">
{/* current time */}
<div >{calculateTime(currentTime)}</div>

{/* progress bar */}
<div>
  <input type="range"  defaultValue="0" ref={progressBar} onChange={changeRange} />
</div>

{/* duration */ console.log("duration",duration)


}

<div >{isNaN(duration) ? "__:__" : calculateTime(duration)}</div>
</div>

<div className="container_duration_current_progress">

<button onClick={backThirty}><Rewind/></button>
<button onClick={togglePlayPause} > {isPlaying ? <Pause /> : <Play/>}</button>
<button onClick={forwardThirty}><FastForward/></button>
</div>

    </div>

    
  )
}

export default AudioPlayerSample
