import React, { useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import Fab from "@material-ui/core/Fab";
import { Zoom } from "@material-ui/core";

function CreateArea(props) {
  const [expanded, setExpanded] = useState(false);
  const[item, setItem] = useState({
    title: "",
    content: ""
  });

  function changeItem(event){
    const {value, name} = event.target;
    setItem(previous => {
      return {
        ...previous,
        [name]: value
      }
    });
  }

  function addNote(event){
    props.addList(item);
    setItem({
      title: "",
      content: ""
   })
    event.preventDefault();
  }

  function isExpanded(){
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note" onSubmit={addNote}>
        {expanded && (
          <input onChange={changeItem} 
                value={item.title} 
                name="title" 
                placeholder="Title" 
          />
        )}
          <textarea 
                  onChange={changeItem} 
                  value={item.content} 
                  name="content" 
                  placeholder="Take a note..." 
                  onClick={isExpanded}
                  rows={expanded ? "3": "1"} 
          />
        <Zoom in={expanded}>
          <Fab type="submit">
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;