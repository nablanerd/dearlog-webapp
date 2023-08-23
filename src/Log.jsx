

import React, { Component } from 'react';
import "./LogEditText.css"

import {  ArrowRight , ArrowLeft, Cpu} from 'react-feather';

import Heart from './Heart';

import { matchPath } from "react-router";

import { Redirect } from "react-router-dom";

import LogStore from './LogStore';

import Format from './Format'

import { stringify } from 'qs';

import LogContentText from './LogContentText';


import CreatableSelect from 'react-select/creatable';

class Log extends React.Component {
    constructor(props) {
      super(props);
  
      this.store = new LogStore();

      this.format = new Format()

      
      this.logInit =  {
        id:null,
        heart: false,
        title:"",
        description:"",
        createdAt:"",
        updatedAt:"",
        namespace:null,
        tag:"",
        type:"",
        content:"",

        namespacesAvaible :[],

        tags: [],
        tagsAvaible : []

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

      this.handleContentChange = this.handleContentChange.bind(this);


      
      this.handleNameSpaceSelect = this.handleNameSpaceSelect.bind(this)

      this.handleNameSpaceCreate = this.handleNameSpaceCreate.bind(this)

      this.handleTagSelect = this.handleTagSelect.bind(this)

      this.handleTagCreate = this.handleTagCreate.bind(this)
  

    }

    handleChange(event) {
      event.preventDefault() 
      
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

        const { id, title, description, heart, namespace, tags, content } = this.state 

        //todo object log        
        const log = await this.store.updateLog(
          id,
        {
          title,
          description ,
          heart,
          namespace,
          tags,
          content
        }

      )

     

      this.props.notify_success("log updated")

      console.log(this.props);

    }
    else

    {

  
      //todo object log
      this.store.addLog(
        {
          title : this.state.title,
          description : this.state.description,
          heart : this.state.heart,
          namespace: this.state.namespace,
          /* tag: this.state.tag, */
          
          tags : this.state.tags,

          type : this.props.type,
          content: this.state.content
        },

        (res) => {

          console.log("res", res);
          
          const log = res.data;
          
          this.load(log.id)


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

    this.store.deleteLog(this.state.id)

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

load(idParam)
{
    
  this.store.getLog(idParam)
  .then(data => {

    console.log("data", data);

  let {id, title, description, createdAt, heart, updatedAt, namespace, tags, type, content} = data;

   const  namespaceToSelect = namespace? {...{value:namespace.name, label:namespace.name} , ...namespace} : []

   const   tagsToSelect = this.addValueAndLabelToSelect(tags)

   console.log(namespaceToSelect);

   this.setState({ content:content})



    this.setState({

            id:id,
            title: title,
            description: description,
            createdAt: createdAt,
            heart:heart,
            updatedAt:updatedAt,
            namespace:namespaceToSelect,
            tags:tagsToSelect,
            type:type,

            mode:'EDIT'

    })

    this.store.getNextPrevLog(idParam)
    .then(ids => {

    this.setState(ids)

    })


  })
  .catch(e => {


      console.log(e)
  })





}

getObjId()
{
  return matchPath(this.props.location.pathname, {
    path: "/log/:id",
    exact: true,
    strict: true
  });
}

whichMode(objId)
{

  if( objId == null)
  return {mode: "ADD"}
  else
  return {mode: "EDIT", id: objId.params.id }
}


modeEdit(id)
{
  this.load(id)


  this.setState({mode:"EDIT"})


}

modeAdd()
{
  const type  = this.props.type ;
  this.setState({mode:"ADD", type:type})
}

   async componentDidMount() {

    console.log("componentDidMount");
    
    const objId = this.getObjId()

    const mode = this.whichMode(objId)

    switch(mode.mode)
    {
      case "ADD":
      this.modeAdd()
      break;

      case "EDIT":
      this.modeEdit(mode.id)
      break;

    }

const namespaces = await this.store.getNamespaces()

console.log("dataNamespace", namespaces);

this.setState({namespacesAvaible : this.addValueAndLabelToSelect(namespaces)}) 

const tags = await this.store.getTags()

this.setState({tagsAvaible : this.addValueAndLabelToSelect(tags)}) 

  }

  addValueAndLabelToSelect(options)
  {
   return options.map(e => {

      return {...e, ...{ value:e.name, label:e.name} }
   
   
     }) 


  }

  handleNameSpaceSelect(selected)
  {
    console.log("selected", selected);
    this.setState({

      namespace : selected
    })

  }

  handleNameSpaceCreate(inputValue)
  {

    this.store.addNamespace({name : inputValue}, 
      
      (res) => {

        const namespace = res.data
        
        const namesSpaceToSelect = {...namespace, ...{value:namespace.name, label:namespace.name}}
      
        console.log('handleNameSpaceCreate', [...this.state.namespacesAvaible, ...[namesSpaceToSelect]])

        this.setState({
         namespacesAvaible : [...this.state.namespacesAvaible, ...[namesSpaceToSelect]],
         namespace : namesSpaceToSelect

        }) 


      }
      )



  }

  handleTagSelect(selected)
  {

    this.setState({

      tags : selected
    })

  }


  handleTagCreate(inputValue)
  {

    this.store.addTag({name : inputValue}, 
      
      (res) => {

        const tag = res.data
        
        const tagsToSelect = {...tag, ...{value:tag.name, label:tag.name}}
      
        console.log('handleNameSpaceCreate', [...this.state.tagsAvaible, ...[tagsToSelect]])

        this.setState({
         tagsAvaible : [...this.state.tagsAvaible, ...[tagsToSelect]],
         tag : tagsToSelect

        }) 


      }
      )



  }
  
    onPrevLog(e)
    {
      e.preventDefault()

      this.load(this.state.prev)

    }

    onNextLog(e)
    {
    e.preventDefault()

    this.load(this.state.next)

    console.log("onNextLog")

    }

  
    renderSwitch(param) {
        switch(param) {
          case 'text':
            return <LogContentText content={this.state.content} onChangeContent={this.handleContentChange} />;
    
          default:
            return 'foo';
        }
      }

      
      handleContentChange(content)
      {
      this.setState({content: content})
      }

      onSubmit (event) {
        event.preventDefault();
      }

      render() {

      let 
      {
        heart,
        isRedirect,
        createdAt,
        updatedAt,
        
        mode,
        
        title,
        description,
        content,
        namespace,
        tag,
        type,

        namespacesAvaible
      }  = this.state

      
      createdAt = createdAt ? this.format.date(createdAt) : ""
      updatedAt = createdAt ? this.format.date(updatedAt) : ""

      title = this.format.string(title)
      description  = this.format.string(description)
     // namespace =  this.format.string(namespace)
       tag = this.format.string(tag)
      content = this.format.string(content)
   
      const colourSelectStyles = {
        control: styles => ({ ...styles, backgroundColor: 'white' 
      }),
        option: (styles) => {
          const color = "black";
          return {
            ...styles,
           // backgroundColor: 'red',
            color: '#000',
            cursor: 'default'
          
          };
        },
        
      };

      
      return (


            isRedirect? <Redirect to="/"/>
:


<form onSubmit={this.onSubmit}>

  <div className="header_group">
  <h1 className="capital">{type}</h1>
  <h3>{mode}</h3>
  </div>
  <div className="title_description_group">
 
  <div className="item">
      <label>{this.state.id? `ID ${this.state.id}` :""}</label>
    </div>

      <div className="item">
      <label>Title*</label>
      {title ? "": <h5>This field is required</h5> }
      <input id="title" name="title" className="title_input" placeholder="Title" type='text' onChange={(e) => this.handleChange(e)} value={title}/>
    </div>

    <div className="item">
      <label>Description</label>
      <input id="description" name="description" className="description_input" placeholder="Description" type='text'  onChange={(e) => this.handleChange(e)} value={description}/>
      </div>
  </div>

  <div className="metadata_group">
      <div className="item">
        <label>Created At</label>
        <input id="createdAt" name="createdAt" readOnly className="date_input" placeholder="Created At" type='text' maxLength="16" size="16" onChange={(e) => this.handleChange(e)} value={createdAt}/>
      </div>

    <div className="item">
      <label>Updated At</label>
      <input id="updatedAt" name="updatedAt" readOnly className="date_input" placeholder="Updated At" type='text' maxLength="16" size="16" onChange={(e) => this.handleChange(e)} value={updatedAt}/>
    </div>

    <div className="item">
      <label>Heart</label>
      <button onClick={(e) => this.toggleHeart(e)}><Heart  fill={heart? "true":"false"} color="red" /></button>
    </div>

    <div className="item">

      <label>Namespace</label>

      <CreatableSelect
                      
                      value={namespace}
            
                      onChange={this.handleNameSpaceSelect} 
                      onCreateOption={this.handleNameSpaceCreate}
            
                      options={namespacesAvaible} 
            
                      isClearable
                      

                      styles={colourSelectStyles}
                      />

    </div>

    <div className="item">
      <label>Tag</label>
    
      <CreatableSelect
                      
                      value={this.state.tags}
            
                      onChange={this.handleTagSelect} 
                      onCreateOption={this.handleTagCreate}
            
                      options={this.state.tagsAvaible} 
            
                      isClearable
                      isMulti
            
                      styles={colourSelectStyles}
                      />

    </div>

  </div>

  <div className="content_group">
  
   {this.state.prev ? <button className="before_button" onClick={(e) => this.onPrevLog(e)}><ArrowLeft /></button> : ""} 

    {this.renderSwitch(this.state.type)}

    {this.state.next ? <button className="after_button" onClick={(e) => this.onNextLog(e)}><ArrowRight/></button> : ""}
 
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

    export default Log;