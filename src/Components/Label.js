import React, { useEffect, useState } from 'react';
import { GoPlus } from 'react-icons/go';

const Label = (props) => {

    const { labels, setLabels, note, noteIndex, setNotes } = props;
    const [currentLabel, setCurrentLabel] = useState(note.label);
    const [newLabel, setNewLabel] = useState("");
    
    const addNewLabel = () => {

        if(newLabel) {

            setLabels([...labels, newLabel]);
        }
    }

    const changeLabel = (e) => {

        let changedLabel = e.target.value;

        if(currentLabel !== changedLabel) {

            setCurrentLabel(changedLabel);
        } else {

            if(currentLabel !== 'None') {

                setCurrentLabel('None');
            }
        }
    }
    
    useEffect(() => {

        setNotes(notes => notes.map((obj, index) => {

            return index === noteIndex ? {...obj, label: currentLabel} : obj;
        }));
    
        //eslint-disable-next-line
    }, [currentLabel]);

    return (
        <div className="note-label">

            <h6 className="note-label-text">Select Label</h6>

            <input
                className="note-label-input"
                type="text"
                value={newLabel}
                maxLength="10"
                onChange={e => setNewLabel(e.target.value)}
            />
            <button
                className="note-label-button"
                onClick={addNewLabel}
            ><GoPlus /></button>

            <div className="note-label-list">
                
                {labels.map((obj, index) => (
                    
                    <div key={index} className="note-label-item">
                        <input
                            className="note-label-item-input"
                            type="checkbox"
                            value={obj}
                            checked={obj === currentLabel}
                            onChange={changeLabel}
                        />
                        <label className="note-label-item-text">{obj}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Label;