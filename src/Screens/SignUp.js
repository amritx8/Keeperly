import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../userContext';
import Message from '../Components/Message';
import axios from 'axios';

const SignUp = () => {

    const history = useHistory();
    const prevUser = JSON.parse(localStorage.getItem("user"));

    if (prevUser !== null) {
        
        history.push('/');
    }

    const { setUser } = useContext(UserContext);
    const [newUser, setNewUser] = useState({

        name: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null);

    const createUser = () => {

        if(newUser.password === newUser.confirmPassword) {

            axios.post('/user', newUser, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {

                const { data } = response;

                setMessage(data.message);

                if (data.message === 'Signed up successfully') {

                    setUser(data.userData);

                    localStorage.setItem("user", JSON.stringify(data.userData));
                }
            });
        } else {

            setMessage("Passward doesn't match!");
        }
    }

    const handleClick = () => {

        if (message === 'Signed up successfully') {

            history.push('/');
        } else {

            setMessage(null);
        }
    }

    return (
        <>
        {message ?
            <Message message={message} handleClick={handleClick} />
        :
            <div className="form-box">
                <div className="form-box2">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter name"
                        value={newUser.name}
                        onChange={e => setNewUser(user => ({ ...user, name: e.target.value }))}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter username"
                        value={newUser.username}
                        onChange={e => setNewUser(user => ({ ...user, username: e.target.value }))}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={e => setNewUser(user => ({ ...user, password: e.target.value }))}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Confirm passowrd"
                        value={newUser.confirmPassword}
                        onChange={e => setNewUser(user => ({ ...user, confirmPassword: e.target.value }))}
                        required
                    />
                </div>
                <button className="form-button" onClick={createUser}>SIGN UP</button>
            </div>
        }
        </>
    );
}

export default SignUp;