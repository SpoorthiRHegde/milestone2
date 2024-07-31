import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import destinations from './Destinations';

const DetailContainer = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const DetailImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 8px;
  margin-bottom: 20px;
  object-fit: cover;
`;

const DetailButton = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const DestinationDetail = () => {
  let { id } = useParams();
  const destinationId = parseInt(id);
  const destination = destinations.find(dest => dest.id === destinationId);

  if (!destination) {
    return <div style={{ textAlign: 'center' }}>Destination not found</div>;
  }

  return (
    <DetailContainer>
      <h2>{destination.name}</h2>
      <DetailImage src={destination.image} alt={destination.name} />
      <p>{destination.description}</p>
      <p>Rating: {destination.rating || 'Not available'}</p>
      <p>Best time to visit: {destination.bestTime || 'Not specified'}</p>
      <DetailButton>Book Now</DetailButton>
    </DetailContainer>
  );
};

export default DestinationDetail;
