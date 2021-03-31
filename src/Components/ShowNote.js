import React, { useState } from 'react';
import { GrClose } from 'react-icons/gr';

const ShowNote = ({ index, notes, setNotes, setShowNote }) => {

    const [note, setNote] = useState(notes[index]);

    const handleClick = () => {

        setNotes(notes => notes.map((currentNote, idx) => {

            return (idx === index) ? note : currentNote;
        }));

        setShowNote(-1);
    }

    return (
        <div className="show-note">
            <button className="show-note-button-cancel" onClick={() => setShowNote(-1)}><GrClose /></button>
            <input
                type="text"
                value={note.title}
                className="show-note-input"
                onChange={e => setNote({ ...note, title: e.target.value })}
            />
            <textarea
                type="text"
                value={note.note}
                className="show-note-textarea"
                onChange={e => setNote({ ...note, note: e.target.value })}
            />
            <button className="show-note-button-save" onClick={handleClick}>Save</button>
        </div>
    );
}

export default ShowNote;