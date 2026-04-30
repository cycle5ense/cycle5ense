'use client';

import { useState } from 'react';
import { Card, Form, Col, Row, Table } from 'react-bootstrap';

type Pin = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
};

type BinLocationTableProps = {
  pins: Pin[];
};

const BinLocationTable = ({ pins }: BinLocationTableProps) => {
    const [selectedBuilding, setSelectedBuilding] = useState<string>('All');
    const buildingNames = ['All', ...Array.from(new Set(pins.map(pin => pin.name)))];
    const filteredPins = selectedBuilding === 'All' ? pins : pins.filter(pin => pin.name === selectedBuilding);
    return (
    <Row className="mt-5">
        <Col>
            <Card className="shadow-sm">
            <div className="card-body">
                <h4 className="fw-bold mb-2">Table of Bin Locations</h4>
                <p className="text-muted mb-4">
                If the interactive map is unavailable, use this table to view recycling bin locations directly.
                </p>
                <Row className="mb-4">
                <Col md={6}>
                    <Form.Group controlId="buildingFilter">
                    <Form.Label className="fw-semibold">Filter by Building</Form.Label>
                    <Form.Select value={selectedBuilding} onChange={(event) => setSelectedBuilding(event.target.value)}>
                        {buildingNames.map((building) => (
                        <option key={building} value={building}>
                            {building}
                        </option>
                        ))}
                    </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Card className="h-100 text-center text-white" style={{ backgroundColor: '#4a7c4a' }}>
                    <div className="card-body">
                        <h6 className="fw-bold mb-2 text-white">Visible Bin Locations</h6>
                        <p className="fs-3 fw-bold mb-0">{filteredPins.length}</p>
                    </div>
                    </Card>
                </Col>
                </Row>
                {filteredPins.length > 0 ? (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                        <th>Building</th>
                        <th>Location Details</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredPins.map((pin) => (
                        <tr key={pin.id}>
                        <td className="fw-semibold">{pin.name}</td>
                        <td>{pin.description}</td>
                        <td>{pin.latitude.toFixed(6)}</td>
                        <td>{pin.longitude.toFixed(6)}</td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
                ) : (
                <p className="mb-0">No bins found for the selected building.</p>
                )}
            </div>
            </Card>
        </Col>
    </Row>
    );
};
export default BinLocationTable;