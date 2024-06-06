import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Alert, Form, Button, Container, Row, Col } from 'react-bootstrap';

const CompleteProfile = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const displayNameInputRef = useRef();
  const photoUrlInputRef = useRef();

  useEffect(() => {
    if (userProfile) {
      displayNameInputRef.current.value = userProfile.displayName || '';
      photoUrlInputRef.current.value = userProfile.photoUrl || '';
    }
  }, [userProfile]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredDisplayName = displayNameInputRef.current.value;
    const enteredPhotoUrl = photoUrlInputRef.current.value;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCcErHXDGkKboWX0RyiBeUrz1T2YaYHx-M`,
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: token,
            displayName: enteredDisplayName,
            photoUrl: enteredPhotoUrl,
            returnSecureToken: true,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      const data = await response.json();
      dispatch(authActions.setUserProfile({
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      }));
      
      setResponseMessage('Profile updated successfully'); // Set response message
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <section className="border p-4 rounded">
            <h1 className="text-center mb-4">Complete Your Profile</h1>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="displayName" className="mb-3">
                <Form.Label>Your Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" required ref={displayNameInputRef} />
              </Form.Group>
              <Form.Group controlId="photoUrl" className="mb-3">
                <Form.Label>Profile Photo URL</Form.Label>
                <Form.Control type="url" placeholder="Enter profile photo URL" required ref={photoUrlInputRef} />
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center">
                <Button type="submit" variant="primary" className="me-2">
                  Update Profile
                </Button>
                {isLoading && <Spinner animation="border" />}
              </div>
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
              {responseMessage && <Alert variant="success" className="mt-3">{responseMessage}</Alert>} {/* Display response message */}
            </Form>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default CompleteProfile;
