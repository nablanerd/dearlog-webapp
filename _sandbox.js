data => this.handleAudioUpload(data)
metadata={{foo:'foo'}}
       // console.log (this.props.metadata)


    handleAudioStop(data){
      //e.preventDefault()

   // console.log("handleAudioStop");
    }



       {this.state.prev ? <button className="before_button" onClick={(e) => this.onPrevLog(e)}><ArrowLeft /></button> : ""} 


    {this.state.next ? <button className="after_button" onClick={(e) => this.onNextLog(e)}><ArrowRight/></button> : ""}



/*
        const blob = data.blob

        var io = require('socket.io-client');
        var ss = require('socket.io-stream');
         
        var socket = io.connect('http://localhost:7827/audio');
        var stream = ss.createStream();
         
        var toStream = require('blob-to-stream')

        ss(socket).emit('audiostream', stream, {name: ""});
        toStream(blob).pipe(stream)

        
        this.setState({ audioDetails: data });
        */




download(idParam = null)
{

  let objId = matchPath(this.props.location.pathname, {
    path: "/get/:id",
    exact: true,
    strict: true
  });
  
 // if(objId == null) {
  if(objId == null) {
    
  console.log("ADD")

  const type  = this.props.type ;
  this.setState({mode:"ADD", type:type})
}
  else
  {
  
     idParam = idParam===null ? objId.params.id : idParam
    
    this.store.getLog(idParam)
    .then(data => {

      console.log(data);

      const newData = this.cleaner.format(data);

     const {id, title, description, createdAt, heart, updatedAt, namespace, tag, type, content} = newData;

     console.log(newData);

      this.setState({

              id:id,
              title: title,
              description: description,
              createdAt: createdAt,
              heart:heart,
              updatedAt:updatedAt,
              namespace:namespace,
              tag:tag,
              type:type,
              content:content,

              mode:'EDIT'

      })

      this.store.getNextPrevLog(idParam)
      .then(ids => {

      this.setState(ids)

      })


    })
    .catch(e => {

     // notify_error(e.message)

        console.log(e.message)
    })

  }

}