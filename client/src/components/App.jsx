import React, { useState, useEffect } from "react";
import Header from "./Header";
import CreateArea from "./CreateArea";
import Note from "./Note";
import Footer from "./Footer";

const App = () => {
  const [notes, setnotes] = useState([]);
  useEffect(() => {
    fetch("/api/notes")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setnotes(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addNote = (note) => {
    setnotes((prevValue) => {
      return [...prevValue, note];
    });
  };
  const deleteNote = (id) => {
    setnotes((prevValue) => {
      return prevValue.filter((item, index) => {
        return index != id;
      });
    });
  };
  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            deleteNote={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
};

export default App;
