import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  useUser,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import "../css/Header.css";

function Header({ onSearch }) {
  const [inputValue, setInputValue] = useState("");
  const { isSignedIn } = useUser();

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchClick();
    }
  };

  return (
    <Navbar expand="lg" bg="light" sticky="top" className="shadow-sm py-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="src/images/logo.png.jpg"
            alt="PixelPlay Logo"
            className="me-2"
            height="40"
          />
          <span className="fw-bold fs-4 text-dark">PixelPlay</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="mt-2 mt-lg-0">
          <Nav className="me-auto w-100 justify-content-center">
            <Form
              className="d-flex search-form w-75"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick();
              }}
            >
              <FormControl
                type="search"
                placeholder="Search games..."
                className="me-2 rounded-pill"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                variant="dark"
                type="submit"
                className="rounded-pill px-3"
              >
                <FaSearch />
              </Button>
            </Form>
          </Nav>

          <Nav className="align-items-center justify-content-end mt-3 mt-lg-0">
            {isSignedIn ? (
              <>
                <Button
                  as={Link}
                  to="/library"
                  variant="outline-secondary"
                  className="me-2 rounded-pill"
                >
                  Library
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="outline-primary" className="me-2 rounded-pill">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button variant="primary" className="rounded-pill">
                    Sign Up
                  </Button>
                </SignUpButton>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
