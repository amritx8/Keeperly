import React from 'react'

const Welcome = () => {
    return (
        <div className="welcome">
            <h1>Welcome To Keeperly</h1>
            <div>
                <a href="/signin">Sign In</a>
                <a href="/signup">Sign Up</a>
            </div>
        </div>
    );
}

export default Welcome;
