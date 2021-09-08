import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardColumns, // note added at the parent level
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
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxMDYyMTYxLCJleHAiOjE2MzExNDg1NjF9.74kLgkWHMWhm3YnzgsuXMour_xswsP7uEcwW1wduwe0',
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
        <Card key={index}>
          <CardImg top width="100%" src={food.photo} alt="Card image cap" />
          <CardBody>
            <CardTitle tag="h5">{food.id}</CardTitle>
            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {food.food}
            </CardSubtitle>
            <CardText>
              <ul>
                <li>{food.location}</li>
                <li>{food.date}</li>
                <li>{food.calories}</li>
                <li>{food.emoji}</li>
                <li>{food.feelings}</li>
              </ul>
            </CardText>
            <Button>Edit</Button>
            <Button>Delete</Button>
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
