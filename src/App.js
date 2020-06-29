import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";

function App() {
  const [Data, setData] = useState([]);
  const [Results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v2/all "),
        axios.get("https://disease.sh/v2/countries"),
      ])
      .then((res) => {
        setData(res[0].data);
        setResults(res[1].data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterCountry = Results.filter((item) => {
    return searchCountry !== ""
      ? item.country.toLowerCase().includes(searchCountry.toLowerCase())
      : item;
  });

  const countries = filterCountry.map((data, i) => (
    <Card
      bg="light"
      text="dark"
      className="text-center"
      style={{ margin: 10 }}
      key={i}
    >
      <Card.Img variant="top" src={data.countryInfo.flag} />
      <Card.Body>
        <Card.Title>{data.country}</Card.Title>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Total Cases :</span> {data.cases}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Deaths :</span> {data.deaths}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Recovered :</span>{" "}
          {data.recovered}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Today's Cases :</span>
          {data.todayCases}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Today's Deaths :</span>
          {data.todayDeaths}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Active :</span>
          {data.active}
        </Card.Text>
        <Card.Text>
          <span style={{ fontWeight: "bold" }}>Critical :</span>
          {data.critical}
        </Card.Text>
      </Card.Body>
    </Card>
  ));

  const lastUpdated = new Date(parseInt(Data.updated));
  const date = `Last Updated ${lastUpdated}.toString();`;

  var queries = [
    {
      columns: 2,
      query: "min-width: 500px",
    },
    {
      columns: 3,
      query: "min-width: 1000px",
    },
  ];

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center" }}>COVID-19 Live Now</h2>
      <p style={{ textAlign: "center" }}>
        This Website is created by{" "}
        <span className="text-uppercase text-primary">Manohar Sirvi</span>
      </p>
      <br />
      <CardDeck className="text-center text-white" style={{ margin: 10 }}>
        <Card bg="secondary">
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text className="h2">{Data.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger">
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text className="h2">{Data.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
        <Card bg="success">
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text className="h2">{Data.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{date}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
      <br />
      <Form.Group controlId="formGroupSearch">
        <Form.Control
          type="text"
          placeholder="Search a Country"
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </Form.Group>
      <Columns queries={queries}>{countries}</Columns>
    </div>
  );
}

export default App;
