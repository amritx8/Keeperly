import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../userContext';

const Header = () => {

    const { user } = useContext(UserContext);
    const [show, setShow] = useState(false);

    const handleSignOut = () => {

        localStorage.removeItem("user");
    }

    useEffect(() => {

    }, [user]);

    return (
        <div className="header">
            <a className="header-title" href="/">Keeperly</a>
            {user &&
                <div
                    className="header-profile"
                    onClick={() => setShow(!show)}
                >
                    <span>{user.name}</span>
                    
                    <img
                        src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
                        alt="User avatar"
                    />
                </div>
                
                // <Nav className="ml-auto">
                //     <Nav.Link className="nav-item" onClick={handleSignOut} href='/'>Sign Out</Nav.Link>
                //     <Nav.Link className="nav-item" href='/signin'>Sign In</Nav.Link>
                //     <Nav.Link className="nav-item" href='/signup'>Sign Up</Nav.Link>
                // </Nav>
            }
            {show  && 
                <div className="header-profile-dropdown">
                    <ul>
                        <li className="header-profile-dropdown-li">
                            <a href="/profile">Profile</a>
                        </li>
                        <li>
                            <a
                                className="header-profile-dropdown-button"
                                onClick={handleSignOut}
                                href="/"
                            >Sign out</a>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
};

export default Header;