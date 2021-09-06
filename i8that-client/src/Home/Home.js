import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns, // this could be removed -- note it is added at the parent level
  CardSubtitle,
  CardBody,
} from 'reactstrap';

const Home = (props) => {
  const [foodEntries, setFoodEntries] = useState([]);
  const fetchFoodEntries = () => {
    fetch('http://localhost:3000/food/get', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwODc1ODQ5LCJleHAiOjE2MzA5NjIyNDl9.011dWUtaLzvUHBD_GjwNRd8kYumbM4Ml7OUlPvvE0Mo',
      }),
    })
      .then((res) => res.json())
      .then((logData) => {
        setFoodEntries(logData);
        console.log(logData);
      });
  };
  useEffect(() => {
    fetchFoodEntries();
  }, []);

  const foodMapper = () => {
    return foodEntries.map((food, index) => {
      return (
        <Card
          key={index}
          inverse
          style={{ backgroundColor: '#333', borderColor: '#333' }}
        >
          {/* <CardImg top width="100%" src={image} alt="Card image cap" /> */}
          <CardBody>
            <CardTitle tag="h5">{food.id}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {food.food}
            </CardSubtitle>
            <CardText> {food.date}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      );
    });
  };

  return (
    <div>
      <h3>Food History</h3>

      <CardColumns> {foodMapper()}</CardColumns>
    </div>
  );
};

export default Home;
