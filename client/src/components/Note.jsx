import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const Note = (props) => {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        onClick={() => {
          fetch("/api/notes", {
            method: "DELETE",
            body: JSON.stringify({
              title: props.title,
              content: props.content,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          }).catch((err) => {
            console.log(err);
          });
          props.deleteNote(props.id);
        }}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default Note;
