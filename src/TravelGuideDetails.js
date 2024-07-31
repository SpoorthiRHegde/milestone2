import React, { useState } from 'react';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import './TravelGuideDetails.css'; // Make sure to create this CSS file

const guideData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    nationality: 'American',
    languages: 'English, Spanish, French',
    occupation: 'Tour Guide',
    experience: '10 years',
    email: 'sarah.johnson.tours@example.com',
    phone: '+1 234-567-890',
    image: 'https://img.freepik.com/free-photo/portrait-beautiful-woman-isolated-yellow-studio-background_155003-25086.jpg?size=626&ext=jpg&ga=GA1.1.431704751.1719647485&semt=ais_user',
    available: true,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    age: 29,
    gender: 'Male',
    nationality: 'Indian',
    languages: 'Hindi, English, Kannada',
    occupation: 'Tour Guide',
    experience: '7 years',
    email: 'rajesh.kumar.tours@example.com',
    phone: '+91 98765 43210',
    image: 'https://img.freepik.com/free-photo/beautiful-male-half-length-portrait-isolated-white-studio-background-young-emotional-hindu-man-blue-shirt-facial-expression-human-emotions-advertising-concept-standing-smiling_155003-25250.jpg?size=626&ext=jpg&ga=GA1.1.431704751.1719647485&semt=ais_user',
    available: false,
  },
  {
    id: 3,
    name: 'Anita Patel',
    age: 31,
    gender: 'Female',
    nationality: 'Indian',
    languages: 'English, Hindi, Tamil',
    occupation: 'Tour Guide',
    experience: '8 years',
    email: 'anita.patel.tours@example.com',
    phone: '+91 91234 56789',
    image: 'https://st2.depositphotos.com/13166358/42123/i/450/depositphotos_421230578-stock-photo-smiling-young-indian-lady-looking.jpg',
    available: true,
  }
];

const TravelGuideDetails = () => {
  const [filter, setFilter] = useState('all');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredGuides = guideData.filter(guide => filter === 'all' || (filter === 'available' && guide.available));

  return (
    <Container>
      <h1 className="mt-5 mb-4 text-center">Travel Guide Details</h1>
      <Form className="mb-5 filter-form">
        <Form.Group controlId="filter">
          <Form.Label>Filter Guides</Form.Label>
          <Form.Control as="select" value={filter} onChange={handleFilterChange}>
            <option value="all">All Guides</option>
            <option value="available">Currently Available Guides</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <Row>
        {filteredGuides.map(guide => (
          <Col key={guide.id} md={4} className="mb-4">
            <Card className="guide-card">
              <Card.Img variant="top" src={guide.image} alt={`Image of ${guide.name}`} />
              <Card.Body>
                <Card.Title>{guide.name}</Card.Title>
                <ul className="profile-details">
                  <li><strong>Age:</strong> {guide.age}</li>
                  <li><strong>Gender:</strong> {guide.gender}</li>
                  <li><strong>Nationality:</strong> {guide.nationality}</li>
                  <li><strong>Languages Spoken:</strong> {guide.languages}</li>
                  <li><strong>Occupation:</strong> {guide.occupation}</li>
                  <li><strong>Years of Experience:</strong> {guide.experience}</li>
                  <li><strong>Available:</strong> {guide.available ? 'Yes' : 'No'}</li>
                </ul>
                <div className="contact-info">
                  <p><strong>Email:</strong> <a href={`mailto:${guide.email}`}>{guide.email}</a></p>
                  <p><strong>Phone:</strong> <a href={`tel:${guide.phone}`}>{guide.phone}</a></p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default TravelGuideDetails;
