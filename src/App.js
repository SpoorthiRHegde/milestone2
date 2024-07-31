// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route as RouteElement, Link } from 'react-router-dom';
import { Navbar, Nav, Carousel, Button, Modal, Form } from 'react-bootstrap';
import DestinationList from './DestinationList';
import DestinationDetail from './DestinationDetail';
import ContactForm from './ContactForm';
import TravelGuideDetails from './TravelGuideDetails';
import BlogForm from './BlogForm'; // Import the BlogForm component
import Maps from './Maps'; // Import the Maps component
import './App.css';
import './CustomModals.css'; // Import custom modal styles
import axios from 'axios'; // Import axios for making HTTP requests

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => {
    // Clear the signup form when the signup modal is opened
    setSignupForm({ email: '', password: '', confirmPassword: '' });
    setShowSignup(true);
  };
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/signup', signupForm);
      alert('Signup successful');
      handleCloseSignup();
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/login', loginForm);
      alert('Login successful');
      handleCloseLogin();
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  return (
    <Router>
      <div>
        <Navbar className="custom-navbar" expand="lg">
          <Navbar.Brand className="brand-heading">NAMMA KUDLA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/guides" className="nav-link">Guides</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/maps" className="nav-link">Maps</Link>
              <Button variant="outline-primary" onClick={handleShowLogin} className="mr-2">Login</Button>
              <Button variant="outline-secondary" onClick={handleShowSignup}>Signup</Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        
        {/* Carousel */}
        <Carousel className="custom-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://adventurebuddha.com/wp-content/uploads/2020/05/Kaup-Beach-Vivek-Raj_2-1024x530.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://s3.ap-south-1.amazonaws.com/zoom-blog-image/2016/03/rameswaram-temple-history.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://static.vecteezy.com/system/resources/previews/011/127/621/non_2x/beautiful-sea-waves-and-white-sand-beach-in-the-tropical-island-soft-waves-of-blue-ocean-on-sandy-beach-background-from-top-view-from-drones-concept-of-relaxation-and-travel-on-vacation-free-photo.jpg"
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://media.geeksforgeeks.org/wp-content/uploads/20240105125539/4th.jpg"
              alt="Fourth slide"
            />
          </Carousel.Item>
        </Carousel>
        <br />
        
        <Routes>
          <RouteElement path="/" element={<DestinationList />} />
          <RouteElement path="/destination/:id" element={<DestinationDetail />} />
          <RouteElement path="/contact" element={<ContactForm />} />
          <RouteElement path="/guides" element={<TravelGuideDetails />} />
          <RouteElement path="/blog" element={<BlogForm />} />
          <RouteElement path="/maps" element={<Maps />} />
        </Routes>
        
        
        {/* Login Modal */}
        <Modal show={showLogin} onHide={handleCloseLogin} className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleLoginSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Login
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        
        {/* Signup Modal */}
        <Modal show={showSignup} onHide={handleCloseSignup} className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSignupSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={signupForm.email}
                  onChange={handleSignupChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={signupForm.password}
                  onChange={handleSignupChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={signupForm.confirmPassword}
                  onChange={handleSignupChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit "className="mt-3" >
                Signup
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        
        {/* Footer */}
        <div className="custom-footer">
          <div className="footer-section">
            <h3>Connect with us</h3>
            <ul className="social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact us</h3>
            <p>Email: contact@incredibleindia.com</p>
            <p>Phone: +91 123 456 7890</p>
          </div>
          <div className="footer-section">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates and offers.</p>
            <form>
              <input type="email" placeholder="Your email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
