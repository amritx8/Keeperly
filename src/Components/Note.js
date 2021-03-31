import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdColorPalette } from 'react-icons/io';
import { FaShareAlt } from 'react-icons/fa';
import { MdLabel } from 'react-icons/md';
import Color from './Color';
import Label from './Label';

const Note = (props) => {

    const {
        noteIndex,
        note,
        setNotes,
        setShowNote,
        deleteNote,
        labels,
        setLabels,
    } = props;

    const [showColor, setShowColor] = useState(false);
    const [showLabel, setShowLabel] = useState(false);

    return (
        <div className="note" style={{ background: `${note.color}` }}>

            <div className="note-text" onClick={() => setShowNote(noteIndex)}>
                {note.title || note.note ?
                    <>
                        <div className="note-title">{note.title}</div>
                        <div className="note-note">{note.note}</div>
                    </>
                    :
                    <div className="note-empty">Empty note</div>
                }
            </div>
            
            {showLabel && <Label

                labels={labels}
                setLabels={setLabels}
                note={note}
                noteIndex={noteIndex}
                setNotes={setNotes}
            />}

            {showColor && <Color
                note={note}
                noteIndex={noteIndex}
                setNotes={setNotes}
            />}

            <button
                className="note-button-label"
                onClick={() => setShowLabel(!showLabel)}
            >< MdLabel /></button>

            <button
                className="note-button-color"
                onClick={() => setShowColor(!showColor)}
            >< IoMdColorPalette /></button>

            <button
                className="note-button-share"
            >< FaShareAlt /></button>

            <button
                className="note-button-delete"
                onClick={() => deleteNote(noteIndex)}
            >< AiFillDelete /></button>
        </div>
    );
}

export default Note;