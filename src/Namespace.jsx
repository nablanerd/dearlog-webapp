import React, { Component } from 'react';
import "./LogEditText.css"
import { Heart , ArrowRight , ArrowLeft, Cpu} from 'react-feather';

import { matchPath } from "react-router";

import { Redirect } from "react-router-dom";

import LogStore from './LogStore';

import Format from './Format'

import { stringify } from 'qs';

class Namespace extends React.Component {
    constructor(props) {
      super(props);
  
      this.store = new LogStore()

      this.format = new Format()

      this.namespaceInit =  {
        id:null,

        name:"",
        description:"",
        createdAt:"",
        updatedAt:"",

      };

      this.appStateInit = {
        mode: "",
        isRedirect:false,
        prev :null,
        next:null,
        toUrl:null
      }

      this.state = {
        ...this.namespaceInit, 
        ...this.appStateInit 
      }
   
      this.handleChange = this.handleChange.bind(this);

      this.handleSubmit = this.handleSubmit.bind(this);

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

      if(this.state.name == "" )
      {
        this.props.notify_error("name is empty")
        return;
      }

      if(this.state.mode === "EDIT")
      {    

        const { id, name, description } = this.state 

        //todo object log        
        const namespace = await this.store.updateNamespace(
          id,
        {
          name,
          description
        }

      )

      this.props.notify_success("namespace updated")

      console.log(this.props);

    }
    else

    {

      //todo object log
      this.store.addNamespace(
        {
          name : this.state.name,
          description : this.state.description,

        },
    //   () => console.log("addNamespace")
    (res) => {

      console.log("res", res);
      
      const namespace = res.data;
      
      this.load(namespace.id)

    }


      )

      this.setState({

        mode : 'EDIT'
      })
      this.props.notify_success("namespace added")
    }
     }

  onDelete (e)
  {
    e.preventDefault()  

    this.store.deleteNamespace(this.state.id)

    this.props.notify_success("namespace deleted")

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

  this.setState( 
    {
        name:"",
        description:"",

      }
  )
}

load(idParam)
{
    
  this.store.getNamespace(idParam)
  .then(data => {

    console.log("data", data);

  const {id, name, description, createdAt, updatedAt} = data;

  this.setState({

            id:id,
            name: name,
            description: description,
            createdAt: createdAt,
            updatedAt:updatedAt,

            mode:'EDIT'

    })

/*     this.store.getNextPrevLog(idParam)
    .then(ids => {

    this.setState(ids)

    })
 */

  })
  .catch(e => {

   // notify_error(e.message)

      console.log(e)
  })


}

getObjId()
{
  return matchPath(this.props.location.pathname, {
    path: "/namespace/:id",
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
  this.setState({mode:"ADD"})
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

  }

    onPrevNamespace(e)
    {
      e.preventDefault()

      this.load(this.state.prev)

    }

    onNextNamespace(e)
    {
    e.preventDefault()

    this.load(this.state.next)

    console.log("onNextNamespace")

    }


      onSubmit (event) {
        event.preventDefault();
      }

      render() {

      let 
      {
        isRedirect,

        createdAt,
        updatedAt,
        
        mode,
        
        name,
        description,

      }  = this.state

      
      createdAt = createdAt ? this.format.date(createdAt) : ""
      updatedAt = createdAt ? this.format.date(updatedAt) : ""

      name = this.format.string(name)
      description  = this.format.string(description)

      return (


            isRedirect? <Redirect to="/"/>
:


<form onSubmit={this.onSubmit}>

  <div className="header_group">
<h3>NAMESPACE</h3>
  <h2>{mode}</h2>
  </div>
  <div className="title_description_group">
 
  <div className="item">
      <label>{this.state.id? `ID ${this.state.id}` :""}</label>
    </div>

      <div className="item">
      <label>Name*</label>
      {name ? "": <h5>This field is required</h5> }
      <input id="name" name="name" className="title_input" placeholder="Name" type='text' onChange={(e) => this.handleChange(e)} value={name}/>
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

    export default Namespace;