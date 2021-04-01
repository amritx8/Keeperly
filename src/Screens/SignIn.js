import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../userContext';
import Message from '../Components/Message';

const SignIn = () => {

    const history = useHistory();
    const prevUser = JSON.parse(localStorage.getItem("user"));

    if(prevUser !== null) {

        history.push('/');
    }

    const { setUser } = useContext(UserContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = () => {

        axios.post('https://keeperly.herokuapp.com/signin', { username, password }, {
            headers: { 'Content-Type': 'application/json' }
        }).then(response => {

            const { data } = response;

            setMessage(data.message);
            
            if (data.message === "Signed in successfully") {

                setUser(data.userData);
                
                localStorage.setItem("user", JSON.stringify(data.userData));
            }
        });
    }

    const handleClick = () => {

        if (message === "Signed in successfully") {

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
                        placeholder="Enter username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="form-button" onClick={handleSubmit}>SIGN IN</button>
            </div>
        }
        </>
    );
}

export default SignIn;