import React from "react";

// Display asteroid object
const DisplayAsteroid = props => {
  const { asteroid } = props;

  return (
    <div className="display-asteroid">
      <h2>Result:</h2>
      <p>Asteroid ID: {asteroid && asteroid.id}</p>
      <p>Asteroid Name: {asteroid && asteroid.name}</p>
      <p>NASA JPL URL: {asteroid && asteroid.nasa_jpl_url && <a href={asteroid.nasa_jpl_url}>{asteroid.nasa_jpl_url}</a>}</p>
      <p>{asteroid && asteroid.is_potentially_hazardous_asteroid
        ? "This is a potentially hazardous asteroid."
        : "This is not a potentially hazardous asteroid."}
      </p>
    </div>
  )
}

export default DisplayAsteroid;
