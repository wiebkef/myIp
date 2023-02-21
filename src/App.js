import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayIp from "./DisplayIp";
import Location from "./Location";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  //const countryBaseUrl = "https://geo.ipify.org/api/v2/country?apiKey=";
  //const cityBaseUrl = "https://geo.ipify.org/api/v2/country,city?apiKey=";
  const vpnBaseUrl = "https://geo.ipify.org/api/v2/country,city,vpn?apiKey=";
  const apiKey = process.env.REACT_APP_API_KEY;
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    !result &&
      axios
        .get(vpnBaseUrl + apiKey)
        .then((response) => {
          setResult(response.data);
          setLoading(false);
        })
        .catch((error) => console.log("There was an error: ", error));
  }, [result]);

  return (
    <div className="App vh-100 d-flex align-items-center">
      <Container>
        {!loading && (
          <Row className="mx-auto">
            <Col className="d-flex justify-content-end">
              <DisplayIp result={result} />
            </Col>
            <Col>
              <Location location={result.location} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default App;
