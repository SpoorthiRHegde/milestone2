// DestinationList.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import destinations from './Destinations';

// Styled Components
const List = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: calc(50% - 20px); /* Changed to calc(50% - 20px) for more spacing */
  margin-bottom: 20px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px; /* Added margin for better spacing between items */
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px; 
`;

const SearchContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px;
  z-index: 1000;
`;

const SearchInput = styled.input`
  width: 200px; /* Adjust the width to make it smaller */
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

// DestinationList Component
const DestinationList = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: "#c8e2fa", padding: "2%" }}>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search destinations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <List>
        {filteredDestinations.map(destination => (
          <ListItem key={destination.id}>
            <Link to={`/destination/${destination.id}`} style={{ textDecoration: 'none', color: '#333' }}>
              <Image src={destination.image} alt={destination.name} />
              <h3>{destination.name}</h3>
              <p>{destination.description}</p> {/* Added description here */}
              <h5>{destination.bestTime}</h5>
              <h6>{destination.rating}</h6>
            </Link>
            <Button onClick={() => toggleFavorite(destination.id)}>
              {favorites.includes(destination.id) ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default DestinationList;
