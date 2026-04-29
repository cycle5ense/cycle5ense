'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Container, Form } from 'react-bootstrap';
import { addPin } from '@/lib/dbActions';

const AddPinPage = () => {
  const searchParams = useSearchParams();
  const [latitude, setLatitude] = useState(searchParams.get('lat') ?? '');
  const [longitude, setLongitude] = useState(searchParams.get('lng') ?? '');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await addPin({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      name,
      description,
    });

    setLatitude('');
    setLongitude('');
    setName('');
    setDescription('');

    alert('Pin saved successfully.');
  };

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-3">Add Pin</h1>
      <p className="mb-4">
        Enter the coordinates and location information for a new recycling pin.
      </p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="latitude">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="longitude">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="buildingName">
          <Form.Label>Building Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="locationDescription">
          <Form.Label>Location Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          style={{ backgroundColor: '#4a7c4a', borderColor: '#4a7c4a' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7aad6e';
            e.currentTarget.style.borderColor = '#7aad6e';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#4a7c4a';
            e.currentTarget.style.borderColor = '#4a7c4a';
          }}
        >
          Save Pin
        </Button>
      </Form>
    </Container>
  );
};

export default AddPinPage;
