import React from 'react';
import colors from '../colors';

const Color = (props) => {

    const { note, noteIndex, setNotes} = props;

    const selectColor = (key) => {

        const newColor = note.color === colors[key] ? 'white' : colors[key];

        setNotes(notes => notes.map((note, index) => {

            return index === noteIndex ? { ...note, color: newColor } : note;
        }));
    }

    return (
        <div className="note-color">
            <h6 className="note-color-text">Select Color</h6>
            {colors.map((obj, index) => (
                <div
                    key={index}
                    className="note-color-circle"
                    style={{
                        backgroundColor: `${obj}`,
                        border: `${note.color === obj ? '2px solid black' : 'none'}`,
                    }}
                    onClick={() => selectColor(index)}
                ></div>
            ))}
        </div>
    );
}

export default Color;