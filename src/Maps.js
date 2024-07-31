import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import styled from 'styled-components';

// Ensure default marker icon is available
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const MapWrapper = styled.div`
  height: 500px;
  width: 100%;
  margin-top: 20px;
`;

const ControlContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
  padding: 20px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  max-width: 800px;
  margin: 0 auto;
`;

const ControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
`;

const InputBox = styled.input`
  width: 250px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
  
&:hover {
    background-color: #0056b3;
}
`;

const center = [12.9141, 74.8560]; // Coordinates for Mangaluru

const RoutingControl = ({ waypoints }) => {
    const map = useMap();
    const routingControlRef = useRef(null);

    let hasAddedRoutingControl = false;

    useEffect(() => {
        if (!map) return;
    
        if (waypoints.length === 2 && !hasAddedRoutingControl) {
            hasAddedRoutingControl = true;
            const routingControl = L.Routing.control({
                waypoints: waypoints.map(point => L.latLng(point.lat, point.lng)),
                routeWhileDragging: true,
                createMarker: () => null, // Hides the default markers
                lineOptions: {
                    styles: [{ color: 'blue', opacity: 0.6, weight: 4 }],
                },
            }).addTo(map);
        }
    }, [waypoints, map]);

    return null;
};

const Maps = () => {
    const [place, setPlace] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [markers, setMarkers] = useState([]);
    const [waypoints, setWaypoints] = useState([]);
    const mapRef = useRef(null);

    const handleMapClick = (e) => {
        const { lat, lng } = e.latlng;
        if (markers.length < 3) {
            setMarkers(prev => [...prev, { lat, lng }]);
        }
    };

    const handlePlaceSearch = (event) => {
        event.preventDefault();
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setMarkers(prev => [...prev, { lat, lng: lon }]);
                }
            })
            .catch(error => console.error('Error fetching geocode:', error));
    };

    const handleRouteSubmit = (event) => {
        event.preventDefault();
        Promise.all([
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${source}`),
            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`)
        ])
            .then(([srcResponse, destResponse]) => Promise.all([srcResponse.json(), destResponse.json()]))
            .then(([srcData, destData]) => {
                if (srcData.length > 0 && destData.length > 0) {
                    const src = srcData[0];
                    const dest = destData[0];
                    setWaypoints([
                        { lat: src.lat, lng: src.lon },
                        { lat: dest.lat, lng: dest.lon }
                    ]);
                    setMarkers([
                        { lat: src.lat, lng: src.lon },
                        { lat: dest.lat, lng: dest.lon }
                    ]);
                }
            })
            .catch(error => console.error('Error fetching geocode:', error));
    };

    return (
        <PageContainer>
            <h2>Live Map</h2>
            <ControlContainer>
                <ControlWrapper>
                    <Label>Enter the place:</Label>
                    <form onSubmit={handlePlaceSearch}>
                        <InputBox
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            placeholder="Enter a place"
                        />
                        <Button type="submit">Add Marker</Button>
                    </form>
                </ControlWrapper>
                <ControlWrapper>
                    <Label>Enter the source and destination:</Label>
                    <form onSubmit={handleRouteSubmit}>
                        <InputBox
                            type="text"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            placeholder="Enter source address"
                        />
                        <InputBox
                            type="text"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            placeholder="Enter destination address"
                        />
                        <Button type="submit">Get Route</Button>
                    </form>
                </ControlWrapper>
            </ControlContainer>
            <MapWrapper>
                <MapContainer
                    center={center}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    onClick={handleMapClick}
                    whenCreated={(mapInstance) => mapRef.current = mapInstance}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map((marker, index) => (
                        <Marker key={index} position={[marker.lat, marker.lng]}>
                            <Popup>
                                Marker at latitude {marker.lat}, longitude {marker.lng}
                            </Popup>
                        </Marker>
                    ))}
                    {waypoints.length > 0 && <RoutingControl waypoints={waypoints} />}
                </MapContainer>
            </MapWrapper>
        </PageContainer>
    );
};

export default Maps;