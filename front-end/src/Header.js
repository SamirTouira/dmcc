import React from 'react';
import { Navbar, Container, Nav } from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    return (
        <Navbar style={{ backgroundColor: "red" }} bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">DMCC</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse style={{ marginTop: "24px" }} id="basic-navbar-nav">
                    <Nav variant="tabs" defaultActiveKey="/" className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <>
                            {localStorage.getItem("user-token") ? (
                                <>
                                    <Nav.Link as={NavLink} eventKey={2} to="/profile"> Profile </Nav.Link>
                                    <Nav.Link onClick={() => {
                                        if (window.confirm("Are you sure?")) {
                                            navigate('/logout')
                                        } else {
                                            return;
                                        }
                                    }} ><span style={{ color: "red" }}>Logout</span> </Nav.Link>
                                </>)
                                : (
                                    <>
                                        <Nav.Link as={NavLink} eventKey={3} to="/login"> Login </Nav.Link>
                                        <Nav.Link as={NavLink} eventKey={4} to="/register"> Register </Nav.Link>
                                    </>
                                )}
                        </>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
