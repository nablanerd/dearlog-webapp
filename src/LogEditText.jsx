import React, { Component } from 'react';
import "./LogEditText.css"
import { Heart , ArrowRight , ArrowLeft} from 'react-feather';

class LogEditText extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        heart: false
      };

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
  <div className="title_description_group">
      <div className="item">
      <label>Title*</label>
      <input className="title_input" placeholder="Title" type='text' />
    </div>

    <div className="item">
      <label>Description</label>
      <input className="description_input" placeholder="Description" type='text' />
      </div>
  </div>

  <div className="metadata_group">
      <div className="item">
        <label>Created</label>
        <input className="date_input" placeholder="Created" type='text' maxLength="16" size="16" />
      </div>

    <div className="item">
      <label>Updated</label>
      <input className="date_input" placeholder="Updated" type='text' maxLength="16" size="16" />
    </div>

    <div className="item">
      <label>Heart</label>
      <button onClick={(e) => this.toggleHeart(e)}><Heart  fill={heart? "true":"false"} color="red" /></button>
    </div>

    <div className="item">
      <label>Namespace</label>
      <input className="namespace_input" placeholder="Namespace" type='text' />
    </div>

    <div className="item">
      <label>Tag</label>
      <input className="tag_input" placeholder="Tag" type='text' />
    </div>

  </div>

  <div className="content_group">
    <button className="before_button"><ArrowLeft /></button>
    <button className="after_button"><ArrowRight/></button>

    <textarea className="content_textarea">

    </textarea>



  </div>

<div className="button_group">
  <button onClick={(e)=> e.preventDefault()} className="tertiary button_edit_text">Save</button>
<button className="secondary button_edit_text">Cancel</button>
<button className="primary button_edit_text">Reset</button>
<button className="inverse button_edit_text">Delete</button>

</div>
</form>        
        )
      }


    }

    export default LogEditText;