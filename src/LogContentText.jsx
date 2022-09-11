import React, { Component } from 'react';

//import { Editor } from '@tinymce/tinymce-react';

import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import "react-mde/lib/styles/css/react-mde-all.css";

class LogContentText extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
         value : this.props.content,
         selectedTab : "write"
        }


        this.handleContentChange = this.handleContentChange.bind(this);

        this.handleTab = this.handleTab.bind(this);


      


    }

    componentDidMount()
    {


    }

    handleContentChange(newValue)
    {

     /*  this.setState({
        editorState: newValue,
      }); */

      this.setState({
        value : newValue

      })
this.props.onChangeContent(newValue)

    }

    handleTab (tab)
    {

      this.setState({
        selectedTab : tab

      })

    }
   

    render() {

      const divStyle = {
      
        width: "99%",
        padding: "10px",

      };

       return( 
       <>
           <div className="container"        style={divStyle}
>

       <ReactMde


        value={this.state.value}
        onChange={this.handleContentChange}

        selectedTab={this.state.selectedTab}
        onTabChange={this.handleTab}
        
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(<ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />)
        }

        childProps={{
          writeButton: {
            tabIndex: -1
          }
        }}
     
        minEditorHeight={200}
        minPreviewHeight={200}
      />


       </div>
       </>
        )

    }


}//


export default LogContentText;
