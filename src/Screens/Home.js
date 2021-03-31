import { useState, useContext, useEffect } from 'react';
import CreateNote from '../Components/CreateNote';
import Note from '../Components/Note';
import { UserContext } from '../userContext';
import ShowNote from '../Components/ShowNote';
import axios from 'axios';
import Welcome from '../Components/Welcome';

const Home = () => {

    const { user, setUser } = useContext(UserContext);

    const prevUser = JSON.parse(localStorage.getItem("user"));

    let prevNotes = [], prevLabels;

    if(prevUser !== null) {
        
        prevNotes = prevUser.notes;
        prevLabels = prevUser.labels;
    }

    const [notes, setNotes] = useState(prevNotes);
    const [labels, setLabels] = useState(prevLabels);
    const [showNote, setShowNote] = useState(-1);

    const deleteNote = (index) => {

        setNotes(notes => notes.filter((note, idx) => (idx !== index)));
    }

    useEffect(() => {

        if(user !== null && user.notes !== notes) {

            const data = {
                _id: user._id,
                notes: notes,
                labels: labels
            };

            axios.put('/user', data, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {

                const { data } = response;

                setUser(data.userData);

                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(data.userData));
            })
        }
    
        //eslint-disable-next-line
    }, [notes, labels]);

    return (
        <>
        {!user ?
            <Welcome />
        :(showNote === -1 ?
            <div>
                <CreateNote setNotes={setNotes} />
                <div>
                    {notes.map((note, index) => (
                        <Note
                            key={index}
                            noteIndex={index}
                            note={note}
                            setNotes={setNotes}
                            setShowNote={setShowNote}
                            deleteNote={deleteNote}
                            labels={labels}
                            setLabels={setLabels}
                        />
                    ))}
                </div>
            </div>
            :<ShowNote index={showNote} notes={notes} setNotes={setNotes} setShowNote={setShowNote} />
        )}
        </>
    );
}

export default Home;