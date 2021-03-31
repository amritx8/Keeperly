import React from 'react';

const Message = ({message, handleClick}) => {

    return (
        <div className="message">
            <h1 className="message-text">{message}</h1>
            <button className="message-button" onClick={handleClick}>OK</button>
        </div>
    );
}

export default Message;
