import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';


const CreateNote = (props) => {

    const { setNotes } = props;
    const [newNote, setNewNote] = useState({
        title: "",
        note: "",
        color: "white",
        label: "None",
        share: []
    });
    const [show, setShow] = useState(false);

    const addNote = () => {

        if (newNote.title !== "" || newNote.note !== "") {
            
            setNotes(notes => [...notes, newNote]);
        }
        
        setNewNote({
            title: "",
            note: "",
            color: "white",
            label: "None",
            share: []
        });

        setShow(false);
    }

    return (
        <div className="create-note">
            <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onClick={() => {!show && setShow(true)}}
                onChange={(e) => setNewNote(current => ({ ...current, title: e.target.value }))}
            />
            {show && <>
                <textarea
                    type="text"
                    placeholder="Take a note..."
                    value={newNote.text}
                    onChange={(e) => setNewNote(current => ({ ...current, note: e.target.value }))}
                />

                <button onClick={addNote}>
                    {(newNote.title !== "" || newNote.note !== "") ? <FaPlus /> : <GrClose />}
                </button>
            </>}
        </div>
    )
}

export default CreateNote;