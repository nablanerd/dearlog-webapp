import React, { Component } from 'react';
import "./LogEditText.css"
import { Heart , ArrowRight , ArrowLeft} from 'react-feather';

import { matchPath } from "react-router";

import LogStore from './LogStore';

import axios from 'axios';


class LogEditText extends React.Component {
    constructor(props) {
      super(props);
  
      this.store = new LogStore();

      this.state = {
        mode: "",
        id:null,
        heart: false,
        valueTitle:'',
        valueDescription:'',
        valueCreated:'',
        valueUpdated:'',
        //heart
        valueNamespace:'',
        valueTag:'',
        
        valueContent:''
      };

      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleChangeCreated = this.handleChangeCreated.bind(this);
      this.handleChangeUpdated = this.handleChangeUpdated.bind(this);
      //heart
      this.handleChangeNamespace = this.handleChangeNamespace.bind(this);
      this.handleChangeTag = this.handleChangeTag.bind(this);
      
      this.handleChangeContent = this.handleChangeContent.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);

    }
  
    handleChangeTitle(event) {    this.setState({valueTitle: event.target.value});  }
    handleChangeDescription(event) {    this.setState({valueDescription: event.target.value});  }
    handleChangeCreated(event) {    this.setState({valueCreated: event.target.value});  }
    handleChangeUpdated(event) {    this.setState({valueUpdated: event.target.value});  }
    handleChangeNamespace(event) {    this.setState({valueNamespace: event.target.value});  }
    handleChangeTag(event) {    this.setState({valueTag: event.target.value});  }

    handleChangeContent(event) {    this.setState({valueContent: event.target.value});  }


    handleSubmit(event) {  
      event.preventDefault()  

      this.store.updateLog(
        this.state.id,
        {
          title : this.state.valueTitle,
          description : this.state.valueDescription,
          heart : this.state.heart,
          namespace: this.state.valueNamespace,
          tag: this.state.valueTag,

          content: this.state.valueContent
        }


      )

     }

   async componentDidMount() {
   
  
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
      
        const data = await this.store.getLog(objId.params.id)

        this.setState((state) => {

          return {
            id:data.id,
            valueTitle: data.title,
            valueDescription: data.description,
            valueCreated:data.createdAt,
            heart:data.heart,
            valueUpdated:data.updatedAt,
            valueNamespace:data.namespace,
            valueTag:data.tag,

            valueContent:data.content,

            mode:'EDIT'
          
          }
       })


      }

    }

  toggleHeart(e)
  {
    e.preventDefault()

    this.setState({heart: !this.state.heart})
  }
      render() {

        const heart = this.state.heart;

      
      
          return (
<form>
  <div className="header_group">
  <h1>TEXT</h1>
  <h2>{this.state.mode}</h2>
  </div>
  <div className="title_description_group">
      <div className="item">
      <label>Title*</label>
      <input className="title_input" placeholder="Title" type='text' onChange={this.handleChangeTitle} value={this.state.valueTitle}/>
    </div>

    <div className="item">
      <label>Description</label>
      <input className="description_input" placeholder="Description" type='text'  onChange={this.handleChangeDescription} value={this.state.valueDescription}/>
      </div>
  </div>

  <div className="metadata_group">
      <div className="item">
        <label>Created</label>
        <input readOnly className="date_input" placeholder="Created" type='text' maxLength="16" size="16" onChange={this.handleChangeCreated} value={this.state.valueCreated}/>
      </div>

    <div className="item">
      <label>Updated</label>
      <input readOnly className="date_input" placeholder="Updated" type='text' maxLength="16" size="16" onChange={this.handleChangeUpdated} value={this.state.valueUpdated}/>
    </div>

    <div className="item">
      <label>Heart</label>
      <button onClick={(e) => this.toggleHeart(e)}><Heart  fill={heart? "true":"false"} color="red" /></button>
    </div>

    <div className="item">
      <label>Namespace</label>
      <input className="namespace_input" placeholder="Namespace" type='text' onChange={this.handleChangeNamespace} value={this.state.valueNamespace}/>
    </div>

    <div className="item">
      <label>Tag</label>
      <input className="tag_input" placeholder="Tag" type='text' onChange={this.handleChangeTag} value={this.state.valueTag} />
    </div>

  </div>

  <div className="content_group">
    <button className="before_button"><ArrowLeft /></button>
    <button className="after_button"><ArrowRight/></button>

    <textarea className="content_textarea"  onChange={this.handleChangeContent} value={this.state.valueContent} />
  </div>

<div className="button_group">
  <button onClick={(e)=> this.handleSubmit(e)} className="tertiary button_edit_text">Save</button>
<button className="secondary button_edit_text">Cancel</button>
<button className="primary button_edit_text">Reset</button>
<button className="inverse button_edit_text">Delete</button>

</div>
</form>        
        )
      }


    }

    export default LogEditText;