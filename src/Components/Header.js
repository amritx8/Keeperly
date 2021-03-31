import React, { useEffect, useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { UserContext } from '../userContext';

const Header = () => {

    const { user } = useContext(UserContext);

    const handleSignOut = () => {

        localStorage.removeItem("user");
    }

    useEffect(() => {

    }, [user]);

    return (
        <div>
            <Navbar className="nav">
                <Navbar.Brand className="nav-head" href="/">Keeper</Navbar.Brand>
                {user ?
                    <Nav className="ml-auto">
                        <Nav.Link className="nav-item" href='/profile'>{user.name}</Nav.Link>
                        <Nav.Link className="nav-item" onClick={handleSignOut} href='/'>Sign Out</Nav.Link>
                    </Nav>
                : 
                    <Nav className="ml-auto">
                        <Nav.Link className="nav-item" href='/signin'>Sign In</Nav.Link>
                        <Nav.Link className="nav-item" href='/signup'>Sign Up</Nav.Link>
                    </Nav>
                }
            </Navbar>
        </div>
    )
};

export default Header;