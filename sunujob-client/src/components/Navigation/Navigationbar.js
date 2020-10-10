import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

class Navigationbar extends Component {
    render() {
      return (
        <div>
          <div >
            <Navbar bg="dark" variant="dark">
  
              <Nav className="mr-auto">
                <Nav.Link href="/accueil" style={{
                  marginRight: "2rem",
                }} >Home</Nav.Link>
                <Nav.Link href="/profil" style={{
                  marginRight: "2rem"
                }}>Profil</Nav.Link>
                <Nav.Link href="/Messages" style={{
                  marginRight: "2rem"
                }} >Messages</Nav.Link>
                <Nav.Link href="/notifications">Notifications</Nav.Link>
  
              </Nav>
            </Navbar>
          </div>
        </div>
      )
    }
  }

  export default Navigationbar;