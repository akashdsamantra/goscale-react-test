import React from "react";

import { Form, Input, Button, Label, Alert } from "reactstrap";

// Search Asteroid form
const SearchAsteroid = props => {
  const {
    asteroidId,
    setAsteroidId,
    getAsteroid,
    showErrorMessage,
    toggleErrorMessage,
    errorMessage,
    browseAsteroids
  } = props;


  const handleAsteroidIdChange = event => {
    event && event.preventDefault && event.preventDefault();
    setAsteroidId(event.target.value);
  };

  const handleSubmit = event => {
    event && event.preventDefault && event.preventDefault();
    getAsteroid(asteroidId);
  }

  const handleRandomAsteroidClick = event => {
    event && event.preventDefault && event.preventDefault();
    browseAsteroids();
  }

  return (
    <>
      <Alert color="danger" isOpen={showErrorMessage} toggle={toggleErrorMessage}>
        {errorMessage}
      </Alert>
      <Form onSubmit={handleSubmit}>
        <Label style={{ margin: 0 }}>Asteroid ID</Label>
        <Input
          placeholder="Enter Asteroid ID"
          value={asteroidId}
          onChange={handleAsteroidIdChange} />
        <Button
          style={{ marginTop: "10px" }}
          type="submit"
          color="primary"
          disabled={!asteroidId}
        >
          Submit
        </Button>
        <Button
          style={{ marginTop: "10px", marginLeft: "10px" }}
          type="submit"
          color="primary"
          onClick={handleRandomAsteroidClick}
        >
          Random Asteroid
        </Button>
      </Form>
    </>
  )
}

export default SearchAsteroid;
