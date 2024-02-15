import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export default function NotesItems(props) {
  const context = useContext(noteContext);
  const { deletenotes } = context;
  const { note, updateNote } = props;



  const handleDelete = () => {
    try {
      deletenotes(note.id);
      props.showAlert("Deleted Successfully", "success");
    } catch (error) {
      alert("Something gonna wrong..");
    }
  };

  const handleUpdate = () => {
    updateNote(note);
  };


  return (
    <>
      <div className="col-md-6">
        <div className="card my-6 my-2">
          <div className="card-body">
            <h5 className="card-title">{note.title}</h5>
            <p className="card-text">{note.descriptions}
               Lorem ipsum, dolor sit amet consectetur
              adipisicing elit. Amet, ducimus nobis? Cupiditate, maxime ab!
              Molestias ullam repellendus alias, vel, corrupti distinctio nihil
              culpa ex temporibus quo sit harum necessitatibus quod error itaque
              explicabo nostrum.
            </p>
            <button
              type="button"
              className="btn btn-sm btn-danger mx-2"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
