import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { UserContext } from '../userContext';
import axios from 'axios';
import Message from '../Components/Message';

const Profile = () => {

    const { user, setUser } = useContext(UserContext);

    const history = useHistory();

    if (user === null) {

        history.push('/');
    }

    const [name, setName] = useState((user ? user.name : ""));
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);

    const updateProfile = () => {

        if(password !== confirmPassword) {
            
            setMessage("Password doesn't match");
        } else {

            const { _id } = user;

            axios.put('/user', { _id, name, password }, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {

                const { data } = response;

                setMessage(data.message);

                if (data.message === "Update successfully") {

                    setUser(data.userData);

                    localStorage.setItem("user", JSON.stringify(data.userData));
                }
            });
        }
    }

    const handleMessage = () => {

        if (message === "Update successfully") {

            history.push('/');
        }

        setMessage(null);
        setName((user ? user.name : ""));
        setPassword("");
        setConfirmPassword("");
    }

    return (
        <>
            {message ?
                <Message message={message} handleClick={handleMessage} />
            :
                <div>
                    <button className="profile-button-back" onClick={() => history.push('/')}> Back </button>
                    <div className="profile">
                        <div className="profile-box">
                            <label className="profile-label">Username</label>
                            <input
                                className="profile-input"
                                type="text"
                                value={(user !== null) ? user.username : ""}
                                readOnly
                            />
                            <label className="profile-label">Name</label>
                            <input
                                className="profile-input"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="profile-label">Password</label>
                            <input
                                className="profile-input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="profile-label">Confirm Password</label>
                            <input
                                className="profile-input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button className="profile-button-save" onClick={updateProfile}>Save</button>
                    </div>
                </div>
            }
        </>
    );
}

export default Profile;