import React, { Component, useState } from 'react';

//import { Recorder } from 'react-voice-recorder'
//import 'react-voice-recorder/dist/index.css'


/* 

import AudioRecorder from './AudioRecorder'
import AudioStopButton from "./AudioStopButton"
import AudioRecordButton from './AudioRecordButton';
import AudioTime from "./AudioTime"
import AudioPlayer from "./AudioPlayer"
import "./AudioPlayerSample.css"

*/
import AudioRecorder from './AudioRecorder'

function LogContentAudio(props) {


  const [audioDetails, setAudioDetails] = useState(
   {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    }


  )


  function handleAudioStop(data) {
    console.log(data)
    setAudioDetails(data)
   // this.setState({ audioDetails: data });

    props.onAudioData(data)
  }

  function handleAudioUpload(file) {
    console.log(file);
  }

  function handleReset() {
    console.log("handleReset");
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: 0,
        m: 0,
        s: 0
      }
    };

    

setAudioDetails(reset)
  //  this.setState({ audioDetails: reset });

    props.onAudioData(reset)

  }

  return (
    


   <AudioRecorder 
    title={"New recording"}
    audioURL={ props.url? props.url : audioDetails.url  }
    
    handleAudioStop={data => handleAudioStop(data)}
    handleAudioUpload={data => handleAudioUpload(data)}
    handleReset={() => handleReset()}
    mimeTypeToUseWhenRecording={`audio/webm`}
    duration={props.duration}
    isAudioRecorded = {props.isAudioRecorded}

    /> 

    



  );
}



/*
export default LogContentAudio;
class LogContentAudio extends React.Component {

 
  render() {
    return (
<>
audio
</>
    )
  }
  
}
*/

//


export default LogContentAudio;
