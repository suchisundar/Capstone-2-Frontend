import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function TripCard({ trip }) {
  const navigate = useNavigate();

  return (
    <Card className="col-md-4 m-3">
      <Card.Body>
        <Card.Title>{trip.location}</Card.Title>
        <Card.Text>
          {new Date(trip.start_date).toLocaleDateString()} -{" "}
          {new Date(trip.end_date).toLocaleDateString()}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/trips/${trip.id}/details`)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TripCard;
