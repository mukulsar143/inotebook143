import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  let host = "http://127.0.0.1:8000";

  const [notes, setNotes] = useState([]);

  const [search, setsearch] = useState("");

  const getnotes = async () => {
    // API CALL
    try {
      const response = await fetch(
        `${host}/api/notes/notesapi/?search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      alert("something went wrong...");
    }
  };

  // Add Notes

  const addnotes = async (title, descriptions) => {
    // API CALL
    try {
      const response = await fetch(`${host}/api/notes/notesapi/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, descriptions }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      alert("something went wrong...");
    }
  };

  // Edit Notes
  const editnotes = async (id, title, descriptions) => {
    // API Call
    try {
      const response = await fetch(`${host}/api/notes/notesapi/update/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ title, descriptions }),
      });
      const json = await response.json();
      // eslint-disable-next-line

      // Edit Functionality
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = notes[index];
        if (element.id === id) {
          newNotes[index].title = title;
          newNotes[index].descriptions = descriptions;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      alert("something went wrong...");
    }
  };
  // Delete Notes
  const deletenotes = async (id) => {
    // API CALL
    try {
      const response = await fetch(`${host}/api/notes/notesapi/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const json = await response.json();
      // eslint-disable-next-line

      const notid = notes.filter((note) => {
        return note.id !== id;
      });
      setNotes(notid);
    } catch (error) {
      alert("something went wrong...");
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes,
        addnotes,
        editnotes,
        deletenotes,
        getnotes,
        search,
        setsearch,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
