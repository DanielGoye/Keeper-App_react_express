import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          onChange={handleChange}
          name="title"
          placeholder="Title"
          value={note.title}
        />
        <textarea
          onChange={handleChange}
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
        />
        <button
          onClick={() => {
            fetch("/api/notes", {
              method: "POST",
              body: JSON.stringify(note),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            }).catch((err) => {
              console.log(err);
            });
            setNote({
              title: "",
              content: "",
            });
            props.addNote(note);
          }}
        >
          <AddIcon />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
