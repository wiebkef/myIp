import React, { useState, useEffect } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DisplayIp = ({ result }) => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  const restCountries = `https://restcountries.com/v3.1/alpha/${result.location.country}`;
  const dt = DateTime.now();

  // Testing to display timezone less than UTC

  /*  const dt = DateTime.fromObject(
    { day: 22, hour: 12 },
    { zone: "America/Los_Angeles", numberingSystem: "beng" }
  ); */

  const utc = dt.toUTC();
  const diff = dt.hour - utc.hour;

  useEffect(() => {
    country.length < 1 &&
      axios
        .get(restCountries)
        .then((response) => {
          setCountry(response.data);
          setLoading(false);
        })
        .catch((error) => console.log("There was an error: ", error));
  }, [country]);

  return (
    <Card>
      {!loading && (
        <Card.Img
          variant="top"
          src={country[0].flags.svg}
          alt={country[0].flags.alt}
          className="mb-3"
        />
      )}

      <Card.Body>
        <Card.Title>Your IP is {result.ip}</Card.Title>
        <Card.Text>
          You are currently located in {result.location.city},{" "}
          {result.location.country}
        </Card.Text>
        <Card.Text>
          {result.proxy.vpn ? (
            <> You are using VPN </>
          ) : (
            <>We couldn't detect any VPN</>
          )}
        </Card.Text>
        <Row>
          <Col>
            <Card.Text className="fw-lighter fs-6">
              <i className="bi bi-calendar2-date" /> {dt.toLocaleString()}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text className="fw-lighter fs-6">
              <i className="bi bi-clock" />{" "}
              {dt.toLocaleString(DateTime.TIME_24_WITH_SHORT_OFFSET)}
            </Card.Text>
          </Col>
          <Col>
            <Card.Text className="fw-lighter fs-6">
              UTC {diff >= 0 && "+"}
              {diff.toString().padStart(2, "0")}:00 h
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DisplayIp;
