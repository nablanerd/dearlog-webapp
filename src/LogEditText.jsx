import React, { Component } from 'react';
import "./LogEditText.css"
import { Heart , ArrowRight , ArrowLeft} from 'react-feather';

import { matchPath } from "react-router";

import { Redirect } from "react-router-dom";

import LogStore from './LogStore';
import DataCleaner from './DataCleaner';


import { Editor } from '@tinymce/tinymce-react';

import axios from 'axios';
import { stringify } from 'qs';

class LogEditText extends React.Component {
    constructor(props) {
      super(props);
  
      this.store = new LogStore();
      this.cleaner = new DataCleaner();

      this.logInit =  {
        id:null,
        heart: false,
        title:"",
        description:"",
        createdAt:"",
        updatedAt:"",
        namespace:"",
        tag:"",
        type:"",
        content:"",
      };

      this.appStateInit = {
        mode: "",
        isRedirect:false,
        prev :null,
        next:null,
        toUrl:null
      }

      this.state = {
        ...this.logInit, 
        ...this.appStateInit 
      }
   

       //? heart bind

      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {

      const name = event.target.name
      const value = event.target.value
      this.setState({
          [name]: event.target.value
      })

    }

    async handleSubmit(event) {  
      event.preventDefault()  

      if(this.state.title == "" )
      {
        this.props.notify_error("Title is empty")
        return;

      }

      if(this.state.mode === "EDIT")
      {
      

     

     const log = await this.store.updateLog(
        this.state.id,
        {
          title : this.state.title,
          description : this.state.description,
          heart : this.state.heart,
          namespace: this.state.namespace,
          tag: this.state.tag,
          content: this.state.content
        }

      )

      this.props.notify_success("log updated")

      console.log(this.props);

      //console.log("log"+log)
    }
    else

    {

      this.store.addLog(
        {
          title : this.state.title,
          description : this.state.description,
          heart : this.state.heart,
          namespace: this.state.namespace,
          tag: this.state.tag,
          content: this.state.content
        }


      )


      this.props.notify_success("log added")


    }
     }

  toggleHeart(e)
  {
    e.preventDefault()

    this.setState({heart: !this.state.heart})
  }

  onDelete (e)
  {
    e.preventDefault()  

    //alert(this.state.id)

    this.store.delete(this.state.id)

    this.props.notify_success("log deleted")


this.setState({

  isRedirect:true


})

  }


  onCancel(e)
  {

    e.preventDefault()  



this.setState({

  isRedirect:true


})

  }


onReset(e)
{
  e.preventDefault()  

  const pickedLog = (({title, description, heart, namespace, tag, content }) => ({ title, description, heart, namespace, tag, content}))(this.logInit);


  this.setState(  pickedLog )

  
}

loadLog(idParam = null)
{


  let objId = matchPath(this.props.location.pathname, {
    path: "/get/:id",
    exact: true,
    strict: true
  });
  
  if(objId == null) {
  console.log("ADD")

  this.setState({mode:"ADD"})
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


   async componentDidMount() {

  console.log("componentDidMount");

    this.loadLog()

    }

    onPrevLog(e)
    {
      e.preventDefault()

      this.loadLog(this.state.prev)

    }

    onNextLog(e)
    {
e.preventDefault()

this.loadLog(this.state.next)

console.log("onNextLog")

    }


    renderSwitch(param) {
      switch(param) {
        case 'text':
          return 'text';

          case 'audio':
            return 'audio';

        default:
          return 'foo';
      }
    }


      render() {

        const heart = this.state.heart;      
      const isRedirect = this.state.isRedirect;

          return (

            isRedirect? <Redirect to="/"/>
:


<form>

  <div className="header_group">
  <h1>{this.state.type}</h1>
  <h3>{this.state.mode}</h3>
  </div>
  <div className="title_description_group">
      <div className="item">
      <label>Title*</label>
      <input id="title" name="title" className="title_input" placeholder="Title" type='text' onChange={this.handleChange} value={this.state.title}/>
    </div>

    <div className="item">
      <label>Description</label>
      <input id="description" name="description" className="description_input" placeholder="Description" type='text'  onChange={this.handleChange} value={this.state.description}/>
      </div>
  </div>

  <div className="metadata_group">
      <div className="item">
        <label>Created At</label>
        <input id="createdAt" name="createdAt" readOnly className="date_input" placeholder="Created At" type='text' maxLength="16" size="16" onChange={this.handleChange} value={this.state.createdAt}/>
      </div>

    <div className="item">
      <label>Updated At</label>
      <input id="updatedAt" name="updatedAt" readOnly className="date_input" placeholder="Updated At" type='text' maxLength="16" size="16" onChange={this.handleChange} value={this.state.updatedAt}/>
    </div>

    <div className="item">
      <label>Heart</label>
      <button onClick={(e) => this.toggleHeart(e)}><Heart  fill={heart? "true":"false"} color="red" /></button>
    </div>

    <div className="item">
      <label>Namespace</label>
      <input id="namespace" name="namespace" className="namespace_input" placeholder="Namespace" type='text' onChange={this.handleChange} value={this.state.namespace}/>
    </div>

    <div className="item">
      <label>Tag</label>
      <input id="tag" name="tag" className="tag_input" placeholder="Tag" type='text' onChange={this.handleChange} value={this.state.tag} />
    </div>

  </div>

  <div className="content_group">
    <button className="before_button" onClick={(e) => this.onPrevLog(e)}><ArrowLeft /></button>

  
    {this.renderSwitch(this.state.type)}


    <Editor
         onInit={(evt, editor) =>  editor}
         onEditorChange={(newValue, editor) => this.setState({content:newValue})}
         value={this.state.content}
        
         
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
         }}
       />

    

<button className="after_button" onClick={(e) => this.onNextLog(e)}><ArrowRight/></button>

  
  </div>

<div className="button_group">
  <button onClick={(e)=> this.handleSubmit(e)} className="tertiary button_edit_text">Save</button>
<button className="secondary button_edit_text" onClick={(e)=> this.onCancel(e)}>Cancel</button>
<button className="primary button_edit_text" onClick={(e)=> this.onReset(e)}>Reset</button>
<button className="inverse button_edit_text" onClick={(e)=> this.onDelete(e)}>Delete</button>

</div>
</form>  
     
        )
      }


    }

    export default LogEditText;