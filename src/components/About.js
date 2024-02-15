import React, { useState } from 'react';
import NotesItems from './NotesItems';

function About() {
  // Step 1: Define state variables
  const [note, setFormData] = useState({
    title: '',
    description: ''
  });

  const updateNote = (upnotes) =>{
    setFormData({
      title: upnotes.title,
      description: upnotes.descriptions
    });
  }

  // Step 2: Event handler to update state with new data
  const onClickChange = (e) => {
    setFormData({
      ...note,
      [e.target.name]: e.target.value
    });
  };

  // Step 3: Function to handle form submission and perform update
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform the update operation using the formData state
    console.log('Updating with:', note);
    // Reset the form fields after update if needed
    setFormData({
      title: '',
      description: ''
    });
  };

  return (
    <div>
      <NotesItems updateNote = {updateNote}/>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="ExampleModalLabel">
            Update Notes
          </h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                value={note.title}
                type="text"
                className="form-control"
                name="title"
                onChange={onClickChange}
                id="title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descriptions" className="form-label">
                Descriptions
              </label>
              <input
                value={note.descriptions}
                type="text"
                className="form-control"
                name="descriptions"
                onChange={onClickChange}
                id="descriptions"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default About;
