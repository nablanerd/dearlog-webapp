import React, { useState, useRef, useEffect } from 'react';
import "./audiorecorder.css"

import AudioStopButton from "./AudioStopButton"
import AudioRecordButton from './AudioRecordButton';
import { stringify } from 'qs';

import AudioTime from "./AudioTime"
import AudioPlayer from "./AudioPlayer"

function AudioRecorder(props) {


    const [time, setTime] = useState({h:0,m:0,s:0})

    const [seconds, setSeconds] = useState(0)
    const [recording, setRecording] = useState(false)
    const [medianotFound, setMedianotFound] = useState(false)
    const [audios, setAudios] = useState([])
    const [audioBlob, setAudioBlob] = useState(null)

    const [pauseRecord, setPauseRecord] = useState(false)

    const timer = useRef(null);
    const mediaRecorder = useRef(null)
    const chunks = useRef(null)

    const record = () => {console.log("r"); setRecording(true)}
    const stop = () => {console.log("s"); setRecording(false)}

    const config = {     
      cy : 30,
      rix:20,
      riy :20
    }

    const audioType = "audio/*";

/* react-voice-recorder */

function handleAudioPause(e) {
  e.preventDefault();
  clearInterval(timer.current);
  mediaRecorder.current.pause();
  setPauseRecord(true)
//  this.setState({ pauseRecord: true });
}

function handleAudioStart(e) {
  e.preventDefault();
  startTimer();
  mediaRecorder.current.resume();
  setPauseRecord(true)
//  this.setState({ pauseRecord: false });
}

function startTimer() {

  timer.current = setInterval(countDown, 1000);
}

useEffect(()=>{

setTime(time => secondsToTime(seconds))


}, [seconds])


function countDown() {

  setSeconds(seconds => seconds + 1)

}

function secondsToTime(secs) {
  let hours = Math.floor(secs / (60 * 60));

  let divisor_for_minutes = secs % (60 * 60);
  let minutes = Math.floor(divisor_for_minutes / 60);

  let divisor_for_seconds = divisor_for_minutes % 60;
  let _seconds = Math.ceil(divisor_for_seconds);

  let obj = {
    h: hours,
    m: minutes,
    s: _seconds
  };
  return obj;
}

useEffect(() => {
  // Using an IIFE
  (async function anyNameFunction() {

    console.log("anyNameFunction")


    navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  if (navigator.mediaDevices) {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    if(props.mimeTypeToUseWhenRecording) {
      mediaRecorder.current = new MediaRecorder(stream, { mimeType: props.mimeTypeToUseWhenRecording });
    } else {
      mediaRecorder.current = new MediaRecorder(stream); 
    }
    chunks.current = [];
    mediaRecorder.current.ondataavailable = e => {
      if (e.data && e.data.size > 0) {
        chunks.current.push(e.data);
      }
    };
  } else {
    //this.setState({ medianotFound: true });
    setMedianotFound(true)

    console.log("Media Decives will work only with SSL.....");
  }


  })();
}, []);  

/*
useEffect(() => {

//this.props.handleReset(this.state);

console.log("useEffect props.handleReset");

props.handleReset({

  time,
  seconds,
  recording,
  medianotFound,
  audios,
  audioBlob,
})





},[ time,
  seconds,
  recording,
  medianotFound,
  audios,
  audioBlob,
  pauseRecord])
*/

function startRecording(e) {
  e.preventDefault();
  // wipe old data chunks
  chunks.current = [];
  // start recorder with 10ms buffer
  mediaRecorder.current.start(10);
  startTimer();
  // say that we're recording
  setRecording(true)
  //this.setState({ recording: true });
}

function stopRecording(e) {
  clearInterval(timer.current);
  setTime({h:0,m:0,s:0})
 /// this.setState({ time: {} });
  e.preventDefault();
  // stop the recorder
  mediaRecorder.current.stop();
  // say that we're not recording
setRecording(false)
setPauseRecord(false)

//  this.setState({ recording: false, pauseRecord: false, });
  // save the video to memory
  saveAudio();
}

function handleReset(e) {
  if (recording) {
    stopRecording(e);
  }

  setTime(time => {return {h:0,m:0,s:0}})
  setSeconds(0)
  setRecording(false)
  setMedianotFound(false)
  setAudios([])
  setAudioBlob(null)

  /*
  console.log("handleReset",
  {
    time:time,
    seconds:seconds,
    recording:recording,
    medianotFound:medianotFound,
    audios:audios,
    audioBlob:audioBlob



  });
*/

  props.handleReset(/*{
    time,
    seconds,
    recording,
    medianotFound,
    audios,
    audioBlob
  }*/
  )


  /*

  this.setState({
    time: {},
    seconds: 0,
    recording: false,
    medianotFound: false,
    audios: [],
    audioBlob: null
  }, () => {

    this.props.handleReset(this.state);
  });
*/

}

function saveAudio() {
  // convert saved chunks to blob
  const blob = new Blob(chunks.current, { type: audioType });
  // generate video url from blob
  const audioURL = window.URL.createObjectURL(blob);
  // append videoURL to list of saved videos for rendering
  const audios = [audioURL];
  setAudios(audios)
  setAudioBlob(blob)

//  this.setState({ audios, audioBlob: blob });
  props.handleAudioStop({
    url: audioURL,
    blob: blob,
    chunks: chunks.current,
    duration: time
  });
}


/*  <AudioPlayer audios={audios} />
*/

/* finite state machine */


    return (
<>

  {props.audioURL !== null ? (
 
<AudioPlayer url={props.audioURL} duration={props.duration ? props.duration: seconds} audios={audios} />

  ) : 

  <div className="_audiorecorder">

    <div className="audiotitle">{props.title}</div>
    {recording? <span className="audiotitle clignote">Recording...</span>:null}

    <AudioTime minutes={time.m} seconds={time.s} />        

    {recording?
    <button onClick={stopRecording}>stop</button>
    :
    <button onClick={startRecording} >record</button>
    }

    <button onClick={handleReset}>reset</button>

  </div>
}

</>
            );
}

export default AudioRecorder;