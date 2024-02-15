import React, { useContext, useEffect, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NotesItems from "./NotesItems";
import { useNavigate } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getnotes, editnotes } = context;

  const ref = useRef(null);
  const Closeref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')){
      getnotes();
    }
    else {
      navigate("/login")
    }
       // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({id : '',  utitle: "", udescriptions: "" });

  const updateNote = (currentNote) => {
    try {
      ref.current.click();
      setNote({
        id : currentNote.id,
        utitle: currentNote.title,
        udescriptions: currentNote.descriptions,
      });
    } catch (error) {
      alert(error)
    }
  
  };

  const handleonSubmit = (e) => {

    try {
      Closeref.current.click();
      editnotes(note.id, note.utitle, note.udescriptions)
      props.showAlert("Updated Successfully", "success")
    } catch (error) {
      alert(error)
    }
 
  };

  const onclickChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <form onSubmit={handleonSubmit}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-utitle" id="exampleModalLabel">
                  Update Note
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">
                    Title
                  </label>
                  <input
                    value={note.utitle}
                    type="text"
                    className="form-control"
                    name="utitle"
                    onChange={onclickChange}
                    minLength={5}
                    required
                    id="utitle"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescriptions" className="form-label">
                    Descriptions
                  </label>
                  <input
                    value={note.udescriptions}
                    type="text"
                    className="form-control"
                    name="udescriptions"
                    onChange={onclickChange}
                    minLength={5}
                    required
                    id="udescriptions"
                  />
                </div>{" "}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={Closeref}
                >
                  Close
                </button>
                <button type="button" disabled = {note.utitle.length<5 || note.udescriptions.length<5} className="btn btn-primary" onClick={handleonSubmit}>
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="container row my-3 mx-2">
        <h2>Your Notes</h2>
        {notes.length ===0 && 'No Notes to Display'}
        {notes.map((note) => (
          <NotesItems key={note.id} showAlert = {props.showAlert} OnSearch = {props.OnSearch} host = {props.host} updateNote={updateNote} note={note} />
        ))}
      </div>
    </>
  );
}
