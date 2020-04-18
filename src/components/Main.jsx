import React from "react";
import axios from "axios";

import { Spinner } from "reactstrap";

import { API_URLS, API_KEY } from "../constants";
import SearchAsteroid from "./SearchAsteroid";
import DisplayAsteroid from "./DisplayAsteroid";

// Error messages
const ERROR_MESSAGES = {
  INVALID_ASTEROID_ID: "Invalid asteroid ID. Please try again",
  DEFAULT: "Something went wrong. Please try again."
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asteroidId: "",
      asteroidInfo: null,
      showErrorMessage: false,
      errorMessage: "",
      showSpinner: false
    };
  }

  // Get asteroid info by id
  getAsteroid = asteroidId => {
    this.setState({ showSpinner: true });
    const query = `?api_key=${API_KEY}`;
    axios.get(`${API_URLS.ASTEROID}${asteroidId}${query}`).then(
      res => {
        this.setState({ asteroidInfo: res.data, showSpinner: false });
      },
      err => {
        let errorMessage = ERROR_MESSAGES.DEFAULT;
        if (err && err.response && err.response.status === 404) {
          errorMessage = ERROR_MESSAGES.INVALID_ASTEROID_ID;
        }
        this.setState({ showErrorMessage: true, errorMessage, showSpinner: false, asteroidInfo: null });
      }
    );
  }

  // Get all asteroids and display random asteroid
  browseAsteroids = () => {
    this.setState({ showSpinner: true });
    const query = `?api_key=${API_KEY}`;
    axios.get(`${API_URLS.BROWSE_ASTEROIDS}${query}`).then(
      res => {
        const asteroids = res && res.data && res.data.near_earth_objects;
        const randomIndex = this.getRandomInt();
        const randomAsteroid = asteroids[randomIndex];
        this.setState({
          showSpinner: false,
          asteroidId: randomAsteroid && randomAsteroid.id,
          asteroidInfo: randomAsteroid
        });
      },
      err => {
        let errorMessage = ERROR_MESSAGES.DEFAULT;
        if (err && err.response && err.response.status === 404) {
          errorMessage = ERROR_MESSAGES.INVALID_ASTEROID_ID;
        }
        this.setState({
          showSpinner: false,
          showErrorMessage: true,
          asteroidInfo: null,
          errorMessage
        });
      }
    )
  }

  // Toggle error message
  toggleErrorMessage = () => {
    const { showErrorMessage } = this.state;
    this.setState({ showErrorMessage: !showErrorMessage })
  }

  setAsteroidId = asteroidId => {
    this.setState({ asteroidId });
  }

  // Generate random integer.
  // 19 is the total numbers of asteroids present in api.
  getRandomInt(max = 19) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  render() {
    const {
      asteroidInfo,
      showErrorMessage,
      errorMessage,
      asteroidId,
      showSpinner
    } = this.state;

    return (
      <div>
        <SearchAsteroid
          asteroidId={asteroidId}
          setAsteroidId={this.setAsteroidId}
          getAsteroid={this.getAsteroid}
          errorMessage={errorMessage}
          showErrorMessage={showErrorMessage}
          toggleErrorMessage={this.toggleErrorMessage}
          browseAsteroids={this.browseAsteroids}
        />
        {/* show spinner in case of api calls */}
        <div style={{ margin: "5px" }}>
          {showSpinner && <Spinner color="primary"/>}
        </div>
        {!showSpinner && asteroidInfo && <DisplayAsteroid asteroid={asteroidInfo}/>}
      </div>
    )
  }
}

export default Main;
