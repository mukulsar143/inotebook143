import React, { useContext } from "react";
import AddNotes from "./AddNotes";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";



export default function Home(props) {

    const context = useContext(noteContext);
    const {search, setsearch, getnotes } = context;

  
    const handloOnSearch = (e) => {
        e.preventDefault()
        getnotes(setsearch)
        }
    
    
      const handleOnchange = (e) => {
        setsearch(e.target.value)
      }

  return (
    <div>
      <div className="container">
        <form className="d-flex">
          <input
            onChange={handleOnchange}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            value={search.name}
          />
          <button className="btn btn-outline-success" onClick={handloOnSearch} type="submit">
            Search
          </button>
        </form>
        <AddNotes showAlert={props.showAlert} />
        <Notes showAlert={props.showAlert}  />
      </div>
    </div>
  );
}
