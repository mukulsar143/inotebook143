import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'


export default function AddNotes(props) {
    const context = useContext(noteContext)
    const { addnotes } = context

    const [note, setNote] = useState({title: '', descriptions: ''})

    const handleonSubmit = (e) => {
        try {
            e.preventDefault();
            addnotes(note.title, note.descriptions)
            setNote({title: '', descriptions: ''})
            props.showAlert('Created Successfully', 'success')
        } catch (error) {
            alert('Something gome wrong')            
        }
 
    }
    
    const onclickChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }


    return (
        <div className='container my-3'>
            <h1 className='my-3 mx-2'>Add Notes</h1>
            <form className='container'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" name='title' onChange={onclickChange} minLength={5} required id="title" value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="descriptions" className="form-label">Descriptions</label>
                    <input type="text" className="form-control" name='descriptions' onChange={onclickChange} minLength={5} required id="descriptions" value={note.descriptions}/>
                </div>
                    <button disabled = {note.title.length<5 || note.descriptions.length<5} type="submit" className="btn btn-sm btn-primary" onClick={handleonSubmit}>Add Notes</button>
            </form>

        </div>
    )
}
